"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  CreditCard,
  MessageCircleMore,
  History,
  Settings,
  LogOut,
} from "lucide-react";
import { OrganizationSwitcher, SignOutButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const StudioNavigationMenu = () => {
  // Hooks handling current URL's pathname
  const pathname = usePathname();

  // Navigation item, its location, and its current status
  const navItems: {
    href: string;
    label: string;
    icon: React.ReactElement;
    active: boolean;
  }[] = [
    {
      href: `/studio`,
      label: "Overview",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: pathname === `/studio`,
    },
    {
      href: `/studio/posts`,
      label: "Posts",
      icon: <Box className="h-5 w-5" />,
      active: pathname === `/studio/posts`,
    },
    {
      href: `/studio/subscriptions`,
      label: "Subscriptions",
      icon: <CreditCard className="h-5 w-5" />,
      active: pathname === `/studio/subscriptions`,
    },
    {
      href: `/studio/comments`,
      label: "Comments",
      icon: <MessageCircleMore className="h-5 w-5" />,
      active: pathname === `/studio/comments`,
    },
    {
      href: `/studio/orders`,
      label: "Orders",
      icon: <History className="h-5 w-5" />,
      active: pathname === `/studio/orders`,
    },
    {
      href: `/studio/settings`,
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      active: pathname === `/studio/settings`,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 z-40 w-16 md:w-52 h-full transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-slate-900/50">
        <div className="mt-10 grid space-y-2">
          <div className="overflow-x-hidden">
            <OrganizationSwitcher appearance={{
              elements: {
                organizationSwitcherTrigger: "p-2 text-muted-foreground hover:text-black hover:dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }
            }} />
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-x-5 text-md font-medium p-3 rounded-lg transition-colors hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700",
                item.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              {item.icon}
              <p className="hidden md:block">{item.label}</p>
            </Link>
          ))}
        </div>
        <div className="mt-60">
          <SignedIn>
            <SignOutButton>
              <Button variant="destructive" className="md:w-full">
                <p className="hidden md:block">Sign out</p>
                <LogOut className="h-5 w-5 md:hidden" />
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
