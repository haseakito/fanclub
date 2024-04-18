"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";

import { columns, OrderColumn } from "./columns";

interface OrderTableProps {
  data: OrderColumn[];
}

export const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Divider />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
