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
import { Ban, Edit, Eye, MoreHorizontal } from "lucide-react";

import { UserColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";

interface ActionCellProps {
  data: UserColumn;
}

export const ActionCell: React.FC<ActionCellProps> = ({ data }) => {
  // Boolean state handling modal state
  const [open, setOpen] = useState(false);

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
      await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/users/${data.id}/ban`
      );

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
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-6 w-6 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {/* View button in dropdown menu */}
          <DropdownMenuItem onClick={() => router.push(`/users/${data.id}`)}>
            <Eye className="mr-2 h-4 w-4" /> View
          </DropdownMenuItem>

          {/* Edit button in dropdown menu */}
          <DropdownMenuItem
            onClick={() => router.push(`/admin/users/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          
          {/* Delete button in dropdown menu */}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Ban className="mr-2 h-4 w-4" /> Ban
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
