import { FetchSubscriptions } from "@/services/fetch-subscription";
import { formatDate } from "@/lib/format";

import { SubscriptionColumn } from "./components/columns";
import { SubscriptionTable } from "./components/subscription-table";

export default async function SubscriptionsPage() {
  // GET request to backend API to fetch products associated with the store
  const subscriptions = await FetchSubscriptions();

  // Format subscription for subscription table
  const formattedSubscriptions: SubscriptionColumn[] = subscriptions.map(
    (sub) => ({
      id: sub.id,
      name: sub.name,
      description: sub.description,
      is_archived: sub.is_archived,
      createdAt: formatDate(sub.created_at),
    })
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubscriptionTable data={formattedSubscriptions} />
      </div>
    </div>
  );
}
