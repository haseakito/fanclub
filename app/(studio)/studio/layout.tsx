import { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkSession, checkRole } from "@/lib/session";
import { Navbar } from "./components/navbar";

export const metadata: Metadata = {
  title: "Designful Studio",
  description: "Studio is the creator exclusive dashboard",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Boolean state checking if the user has signed in
  const signedIn = checkSession();

  // If the user does not have creator role, redirect to home
  if (!!checkRole("creator")) {
    redirect("/");
  }
  return (
    <>
      <Navbar signedIn={signedIn} />
      <div className="p-4 sm:ml-16 md:ml-52">{children}</div>
    </>
  );
}
