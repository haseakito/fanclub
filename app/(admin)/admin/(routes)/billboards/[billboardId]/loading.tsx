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

        <div className="mt-3 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8">
          <Skeleton className="w-[200px] h-[200px] aspect-square" />
          <Skeleton className="col-span-full rounded-full" />
          <Skeleton className="col-span-full rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
