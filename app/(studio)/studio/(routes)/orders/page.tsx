import { OrderTable } from "./components/order-table";
import { OrderColumn } from "./components/columns";

interface OrdersPageProps {
  params: {
    limit?: string;
    offset?: string;
  };
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  // GET request to backend API to fetch products associated with the store

  const orders: OrderColumn[] = [
    {
      id: "order-1223",
      user: "ramdom user",
      post: "test post",
      isPaid: false,
      channel: "subscription",
      createdAt: "",
    },
  ];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderTable data={orders} />
      </div>
    </div>
  );
}
