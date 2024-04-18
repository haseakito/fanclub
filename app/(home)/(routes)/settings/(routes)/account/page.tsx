import { UserProfile } from "@clerk/nextjs";

export default async function AccountSettingsPage() {

  return (
    <UserProfile
      appearance={{
        elements: {
          card: "shadow-none w-auto px-10",
          navbar: "hidden",          
        },
      }}
    />
  );
}
