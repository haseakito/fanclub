import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  // Parse the request body
  const { email, password } = await req.json();

  try {
    // POST request to server
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
      {
        email: email,
        password: password,
      }
    );

    // Save the token in a HTTP-only cookie
    cookies().set({
      name: "jwt",
      value: data.access_token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600 * 24 * 3,
    });
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.log("SIGN IN ERROR: ", error);    
  }
}
