"use client";

import { Divider } from "@/components/ui/divider";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <Skeleton className="h-3.5 w-40 rounded-full" />
            <Skeleton className="h-3 w-72 rounded-full" />
          </div>
        </div>

        <Divider />
        <div className="mt-9 grid auto-rows-fr grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <Skeleton className="aspect-square" />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    </div>
  );
};

export default Loading;
