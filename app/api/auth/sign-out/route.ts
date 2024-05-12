import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  // Delete JWT token in cookie
  cookies().delete("jwt");

  return NextResponse.json({}, { status: 200 });
}