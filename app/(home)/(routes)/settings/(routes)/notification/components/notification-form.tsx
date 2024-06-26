"use client";

import axios from "@/lib/axios";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@headlessui/react";

const formSchema = z.object({
  marketing: z.boolean().default(false),
  social: z.boolean().default(false),
});

interface NotificationFormProps {
  initialData: User | null;
  token: string | null;
}

export const NotificationForm: React.FC<NotificationFormProps> = ({
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
        marketing: true,
        social: true,
      };

  // Hooks handling router
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Function handling updating the notification settings
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      await axios.patch(
        `/users/update/notifications`,
        {
          e,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Show a success toast
      toast.success("Successfully updated the post.");

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
          {/* Marketing notification field */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="marketing"
              render={({ field }) => (
                <FormItem className="space-y-2 flex flex-row items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel>Marketing</FormLabel>
                    <FormDescription>
                      Receive notifications about new products, features, and
                      more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onChange={field.onChange}
                      className={`${field.value ? "bg-primary" : "bg-input"}
          relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                    >
                      <span className="sr-only">
                        Marketing notification setting
                      </span>
                      <span
                        aria-hidden="true"
                        className={`${
                          field.value
                            ? "translate-x-0 bg-input"
                            : "translate-x-4 bg-primary"
                        }
            pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Social notification field  */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="social"
              render={({ field }) => (
                <FormItem className="space-y-2 flex flex-row items-center justify-between rounded-lg border p-4">
                  <div>
                    <FormLabel>Social</FormLabel>
                    <FormDescription>
                      Receive notifications for likes, follows, orders and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onChange={field.onChange}
                      className={`${field.value ? "bg-primary" : "bg-input"}
          relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
                    >
                      <span className="sr-only">
                        Social notification setting
                      </span>
                      <span
                        aria-hidden="true"
                        className={`${
                          field.value
                            ? "translate-x-0 bg-input"
                            : "translate-x-4 bg-primary"
                        }
            pointer-events-none inline-block h-4 w-4 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full mt-10">
            <Button type="submit" size="lg" disabled={loading}>
              Update notifications
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
