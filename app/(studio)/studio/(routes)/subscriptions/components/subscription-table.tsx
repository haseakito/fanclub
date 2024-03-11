"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";

import { SubscriptionColumn, columns } from "./columns";

interface SubscriptionTableProps {
  data: SubscriptionColumn[];
}

export const SubscriptionTable: React.FC<SubscriptionTableProps> = ({ data }) => {
  // Hooks handling router
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Subscriptions" description="Manage subscriptions for your fans." />
        <Button onClick={() => router.push(`/studio/subscriptions/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <hr />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
