"use client";

import * as z from "zod";
import axios from "@/lib/axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { usePostModal } from "@/hooks/use-post-modal";

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Post title is required",
    })
    .max(100, {
      message: "Post title must be no more than 100 characters long",
    }),
});

interface PostModalProps {
  token: string | null;
}

export const PostModal: React.FC<PostModalProps> = ({ token }) => {
  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling post modal state
  const postModal = usePostModal();

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

      // POST request to server
      const res = await axios.post(
        "/posts",
        {
          title: e.title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show successful toast
      toast.success("Successfully created the post");

      // Refresh page and redirect to the post edit page
      window.location.assign(`/studio/posts/${res.data.id}`);
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
      title="Create post"
      description="Add a new post to surprise your fans"
      isOpen={postModal.isOpen}
      onClose={postModal.onClose}
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
              onClick={postModal.onClose}
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
};
