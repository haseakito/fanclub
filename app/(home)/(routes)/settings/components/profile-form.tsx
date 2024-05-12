"use client";

import axios from "@/lib/axios";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(100, {
      message: "Name must be no more than 100 characters long",
    }),
  bio: z.string().max(1000),
  url: z.string().url().optional().or(z.literal("")),
});

interface ProfileFormProps {
  initialData: User | null;
  token: string | null;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  token,
}) => {
  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Default values for form
  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        name: "",
        bio: "",
        url: "",
      };

  // Hooks handling router
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Function handling updating user profile
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      // PATCH request to server
      await axios.patch(
        "/users/update/profile",
        {
          username: e.name,
          bio: e.bio,
          url: e.url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show a success toast
      toast.success("Successfully updated the profile.");

      // Refresh the page
      router.refresh();
    } catch (error) {
      console.log(error);

      // Show an error toast
      toast.error("Ooops! There was a problem with your request!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-3 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8"
        >
          {/* User name field */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="text"
                      placeholder="example"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* User bio field  */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="I love music."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* User name field */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormDescription>
                    Add a link to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="url"
                      placeholder="https://example.com/"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full mt-10">
            <Button type="submit" size="lg" disabled={loading}>
              Update profile
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
