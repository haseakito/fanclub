import { Navbar } from "./components/navbar";
import { checkSession } from "@/lib/session";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Boolean state checking if the user has signed in
  const signedIn = checkSession();

  return (
    <>
      <Navbar signedIn={signedIn} />
      <div className="p-4 sm:ml-16 md:ml-52">{children}</div>
    </>
  );
}
