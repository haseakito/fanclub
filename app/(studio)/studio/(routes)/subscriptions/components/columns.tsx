"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionCell } from "./action-cell";
import { Badge } from "@/components/ui/badge";

export type SubscriptionColumn = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  is_archived: boolean;
};

// TODO: add post id and use row in checkbox to delete
export const columns: ColumnDef<SubscriptionColumn>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[100px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "is_archived",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("is_archived");

      if (status === true) {
        return <Badge variant="yellow">archived</Badge>;
      }

      return <Badge>active</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell data={row.original} />,
  },
];
