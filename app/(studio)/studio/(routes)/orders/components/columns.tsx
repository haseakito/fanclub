"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "./action-cell";

export type OrderColumn = {
  id: string;
  user: string;
  post: string;
  isPaid: boolean;
  channel: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => (
      <div className="max-w-[50px] truncate">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">{row.getValue("user")}</div>
    ),
  },
  {
    accessorKey: "post",
    header: "Target",
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">{row.getValue("post")}</div>
    ),
  },
  {
    accessorKey: "isPaid",
    header: "status",
    cell: ({ row }) => {
      const status = row.getValue("status");

      if (status === false) {
        return <Badge variant="yellow">not paid</Badge>;
      }

      return <Badge>paid</Badge>;
    },
  },
  {
    accessorKey: "channel",
    header: "Channel",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell data={row.original} />,
  },
];
