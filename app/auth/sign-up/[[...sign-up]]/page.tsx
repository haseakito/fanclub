import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="mx-auto flex w-full justify-center space-y-6 sm:w-[350px]">
      <SignUp
        appearance={{
          elements: {
            card: "shadow-none",
          },
        }}
      />
    </div>
  );
}
