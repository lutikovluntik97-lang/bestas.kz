module.exports = async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Разрешены только POST-запросы."
        });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: "Не найден GEMINI_API_KEY в Vercel."
            });
        }

        let body = req.body || {};

        if (typeof body === "string") {
            body = JSON.parse(body);
        }

        const message = String(body.message || "").trim();

        if (!message) {
            return res.status(400).json({
                error: "Сообщение пустое."
            });
        }

        const history = Array.isArray(body.history)
            ? body.history.slice(-10)
            : [];

        const contents = history
            .filter(item => item && typeof item.text === "string")
            .map(item => ({
                role: item.role === "model" ? "model" : "user",
                parts: [{ text: item.text }]
            }));

        contents.push({
            role: "user",
            parts: [{ text: message }]
        });

        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": apiKey
                },
                body: JSON.stringify({
                    systemInstruction: {
                        parts: [{
                            text: "Ты — AI-помощник BESTAS.KZ. Помогай людям изучать казахскую игру Бестас, её правила и историю. Отвечай на языке пользователя: русском, казахском или английском. Будь дружелюбным и не выдумывай факты."
                        }]
                    },
                    contents,
                    generationConfig: {
                        maxOutputTokens: 1024
                    }
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API error:", data);

            return res.status(502).json({
                error: data?.error?.message ||
                    `Ошибка Gemini API: HTTP ${response.status}`
            });
        }

        const reply = data?.candidates?.[0]?.content?.parts
            ?.map(part => part.text || "")
            .join("")
            .trim();

        if (!reply) {
            return res.status(502).json({
                error: "Gemini не вернула текст ответа."
            });
        }

        return res.status(200).json({ reply });

    } catch (error) {
        console.error("BESTAS AI ERROR:", error);

        return res.status(500).json({
            error: error.message || "Внутренняя ошибка AI."
        });
    }
};