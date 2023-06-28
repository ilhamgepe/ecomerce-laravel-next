import { authOptions } from "@/libs/nextauth/authoptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  return NextResponse.json({
    ...session,
  });
}
