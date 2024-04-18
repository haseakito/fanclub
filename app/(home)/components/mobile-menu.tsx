"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/clerk-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, MessageCircleMore, Settings, User, Mail } from "lucide-react";

export const HomeMobileMenu = () => {
  // Hooks handling current URL's pathname
  const pathname = usePathname();

  // Hooks handling router
  const router = useRouter();

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
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <div className="mt-10 grid space-y-2">
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
              {item.label}
            </Link>
          ))}
        </div>
        <SheetFooter className="mt-60">
          <SheetClose asChild>
            <div>
              <SignedIn>
                <SignOutButton>
                  <Button variant="destructive" className="w-full">
                    Logout
                  </Button>
                </SignOutButton>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-10 text-xs w-full"
                  onClick={() => router.push("/studio")}
                >
                  Go to Dashboard
                </Button>
              </SignedIn>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
