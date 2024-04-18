"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

import { useCategoryModal } from "@/hooks/use-category-modal";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Category name is required",
  }),
});

export function CategoryModal() {
  const { getToken } = useAuth();

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling post modal state
  const categoryModal = useCategoryModal();

  // Hooks handling router
  const router = useRouter()

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // Asynchronous function handling submitting the form
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // POST request to the backend API
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/categories",
        {
          name: e.name
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Show successful toast
      toast.success("Successfully created the category");

      // Show confetti

      // 
      router.refresh()
      
    } catch (error) {
      // Output the error to log
      console.log(error);

      // Show alert toast if the request failed
      toast.error("Ooops! Something went wrong with your request.");
    } finally {
      setLoading(false);
      categoryModal.onClose()
    }
  };

  return (
    <Modal
      title="Create category"
      description="Add a new category to help users find better posts"
      isOpen={categoryModal.isOpen}
      onClose={categoryModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Category name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={loading}
                    placeholder="e.g. awesome category"
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
              onClick={categoryModal.onClose}
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
