"use client";

import Image from "next/image";
import Link from "next/link";

import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Button } from "@/components/ui/button";
import { BillboardModal } from "@/components/modals/billboard-modal";

import { Plus } from "lucide-react";

import { useBillboardModal } from "@/hooks/use-billboard-modal";

interface BillboardListProps {
  data: Billboard[];
}

export const BillboardList: React.FC<BillboardListProps> = ({ data }) => {
  // Hooks handling billboard modal state
  const billboardModal = useBillboardModal();

  return (
    <>
      <BillboardModal />
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Heading
            title="Billboards"
            description="Manage billboards in site. You can show news, event, campaigns, pickups and more."
          />

          <Divider />

          <div className="mt-9 grid auto-rows-fr grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            <Button
              variant="secondary"
              className="w-full h-full aspect-square"
              onClick={billboardModal.onOpen}
            >
              New Billboard
              <Plus className="ml-1 h-4 w-4" />
            </Button>
            {data.map((billboard) => (
              <Link
                key={billboard.id}
                href={`/admin/billboards/${billboard.id}`}
                className="relative w-[380px] h-[380px] rounded-md overflow-hidden"
              >
                <Image
                  fill
                  src={billboard.edges.asset.url}
                  alt="billboard"
                  className="object-cover"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
