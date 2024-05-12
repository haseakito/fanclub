import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { Roles } from "@/types/globals";

export const getSession = (): Session | null => {
  // Get JWT token from HTTP-Only cookie
  const session = cookies().get("jwt")?.value;

  if (!session) return null;

  // Check if the JWT secret loads
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("Server misconfiguration.");
  }

  try {
    // Decode the JWT with the secret
    const decoded = verify(session, process.env.JWT_SECRET_KEY) as Session;

    return decoded;
  } catch (error) {
    console.log("SESSION INVALID: ", error);
    throw new Error("Unauthorized");
  }
};

export const checkSession = (): boolean => {
  // Check if there is a JWT token in cookie
  return cookies().has("jwt");
};

export const getToken = (): string => {
  // Fetch JWT token from cookie, mostly for Bearer Authorization in request header
  return cookies().get("jwt")?.value || "";
};

export const checkRole = (role: Roles): boolean => {
  // Get JWT session
  const session = getSession();

  return session?.user.role === role;
};
