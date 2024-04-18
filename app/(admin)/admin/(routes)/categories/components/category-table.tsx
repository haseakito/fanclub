"use client";

import { useCategoryModal } from "@/hooks/use-category-modal";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { CategoryModal } from "@/components/modals/category-modal";

import { Plus } from "lucide-react";

import { CategoryColumn, columns } from "./columns";

interface CategoryTableProps {
  data: CategoryColumn[];
}

export const CategoryTable: React.FC<CategoryTableProps> = ({ data }) => {
  // Hooks handling category modal
  const categoryModal = useCategoryModal();

  return (
    <>
      <CategoryModal />

      <div className="flex items-center justify-between">
        <Heading
          title="Categories"
          description="Manage categories in site. You can create, delete and view category details."
        />
        <Button onClick={categoryModal.onOpen}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <hr />
      <DataTable searchKey="username" columns={columns} data={data} />
    </>
  );
};
