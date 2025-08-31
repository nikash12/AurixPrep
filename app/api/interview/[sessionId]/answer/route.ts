import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

//takes questionId and answer to update the question

const client = new PrismaClient()
export  async function POST(req:NextRequest){
    const {questionId,answer}:{questionId:string, answer:string}  = await req.json()
    try{
        const question = await client.question.update({
            where: {
                id: questionId
            },
            data:{
                answer
            }
        })
        if(question){
            return NextResponse.json({message: "Question updated successfully"}, {status: 200})
        }
    }catch (error) {
        return NextResponse.json({message: "Error updating question"}, {status: 500})
    }
    
    return NextResponse.json({message: "Question not found"}, {status: 404})
    
}
