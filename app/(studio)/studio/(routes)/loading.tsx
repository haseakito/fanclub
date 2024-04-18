import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Skeleton className="h-3.5 w-40 rounded-full" />
        <Skeleton className="h-3 w-72 rounded-full" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="aspect-square rounded-xl" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="aspect-auto rounded-xl col-span-4" />
          <Skeleton className="aspect-square rounded-xl col-span-4 md:col-span-3" />
        </div>
      </div>
    </div>
  );
}
