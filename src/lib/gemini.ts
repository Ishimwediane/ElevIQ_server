import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const generateQuestionsWithAI = async ({
  subject,
  difficulty,
  count = 5,
}: {
  subject: string;
  difficulty: string;
  count?: number;
}) => {
  const prompt = `Generate ${count} multiple-choice questions on ${subject} at ${difficulty} difficulty. 
Each question should include:
- questionText
- 4 options (A, B, C, D)
- correctAnswer (e.g., "B")
- topic (based on subject)

Return the questions as a JSON array of objects.`;

  const response = await axios.post(
    `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const jsonStart = rawText.indexOf('[');
  const jsonEnd = rawText.lastIndexOf(']') + 1;
  const parsed = JSON.parse(rawText.slice(jsonStart, jsonEnd));

  return parsed;
};
