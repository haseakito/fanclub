"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

import { useBillboardModal } from "@/hooks/use-billboard-modal";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Billboard title is required",
  }),
});

export function BillboardModal() {
  const { getToken } = useAuth();

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling billboard modal state
  const billboardModal = useBillboardModal()

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // Asynchronous function handling submitting the form
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // POST request to the backend API
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/billboards",
        {
          title: e.title,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Show successful toast
      toast.success("Successfully created the billboard");

      // Refresh page and redirect to the post edit page
      window.location.assign(`/admin/billboards/${res.data.id}`);
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
    <Modal
      title="Create billboard"
      description="Add a new billboard to notify news, event, and more"
      isOpen={billboardModal.isOpen}
      onClose={billboardModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Post title field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={loading}
                    placeholder="e.g. awesome post"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6 space-x-2 flex items-center justify-end">
            <Button
              variant="outline"
              type="button"
              disabled={loading}
              onClick={billboardModal.onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
