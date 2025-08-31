import { GoogleGenerativeAI } from "@google/generative-ai";

const googleGenerativeAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const generationConfig = {
    stopSequences: ["\n\n"],
    maxOutputTokens: 512,
    temperature: 1,
    topP: 0.9,
    topK: 40,
};
type interviewQuestion = {
    question: string;
    idealPoints: string[];
};
// this function generates interview questions
export default async function getInterviewQuestions({title, description, mode, language}: 
{title: string, description: string, mode: string, language: string}): Promise<interviewQuestion[] | { error: string }> {
    console.log("Received SpeakAI request:", {title, description, mode, language});

    if (!title || !description || !mode || !language) {
        return { error: 'Missing required parameters' };
    }

    const text = `
Generate a set of personalized ${mode} interview questions for a candidate named ${title},
applying for the role description/topics:${description}

The questions should:
- Be relevant to both HR and technical interviews
- Include a variety of behavioral, technical, and communication-based questions
- Output format should be JSON like:
[
  {
    "question": "Tell me about yourself.",
    "idealPoints": ["Mention background", "Highlight skills", "Explain motivation"]
  },
  ...
]
Only return the JSON array of questions.I need the questions to be tailored for the ${language} language.
So respond with the questions in ${language} language.
`;

    try {
        const model = googleGenerativeAI.getGenerativeModel({ model: "gemini-2.5-flash" ,...generationConfig});
        const result = await model.generateContent(text);
        const response = await result.response;
        const textOutput = response.text();
        console.log(response+" "+textOutput);   
        
        // Try to parse the JSON response
        const cleanText = textOutput
        .replace(/^```json/, '')  // remove leading ```json
        .replace(/^```/, '')      // fallback if no json lang specified
        .replace(/```$/, '')      // remove trailing ```
        .trim();
        const questions = JSON.parse(cleanText);
        return questions;
    } catch (error) {
        console.error('❌ Error generating questions:', error);
        return { error: 'Failed to generate questions' };
    }
};
