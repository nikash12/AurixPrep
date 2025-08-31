import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1] 
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN!) as { id: string } | null
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await client.user.findUnique({ where: { id: decoded.id } , select: { id: true, username: true, email: true } })

    return NextResponse.json({ user })
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
