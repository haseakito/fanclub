import { FetchCategories } from "@/services/fetch-category";
import { formatDate } from "@/lib/format";
import { CategoryColumn } from "./components/columns";
import { CategoryTable } from "./components/category-table";

export default async function CategoriesPage() {
  // Fetch categories
  const categories = await FetchCategories()

  // Formate categories into CategoryColumn
  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    created_at: formatDate(category.created_at)
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryTable data={formattedCategories} />
      </div>
    </div>
  );
}
