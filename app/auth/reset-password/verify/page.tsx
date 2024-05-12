export default function PasswordResetVerifyPage() {
  return (
    <div className="mx-auto w-full justify-center space-y-6 sm:w-[500px]">
      <div className="max-w-xl px-5 text-center">
        <h2 className="text-[34px] font-bold text-zinc-800">
          Check your inbox
        </h2>
        <p className="mb-2 text-lg text-zinc-500">
          We have sent you a verification link to the email address
        </p>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Did not receive the email yet?{" "}
        <a
          href="/auth/reset-password"
          className="underline underline-offset-4 hover:text-primary"
        >
          Resend
        </a>
      </p>
    </div>
  );
}
