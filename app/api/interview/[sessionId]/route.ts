import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient()
export  async function GET(req:NextRequest,
    context: { params: Promise<{ sessionId: string }>}
){
    const { sessionId } = await context.params;
    
    console.log(sessionId);
    
    if(!sessionId){
        return NextResponse.json("Missing sessionId", {status: 400})
    }
    try {
        const session = await client.session.findUnique({
            where:{
                id: sessionId
            },
            include: {
                questions: true
            }
        })
        if(!session){
            return NextResponse.json("Session not found", {status: 404})
        }
        //we send questions + session details
        return NextResponse.json(session, {status: 200})
    } catch (error) {
        return NextResponse.json("Failed to fetch session", { status: 500 })
    }
    
}