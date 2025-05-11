// src/utils/geminiClient.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateObsessiveQuote(goal, percentage = 50) {
  const prompt = `
너는 '집착갓걸'이야. 아래 목표에 대해 달성률에 따라 말투를 조절해서 짧고 강렬한 문장을 1개 생성해줘.

- 목표: ${goal}
- 달성률: ${percentage}%

규칙:
1. 최대 128자
2. 위로 금지
3. 현실 직시 + 자극적인 말투
4. 달성률 80% 이상: 뿌듯한 톤
   55~79%: 애정 섞인 팩폭
   40~54%: 조용히 실망
   20~39%: 반 협박 조
   0~19%: 거의 무섭게, 절박하게
5. 한국어로 작성

결과는 오직 한 문장만 반환해줘.
`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().replace(/\*\*/g, "").trim();
}