"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionCell } from "./action-cell";
import Image from "next/image";

export type UserColumn = {
  id: string;
  username: string;
  profile_image_url: string;
  email_address: string;
  phone_number: string;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => (
      <div className="max-w-[50px] truncate">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "profile_image_url",
    header: "Profile",
    cell: ({ row }) => (
      <Image
        src={row.getValue("profile_image_url")}
        alt="profile picture"
        unoptimized
        width="30"
        height="30"
        className="rounded-full"
      />
    ),
  },
  {
    accessorKey: "username",
    header: "Name",
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">{row.getValue("username")}</div>
    ),
  },
  {
    accessorKey: "email_address",
    header: "Email",
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">
        {row.getValue("email_address")}
      </div>
    ),
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">
        {row.getValue("phone_number")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell data={row.original} />,
  },
];
