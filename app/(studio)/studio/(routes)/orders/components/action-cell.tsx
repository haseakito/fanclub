"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, MoreHorizontal } from "lucide-react";

import { OrderColumn } from "./columns";

interface ActionCellProps {
  data: OrderColumn;
}

export const ActionCell: React.FC<ActionCellProps> = ({ data }) => {
  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling router
  const router = useRouter();

  // Asynchronous function handling deleting the product
  const onConfirm = async () => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // DELETE request to backend API
      await axios.delete(`/admin/posts/${data.id}`);

      // Show successful toast
      toast.success("Successfully deleted the product.");

      // Refresh the page to update content
      router.refresh();
    } catch (error) {
      // Output the error to log
      console.log(error);

      // Show alert toast if the request failed
      toast.error("Ooops! Something went wrong with your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-6 w-6 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* Update button in dropdown menu */}
          <DropdownMenuItem
            onClick={() => router.push(`/studio/posts/${data.id}`)}
          >
            <FileText className="mr-2 h-4 w-4" /> Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
