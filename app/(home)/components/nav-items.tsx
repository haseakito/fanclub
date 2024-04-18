"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  MessageCircleMore,
  Settings,
  LogOut,
  User,
  Mail,
  Banana,
  LayoutDashboard,
} from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export const HomeNavigationMenu = () => {
  // Hooks handling current URL's pathname
  const pathname = usePathname();

  // Hooks handling router
  const router = useRouter()

  // Navigation item, its location, and its current status
  const navItems: {
    href: string;
    label: string;
    icon: React.ReactElement;
    active: boolean;
  }[] = [
    {
      href: `/profile`,
      label: "Profile",
      icon: <User className="h-5 w-5" />,
      active: pathname === `/profile`,
    },
    {
      href: `/messages`,
      label: "Messages",
      icon: <Mail className="h-5 w-5" />,
      active: pathname === `/messages`,
    },
    {
      href: `/comments`,
      label: "Comments",
      icon: <MessageCircleMore className="h-5 w-5" />,
      active: pathname === `/comments`,
    },
    {
      href: `/settings`,
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      active: pathname === `/settings`,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 z-40 w-16 md:w-52 h-full transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-slate-900/50">
        <div className="mt-10 grid space-y-2">
          <div>
            <Link
              href="/"
              className="mb-10 flex items-center lg:ml-0 gap-x-2 px-3"
            >
              <p className="font-bold text-xl hidden md:block">Designful</p>
              <Banana className="h-5 w-5" />
            </Link>
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
            <Button
              variant="link"
              size="sm"
              className="mt-10 text-xs md:w-full"
              onClick={() => router.push("/studio")}
            >
              <p className="hidden md:block">Go to Dashboard</p>
              <LayoutDashboard className="h-5 w-5 md:hidden" />
            </Button>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
