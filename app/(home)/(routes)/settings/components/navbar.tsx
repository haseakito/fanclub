"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function SettingsNavbar() {
  // Hooks handling current URL's pathname
  const pathname = usePathname();

  // Navigation item, its location, and its current status
  const NavItems: { href: string; label: string; active: boolean }[] = [
    {
      href: "/settings",
      label: "Profile",
      active: pathname === "/settings",
    },
    {
      href: "/settings/account",
      label: "Account",
      active: pathname === "/settings/account",
    },
    {
      href: "/settings/notification",
      label: "Notification",
      active: pathname === "/settings/notification",
    },
  ];

  return (
    <aside className="-mx-4 lg:w-1/5">
      <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
        {NavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:text-accent-foreground h-9 px-4 py-2 hover:bg-muted justify-start",
              item.active
                ? "text-black dark:text-white bg-muted"
                : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
