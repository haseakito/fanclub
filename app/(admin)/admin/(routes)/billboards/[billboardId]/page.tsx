import { FetchBillboard } from "@/services/fetch-billboard";
import { BillboardForm } from "./components/billboard-form";

interface BillboardPageProps {
  params: {
    billboardId: string;
  };
}

export default async function BillboardPage({ params }: BillboardPageProps) {
  let billboard;
  // Fetch post with post id
  if (params.billboardId === "new") {
    billboard = null;
  } else {
    billboard = await FetchBillboard(params.billboardId);
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}
