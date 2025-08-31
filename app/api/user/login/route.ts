import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
const client = new PrismaClient()

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log({ email, password });
  const user = await client.user.findUnique({
    where: { email }
  })
  
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
  }
  const token = jwt.sign({
    id:user.id
  }, process.env.JWT_TOKEN!, {expiresIn:'1d'})
  return NextResponse.json({ token })
}