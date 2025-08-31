import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import getInterviewQuestions from "@/backend/services/gemini";

const client = new PrismaClient()
export async function POST(req:NextRequest){
    const {id,jobDescription,interviewMode,title,language}: {id: string, jobDescription: string, interviewMode: string, title: string, language: string} = await req.json()
    if(!id || !jobDescription || !interviewMode || !title || !language){
        return NextResponse.json("Missing id, jobDescription, interviewMode, title or language", {status: 400})
    }
    try {
        const find_active_session = await client.session.findFirst({
            where: {
                userId: id,
                endedAt: null
            }
        });
        if (find_active_session) {
            return NextResponse.json("There is an active session", { status: 400 });
        }
        const newSession = await client.session.create({
            data:{
                userId: id,
                mode: interviewMode,
                description: jobDescription,
                title: title,
                language: language
            }
        })

        const questions = await getInterviewQuestions({ title: title, description: jobDescription, mode: interviewMode,language: language });
        if ('error' in questions) {
            return NextResponse.json({ error: questions.error }, { status: 500 });
        }
        await client.question.createMany({
            data: questions.map((q) => ({
                sessionId: newSession.id,
                text: q.question
            }))
        });
        return NextResponse.json({ id: newSession.id, questions })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ error: "Failed to create session" }, { status: 500 })
    }
}