import { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkRole } from "@/lib/role";

import { AdminNavbar } from "./components/navbar";

export const metadata: Metadata = {
  title: "Desginful Admin",
  description:
    "Admin is the dashboard to launch campaigns, change layouts, and manage settings",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If the user does not have the admin role, redirect them to the home page
  // if (checkRole("admin")) {
  //   redirect("/");
  // }

  return (
    <>
      <AdminNavbar />
      {children}
    </>
  );
}
