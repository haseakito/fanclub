import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { SettingsNavbar } from "./components/navbar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-6 lg:px-8">
      <Heading title="Settings" description="Manage your account settings." />
      <Divider />
      <div className="flex lg:gap-10 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <SettingsNavbar />
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
