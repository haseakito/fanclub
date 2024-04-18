export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="mx-auto max-w-sm sm:max-w-3xl">
            {children}
        </div>
    )
  }