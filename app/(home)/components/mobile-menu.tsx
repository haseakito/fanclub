"use client";

import axios from "axios";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { User, Mail, Heart, Settings, Menu, LogOut, LogIn } from "lucide-react";

export const HomeMobileMenu = ({ signedIn }: { signedIn: boolean }) => {
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
      href: `/likes`,
      label: "Likes",
      icon: <Heart className="h-5 w-5" />,
      active: pathname === `/comments`,
    },
    {
      href: `/settings`,
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,
      active: pathname.startsWith("/settings"),
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
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <div className="mt-10 grid space-y-2">
          {navItems.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
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
            </SheetClose>
          ))}
        </div>
        <SheetFooter className="mt-60">
          <SheetClose asChild>
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
            ) : (
              <Link
                href="/auth/sign-in"
                className="flex items-center gap-x-5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium p-3"
              >
                <LogIn className="w-5 h-5" />
                <p>Login</p>
              </Link>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
