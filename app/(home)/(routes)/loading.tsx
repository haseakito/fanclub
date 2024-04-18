import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container>
      <div className="w-full h-full p-8">
        <Skeleton className="w-full aspect-square rounded-xl md:aspect-[2.4/1]" />
        <div className="mt-8">
          <div className="space-y-4">
            <Skeleton className="h-3.5 w-40 rounded-full" />
            <Skeleton className="h-3 w-72 rounded-full" />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
            <Skeleton className="aspect-square rounded-xl" />
          </div>
        </div>
      </div>
    </Container>
  );
}
