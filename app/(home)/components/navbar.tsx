import { ThemeToggle } from "@/components/theme-toggle";
import { SearchToggle } from "@/components/search-toggle";
import { HomeNavigationMenu } from "./nav-items";
import { HomeMobileMenu } from "./mobile-menu";

export function Navbar({ signedIn }: { signedIn: boolean }) {
  return (
    <>
      <div className="sm:ml-16 md:ml-52 border-b-[1px] shadow-sm h-16 flex items-center justify-between gap-x-2.5 px-4">
        <div className="block sm:hidden">
          <HomeMobileMenu signedIn={signedIn} />
        </div>
        <div className="w-full flex justify-end gap-x-1">
          <SearchToggle />
          <ThemeToggle />
        </div>
      </div>
      <HomeNavigationMenu signedIn={signedIn} />
    </>
  );
}
