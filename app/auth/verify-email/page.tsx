import { redirect } from "next/navigation";
import { checkSession } from "@/lib/session";
import { VerifyEmailForm } from "./components/verify-email-form";

export default function VerifyEmailPage() {
  // Boolean state checking if the user has signed in
  const signedIn = checkSession();

  // If user has already signed in, then redirect the user to profile page
  if (signedIn) {
    redirect("/profile");
  }

  return (
    <div className="mx-auto w-full justify-center space-y-6 sm:w-[350px]">
      <VerifyEmailForm />
    </div>
  );
}
