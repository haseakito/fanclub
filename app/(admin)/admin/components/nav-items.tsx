"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AdminNavigationMenu({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  // Hooks handling current URL's pathname
  const pathname = usePathname();

  // Navigation item, its location, and its current status
  const NavItems: { href: string; label: string; active: boolean }[] = [
    {
      href: "/admin",
      label: "Overview",
      active: pathname === "/admin",
    },
    {
      href: "/admin/billboards",
      label: "Billboards",
      active: pathname === "/admin/billboards",
    },
    {
      href: "/admin/categories",
      label: "Categories",
      active: pathname === "/admin/categories",
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-3 lg:space-x-5", className)}>
      {NavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.active ? "text-black dark:text-white" : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
