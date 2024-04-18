import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto flex w-full justify-center space-y-6 sm:w-[350px]">
      <SignIn
        appearance={{
          elements: {
            card: "shadow-none",
          },
        }}
      />
    </div>
  );
}
