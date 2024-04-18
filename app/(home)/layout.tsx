import { Navbar } from "./components/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <Navbar />
      <div className="p-4 sm:ml-16 md:ml-52">{children}</div>
    </>
  );
}
