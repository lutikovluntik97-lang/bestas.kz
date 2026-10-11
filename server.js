require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.redirect("/index.html");
});

const API_KEY = process.env.GEMINI_API_KEY;

/*
========================================
             BESTAS.KZ AI
========================================

Пробуем модели по очереди:

1. Gemini 3.8 Flash
2. Gemini 3.7 Flash
3. Gemini 3.6 Flash
4. Gemini 3.5 Flash

Если модель отвечает 503 — автоматически
переходим к следующей.
*/

const MODELS = [
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3.5-flash"
];

console.log("");
console.log("================================");
console.log("          BESTAS.KZ");
console.log("================================");
console.log(`🌐 http://localhost:${PORT}`);
console.log(`🔑 Gemini key: ${API_KEY ? "загружен" : "НЕ НАЙДЕН"}`);
console.log("🤖 AI fallback: включён");
console.log("================================");
console.log("");


// ========================================
// AI PROMPT
// ========================================

const SYSTEM_PROMPT = `
Ты — официальный AI-помощник сайта BESTAS.KZ.

Главная тема сайта — казахская традиционная игра Бестас
(Бес тас, Бестас, Five Stones).

Помогай пользователю узнавать:

- что такое Бестас;
- историю игры;
- правила;
- этапы игры;
- традиции Казахстана;
- интересные факты;
- навыки, которые развивает Бестас;
- современную цифровую игру BESTAS.KZ.

Отвечай понятно, дружелюбно и без лишней воды.

Если пользователь пишет на русском — отвечай на русском.
Если пользователь пишет на казахском — отвечай на казахском.
Если пользователь пишет на английском — отвечай на английском.

Не выдумывай исторические факты.
Если точной информации нет — честно скажи об этом.
`;


// ========================================
// ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ GEMINI
// ========================================

async function askGemini(model, contents) {

    console.log(`🤖 Пробуем модель: ${model}`);

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 90000);

    try {

        const url =
            "https://generativelanguage.googleapis.com/v1beta/models/" +
            model +
            ":generateContent?key=" +
            encodeURIComponent(API_KEY);

        const response = await fetch(url, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                systemInstruction: {
                    parts: [
                        {
                            text: SYSTEM_PROMPT
                        }
                    ]
                },

                contents: contents,

                generationConfig: {
                    maxOutputTokens: 1024
                }

            }),

            signal: controller.signal
        });

        const data = await response.json();

        console.log(`📡 ${model} HTTP: ${response.status}`);

        return {
            response,
            data
        };

    } finally {

        clearTimeout(timeout);

    }
}


// ========================================
// POST /api/chat
// ========================================

app.post("/api/chat", async (req, res) => {

    console.log("");
    console.log("================================");
    console.log("📩 НОВЫЙ ЗАПРОС AI");
    console.log("================================");

    try {

        const { message, history = [] } = req.body;

        console.log("💬 Сообщение:", message);

        if (!message || !message.trim()) {

            console.log("⚠️ Пустое сообщение");

            return res.status(400).json({
                error: "Сообщение пустое"
            });

        }


        if (!API_KEY) {

            console.log("❌ GEMINI_API_KEY отсутствует");

            return res.status(500).json({
                error: "GEMINI_API_KEY не найден в .env"
            });

        }


        // ========================================
        // СОЗДАЁМ ИСТОРИЮ
        // ========================================

        const contents = [];

        if (Array.isArray(history)) {

            for (const item of history.slice(-10)) {

                if (!item || !item.text) {
                    continue;
                }

                contents.push({

                    role:
                        item.role === "model"
                            ? "model"
                            : "user",

                    parts: [
                        {
                            text: String(item.text)
                        }
                    ]

                });

            }

        }


        // Текущий вопрос

        contents.push({

            role: "user",

            parts: [
                {
                    text: String(message)
                }
            ]

        });


        // ========================================
        // ПРОБУЕМ МОДЕЛИ
        // ========================================

        let lastError = null;

        for (const model of MODELS) {

            try {

                const result =
                    await askGemini(model, contents);

                const { response, data } = result;


                // ====================================
                // УСПЕШНЫЙ ОТВЕТ
                // ====================================

                if (response.ok) {

                    const reply =
                        data
                            ?.candidates?.[0]
                            ?.content
                            ?.parts
                            ?.map(part => part.text || "")
                            .join("")
                            .trim();


                    if (reply) {

                        console.log(`✅ Ответ получен через ${model}`);
                        console.log("");

                        return res.json({
                            reply,
                            model
                        });

                    }


                    console.log(
                        `⚠️ ${model} не вернула текст`
                    );

                    lastError =
                        "Модель не вернула текст";

                    continue;

                }


                // ====================================
                // МОДЕЛЬ ПЕРЕГРУЖЕНА
                // ====================================

                if (response.status === 503) {

                    console.log(
                        `⚠️ ${model} перегружена (503)`
                    );

                    console.log(
                        "➡️ Переключаемся на следующую модель..."
                    );

                    lastError =
                        data?.error?.message ||
                        "Модель временно недоступна";

                    continue;

                }


                // ====================================
                // RATE LIMIT
                // ====================================

                if (response.status === 429) {

                    console.log(
                        `⚠️ ${model}: слишком много запросов (429)`
                    );

                    lastError =
                        data?.error?.message ||
                        "Слишком много запросов";

                    continue;

                }


                // ====================================
                // 404
                // ====================================

                if (response.status === 404) {

                    console.log(
                        `⚠️ ${model}: модель недоступна (404)`
                    );

                    lastError =
                        data?.error?.message ||
                        "Модель недоступна";

                    continue;

                }


                // ====================================
                // ДРУГАЯ ОШИБКА
                // ====================================

                console.error(
                    `❌ Ошибка ${model}:`,
                    JSON.stringify(data, null, 2)
                );

                lastError =
                    data?.error?.message ||
                    `Gemini HTTP ${response.status}`;

                continue;

            } catch (error) {

                console.error(
                    `❌ Ошибка подключения к ${model}:`
                );

                console.error(error.message);

                lastError = error.message;

                continue;

            }

        }


        // ========================================
        // ВСЕ МОДЕЛИ НЕ СРАБОТАЛИ
        // ========================================

        console.log("");
        console.log("❌ Все Gemini-модели недоступны");
        console.log("Последняя ошибка:", lastError);
        console.log("");

        return res.status(503).json({

            error:
                "Сейчас Gemini временно перегружен. " +
                "Попробуй отправить сообщение ещё раз через несколько секунд.",

            details: lastError

        });


    } catch (error) {

        console.log("");
        console.error("❌ КРИТИЧЕСКАЯ ОШИБКА AI");
        console.error(error);
        console.log("");

        return res.status(500).json({

            error:
                error.message ||
                "Ошибка сервера BESTAS.KZ"

        });

    }

});


// ========================================
// HEALTH CHECK
// ========================================

app.get("/api/health", (req, res) => {

    res.json({

        online: true,

        ai: Boolean(API_KEY),

        provider: "Gemini",

        models: MODELS,

        fallback: true

    });

});


// ========================================
// 404 API
// ========================================

app.use("/api", (req, res) => {

    res.status(404).json({
        error: "API endpoint не найден"
    });

});


// ========================================
// ЗАПУСК
// ========================================

app.listen(PORT, () => {

    console.log("🚀 Сервер запущен");

});