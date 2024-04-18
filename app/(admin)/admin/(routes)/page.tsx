import { clerkClient } from "@clerk/nextjs";
import { UserTable } from "./components/user-table";
import { UserColumn } from "./components/columns";

interface AdminDashboardPageProps {
  limit?: number;
  offset?: number;
  query?: string;
}

export default async function AdminDashboardPage({
  limit = 10,
  offset = 0,
}: AdminDashboardPageProps) {
  const users = await clerkClient.users.getUserList({
    limit: limit,
    offset: offset,
  });

  const formattedUsers: UserColumn[] = users.map((user) => ({
    id: user.id,
    username: user.username || "",
    profile_image_url: user.imageUrl,
    email_address: user.emailAddresses[0].emailAddress,
    phone_number:
      user.phoneNumbers.length !== 0 ? user.phoneNumbers[0].phoneNumber : "No number",
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UserTable data={formattedUsers} />
      </div>
    </div>
  );
}
