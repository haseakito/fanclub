"use client";

import axios from "@/lib/axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";

export const AccountDeleteForm = () => {
  // Boolean state handling modal state
  const [open, setOpen] = useState(false);

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling router
  const router = useRouter();

  // Asynchronous function handling deleting the account
  const onConfirm = async () => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // DELETE request to backend API
      await axios.delete("/users/");

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

      <h3 className="mt-16 text-lg font-medium">Delete account</h3>
      <p className="text-sm text-muted-foreground">
        Make sure to delete all posts before you proceed to delete. 
      </p>

      <div className="mt-10">
        <Button
          variant="destructive"
          size="lg"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          Delete Account
        </Button>
      </div>
    </>
  );
};
