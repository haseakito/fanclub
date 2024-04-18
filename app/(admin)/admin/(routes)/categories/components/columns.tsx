"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionCell } from "./action-cell";

export type CategoryColumn = {
  id: string;
  name: string;
  created_at: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
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
      <div className="max-w-[300px] truncate">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">{row.getValue("name")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell data={row.original} />,
  },
];
