import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { StudioNavigationMenu } from "./nav-items";
import { StudioMobileMenu } from "./mobile-menu";

export function Navbar({ signedIn }: { signedIn: boolean }) {
  return (
    <>
      <div className="sm:ml-16 md:ml-52 border-b-[1px] shadow-sm h-16 flex items-center justify-between gap-x-2.5 px-4">
        <div className="block sm:hidden">
          <StudioMobileMenu signedIn={signedIn} />
        </div>
        <Link
          href="/studio"
          className="flex lg:ml-0 gap-x-2 px-3 sm:border-r-[0.5px]"
        >
          <p className="font-bold text-xl">Studio</p>
        </Link>
        <div>
          <ThemeToggle />
        </div>
      </div>
      <StudioNavigationMenu signedIn={signedIn} />
    </>
  );
}
