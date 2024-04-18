import { Metadata } from "next";
import { Navbar } from "./components/navbar";

export const metadata: Metadata = {
  title: "Desginful Studio",
  description: "Studio is the creator exclusive dashboard",
};

export default function StudioLayout({
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
