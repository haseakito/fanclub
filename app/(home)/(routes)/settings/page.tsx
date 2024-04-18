import { auth } from "@clerk/nextjs";
import { FetchUser } from "@/services/fetch-user";
import { redirect } from "next/navigation";
import { ProfileForm } from "./components/profile-form";

export default async function SettingsPage() {

  const { userId } = auth()

  if (!userId) {
    redirect("/")
  }

  // Fetch user with user id
  const res = await FetchUser(userId)

  return (
    <div>
      <ProfileForm initialData={res.user} />
    </div>
  );
}
