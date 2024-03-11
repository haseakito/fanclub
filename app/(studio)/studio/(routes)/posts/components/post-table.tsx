"use client";

import { usePostModal } from "@/hooks/use-post-modal";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { PostModal } from "@/components/modals/post-modal";

import { Plus } from "lucide-react";

import { PostColumn, columns } from "./columns";

interface PostTableProps {
  data: PostColumn[];
}

export const PostTable: React.FC<PostTableProps> = ({ data }) => {
  // 
  const postModal = usePostModal()

  return (
    <>
      <PostModal />
      <div className="flex items-center justify-between">
        <Heading
          title="Posts"
          description="Manage posts for your fans."
        />
        <Button
          onClick={() => postModal.onOpen()}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <hr />
      <DataTable searchKey="title" columns={columns} data={data} />
    </>
  );
};
