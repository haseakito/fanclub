import React from "react";

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
          <div className="relative z-20 flex items-center text-lg font-medium">
            Designful
          </div>
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
