"use client";

import axios from "axios";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";

import { Divider } from "@/components/ui/divider";
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
  username: z.string().min(1, "username is required"),
  bio: z.string().max(1000),
  url: z.string().url().optional().or(z.literal('')),
});

interface ProfileFormProps {
  initialData: User | null;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
  const { userId, getToken } = useAuth();

  // Boolean state handling modal state
  const [open, setOpen] = useState(false);

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Default values for form
  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        username: "",
        bio: "",
        url: "",
      };

  // Hooks handling router
  const router = useRouter();

  // Hooks handling url param
  const params = useParams();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (form.formState.isDirty) {
        event.preventDefault();

        return "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [form.formState.isDirty]);

  //
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      await axios.patch(
        process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`,
        {
          "username": e.username,
          "bio": e.bio,
          "url": e.url
        },
        {
          headers: {
            Authorization: `${await getToken()}`,
            "Content-Type": "application/json",
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
      <h3 className="text-lg font-medium">Update your profile.</h3>
      <p className="text-sm text-muted-foreground">
        This is how others will see you on the site.
      </p>

      <Divider />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-3 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8"
        >
          {/* User name field */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="text"
                      placeholder="designful"
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
                    Add link to your website, blog, or social media profiles.
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
