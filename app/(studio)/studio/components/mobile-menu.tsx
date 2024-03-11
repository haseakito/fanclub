"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Box,
  CreditCard,
  MessageCircleMore,
  History,
  Settings,
  Menu,
} from "lucide-react";

export const StudioMobileMenu = () => {
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
            <Button variant="destructive">Logout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
