import { redirect } from "next/navigation";
import { getSession, getToken } from "@/lib/session";
import { FetchUser } from "@/services/fetch-user";
import { Divider } from "@/components/ui/divider";
import { NotificationForm } from "./components/notification-form";

export default async function NotificationSettingsPage() {
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

  // Fetch user with user id
  const res = await FetchUser(userId);

  return (
    <div>
      <h3 className="text-lg font-medium">Update your account.</h3>
      <p className="text-sm text-muted-foreground">
        Configure how you receive notifications.
      </p>
      <Divider />

      <NotificationForm initialData={res.user} token={token} />
    </div>
  );
}
