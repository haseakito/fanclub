import { PasswordResetConfirmForm } from "./components/password-reset-confirm-form";

interface PasswordResetConfirmFormPage {
  params: {
    email?: string;
    code?: string;
  };
}

export default function PasswordResetConfirmFormPage({
  params,
}: PasswordResetConfirmFormPage) {
  return (
    <div className="mx-auto w-full justify-center space-y-6 sm:w-[500px]">
      <PasswordResetConfirmForm email={params.email} code={params.code} />
    </div>
  );
}
