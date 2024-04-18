import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="px-6 lg:px-8">
      <div className="space-y-4">
        <Skeleton className="h-3.5 w-40 rounded-full" />
        <Skeleton className="h-3 w-72 rounded-full" />
      </div>
      <div className="flex lg:gap-10 flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <Skeleton className="aspect-square" />
        <Skeleton className="aspect-square" />
      </div>
    </div>
  );
}
