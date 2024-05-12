import { redirect } from "next/navigation";
import { getSession, getToken } from "@/lib/session";
import { FetchUser } from "@/services/fetch-user";
import { Divider } from "@/components/ui/divider";
import { AccountForm } from "./components/account-form";
import { AccountDeleteForm } from "./components/account-delete-form";

export default async function AccountSettingsPage() {
  // Retrieve session from cookie
  const session = getSession();

  // Retrieve JWT token from cookie
  const token = getToken();

  // Retrieve user id from decoded token
  const userId = session?.user.userId;

  // If no session found, redirect the user
  if (!userId) {
    redirect("/");
  }

  // Fetch current user with user id
  const res = await FetchUser(userId);

  return (
    <div>
      <h3 className="text-lg font-medium">Account</h3>
      <p className="text-sm text-muted-foreground">
        Update your account settings.
      </p>

      <Divider />

      <AccountForm initialData={res.user} token={token} />

      <Divider />

      <AccountDeleteForm />
    </div>
  );
}
