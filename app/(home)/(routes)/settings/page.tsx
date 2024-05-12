import { redirect } from "next/navigation";
import { getSession, getToken } from "@/lib/session";
import { FetchUser } from "@/services/fetch-user";
import { Divider } from "@/components/ui/divider";
import { ProfileForm } from "./components/profile-form";
import { ProfileImageForm } from "./components/profile-image-form";

export default async function SettingsPage() {
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
      <h3 className="text-lg font-medium">Profile.</h3>
      <p className="text-sm text-muted-foreground">
        Update your profile settings.
      </p>
      <Divider />
      <ProfileImageForm
        initialData={res.user.profile_image_url}
        token={token}
      />
      <Divider />
      <ProfileForm initialData={res.user} token={token} />
    </div>
  );
}
