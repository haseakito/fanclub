import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="w-full h-full p-8">
        <div className="mx-auto max-w-sm sm:max-w-7xl sm:px-6 lg:px-8">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="mt-5">
            <Skeleton className="h-3.5 w-20 sm:w-52" />
            <div className="mt-7 space-y-2">
              <Skeleton className="h-2.5 w-full" />
              <Skeleton className="h-2.5 w-full" />
              <Skeleton className="h-2.5 w-full" />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
          </div>
        </div>
      </div>
    </Container>
  );
}
