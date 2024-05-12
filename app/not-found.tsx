import Link from "next/link";

export default function NotFoundError() {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">Oops! Page Not Found!</span>
        <p className="text-center text-muted-foreground">
          It seems like the page you are looking for <br />
          does not exist or might have been removed.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/"
            className="text-sm hover:text-muted-foreground hover:underline duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
