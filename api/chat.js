import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Разрешаем только POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY не найден в переменных Vercel"
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey
    });

    const message = req.body?.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Сообщение не передано"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message
    });

    const answer = response.text || "Не удалось получить ответ от AI.";

    return res.status(200).json({
      answer: answer
    });

  } catch (error) {
    console.error("Gemini error:", error);

    return res.status(500).json({
      error: "Ошибка Gemini AI",
      details: error.message
    });
  }
}