"use client";

import axios from "axios";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  Box,
  CreditCard,
  History,
  Settings,
  Star,
  LogOut,
} from "lucide-react";

export const StudioNavigationMenu = ({ signedIn }: { signedIn: boolean }) => {
  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling router
  const router = useRouter();

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
      href: `/studio/reviews`,
      label: "Reviews",
      icon: <Star className="h-5 w-5" />,
      active: pathname === `/studio/reviews`,
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

  // Function handling deleting the cookie session
  const onLogout = async () => {
    try {
      setLoading(true);

      // DELETE request to proxy server
      await axios.delete("/api/auth/sign-out");

      // Show a success toast
      toast.success("Successfully logged out!");

      // Redirect the user to login page
      router.push("/auth/sign-in");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-40 w-16 md:w-52 h-full transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-slate-900/50">
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
              <p className="hidden md:block">{item.label}</p>
            </Link>
          ))}
        </div>
        <div className="mt-60">
          {signedIn ? (
            <Button
              variant="secondary"
              disabled={loading}
              onClick={onLogout}
              className="w-full flex items-center gap-x-5 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md text-sm font-medium p-3"
            >
              <LogOut className="w-5 h-5" />
              <p>Logout</p>
            </Button>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
