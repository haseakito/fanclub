import { UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/theme-toggle";

import { AdminNavigationMenu } from "./nav-items";

export function AdminNavbar() {
  return (
    <div className="border-b-[1px]">
      <div className="h-16 flex items-center gap-x-1.5 px-4">
        <AdminNavigationMenu />
        <div className="ml-auto flex items-center space-x-3">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </div>
  );
}
