import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"

const client = new PrismaClient()

type RouteContext = {
  params: { sessionId: string }
}

export async function GET(req: NextRequest, context: RouteContext) {
  const { sessionId } = context.params

  const data = await client.session.findUnique({ where: { id: sessionId } })
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}
