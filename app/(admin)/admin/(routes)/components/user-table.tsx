"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

import { Plus } from "lucide-react";

import { UserColumn, columns } from "./columns";

interface UserTableProps {
  data: UserColumn[];
}

export const UserTable: React.FC<UserTableProps> = ({ data }) => {
  // Hooks handling router
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Users"
          description="Manage users in site. You can ban suspicious account or grant creator permission."
        />
        <Button onClick={() => router.push("/admin/users/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <hr />
      <DataTable searchKey="username" columns={columns} data={data} />
    </>
  );
};
