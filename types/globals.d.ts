export {};

export type Roles = "fan" | "creator" | "admin";

declare global {
  interface Session {
    user: {
      userId: string;
      email: string;
      email_verified: boolean;
      role: Roles;
    };
    exp: number;
    iat: number;
  }
}
