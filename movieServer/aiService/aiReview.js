import dotenv from "dotenv";
import { Mistral } from "@mistralai/mistralai";

dotenv.config();

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export const generateMovieInsights = async (reviews) => {
  try {
    if (!reviews?.length) {
      return {
        summary: "Not enough reviews available to analyze.",
        sentiment: "Mixed",
        themes: [],
      };
    }

    const combinedText = reviews
      .slice(0, 20)
      .map(
        (r) =>
          `Rating: ${r.rating}\nSummary: ${r.summary}\nReview: ${r.content}`
      )
      .join("\n\n");

  
    const prompt = `
Analyze the following audience reviews for a movie.

1. Provide a 3-4 line overall summary.
2. Classify overall sentiment as: Positive, Mixed, or Negative.
3. Mention common themes (strengths and weaknesses).

Return STRICT JSON format:
{
  "summary": "...",
  "sentiment": "Positive | Mixed | Negative",
  "themes": ["theme1", "theme2"]
}

Reviews:
${combinedText}
`;

    const response = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
    });

    const raw = response.choices?.[0]?.message?.content || "{}";

    const cleaned = raw.replace(/```json|```/g, "").trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("MISTRAL REAL ERROR:", error);
    throw error;
  }
};