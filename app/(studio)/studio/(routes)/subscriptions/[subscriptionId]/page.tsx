import { FetchSubscription } from "@/services/fetch-subscription";
import { SubscriptionForm } from "./components/subscription-form";

interface SubscriptionPageProps {
  params: {
    subscriptionId: string;
  };
}

export default async function SubscriptionPage({
  params,
}: SubscriptionPageProps) {
  // Fetch subscription with subscription id
  let subscription;
  if (params.subscriptionId === "new") {
    subscription = undefined;
  } else {
    subscription = await FetchSubscription(params.subscriptionId);
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SubscriptionForm initialData={subscription} />
      </div>
    </div>
  );
}
