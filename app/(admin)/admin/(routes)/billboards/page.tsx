import { FetchBillboards } from "@/services/fetch-billboard";
import { BillboardList } from "./components/billboard-list";

export default async function BillboardPage() {
  // Fetch billboards
  const billboards = await FetchBillboards();
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <BillboardList data={billboards} />
        </div>
      </div>
    </>
  );
}
