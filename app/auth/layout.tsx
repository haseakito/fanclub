import { MoveLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden bg-background shadow-md md:shadow-xl">
      <div className="container relative h-[820px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900"></div>
          <Link
            href="/"
            className="relative z-20 flex items-center gap-x-3 text-xs hover:text-muted-foreground duration-300"
          >
            <MoveLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h2 className="mt-10 relative z-20 flex items-center text-2xl font-medium">
            Designful
          </h2>
          <div className="relative z-20 mt-auto">
            <blockquote>
              <p className="text-lg">
                Designful always support creators and fans by providing the best
                quality user experiences.
              </p>
            </blockquote>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
