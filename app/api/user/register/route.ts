import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const client = new PrismaClient()
export async function POST(req: NextRequest) {
    const { username, email, password } = await req.json()
    try{
        if (!username || !email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }
        if(await client.user.findUnique({ where: { email } })) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 })
        }
        const user = await client.user.create({
            data: {
                username,
                email,
                password
            }
        })
        return NextResponse.json({ message: "User registered successfully",user })
    }catch (error) {
        console.error(error)
        return NextResponse.json({ message: "User registration failed" }, { status: 500 })
    }
}