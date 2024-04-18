import { auth } from "@clerk/nextjs";
import { FetchUser } from "@/services/fetch-user";
import { redirect } from "next/navigation";
import { NotificationForm } from "./components/notification-form";

export default async function NotificationSettingsPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  // Fetch user with user id
  // const user = await FetchUser(userId)

  return (
    <div>
        <NotificationForm initialData={null} />
    </div>
  )
}
