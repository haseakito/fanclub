export default async function CommentPage() {
  return (
    <div className="my-20 flex flex-col items-center justify-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={72}
        height={72}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="tabler-icon tabler-icon-planet"
      >
        <path d="M18.816 13.58c2.292 2.138 3.546 4 3.092 4.9c-.745 1.46 -5.783 -.259 -11.255 -3.838c-5.47 -3.579 -9.304 -7.664 -8.56 -9.123c.464 -.91 2.926 -.444 5.803 .805"></path>
        <path d="M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
      </svg>
      <h1 className="text-4xl font-bold leading-tight">Coming Soon 👀</h1>
      <p className="text-center text-muted-foreground">
        Stay tuned for updates!
      </p>
    </div>
  );
}
