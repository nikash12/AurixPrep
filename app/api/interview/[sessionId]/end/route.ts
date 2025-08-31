import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await context.params;

  try {
    await client.session.update({
      where: { id: sessionId },
      data: { endedAt: new Date(Date.now()) },
    });

    return NextResponse.json(
      { message: "Session ended successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    if (err.code === "P2025") {
      // Prisma record not found
      return NextResponse.json({ message: "Session not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
