import { redirect } from "next/navigation";
import { checkSession } from "@/lib/session";
import { SignInForm } from "./components/sign-in-form";

export default function SignInPage() {
  // Boolean state checking if the user has signed in
  const signedIn = checkSession();

  // If user has already signed in, then redirect the user to profile page
  if (signedIn) {
    redirect("/profile");
  }

  return (
    <div className="mx-auto w-full justify-center space-y-6 sm:w-[350px]">
      <SignInForm />
    </div>
  );
}
