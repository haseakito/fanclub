"use client";

import axios from "axios";
import * as z from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AlertModal } from "@/components/modals/alert-modal";
import { Trash } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required").max(1000),
  price: z.coerce.number(),
  trial_period_days: z.coerce.number(),
  is_archived: z.boolean().default(false).optional(),
});

interface PostFormProps {
  initialData?: Subscription;
}

export const SubscriptionForm: React.FC<PostFormProps> = ({ initialData }) => {
  const { userId, getToken } = useAuth();

  // Boolean state handling modal state
  const [open, setOpen] = useState(false);

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  const title = initialData
    ? "Edit the subscription"
    : "Create a new subscription";
  const description = initialData
    ? "Edit the subscription details."
    : "Add a new subscription details.";
  const toastMessage = initialData
    ? "Successfully updated the subscription."
    : "Successfully created the subscription.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
      }
    : {
        title: "",
        description: "",
        price: 0,
        trial_period_days: 0,
        isArchived: false,
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

  //
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

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const data = {
        ...e,
        user_id: userId,
      };

      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/subscriptions",
        data,
        {
          headers: {
            Authorization: `${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Show a success toast
      toast.success(toastMessage);

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

  const onDelete = async () => {};

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Divider />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-3 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8"
        >
          {/* Subscription name field */}
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
                      placeholder="Subscription name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Subscription description field  */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Subscription description"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Subscription price field */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormDescription>
                    Set the recurring price for this subscription plans. This
                    price is charged to customers once they subscribe to this
                    plan on a monthly basis.
                  </FormDescription>
                  <FormControl>
                    <Input disabled={loading} type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Subscription trial period days field */}
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="trial_period_days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trial Days</FormLabel>
                  <FormDescription>
                    Set the trial period so that your fans can enjoy your posts
                    for free during this period.
                  </FormDescription>
                  <FormControl>
                    <Input disabled={loading} type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Label className="col-span-full">Status</Label>

          {/* Subscription status field */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="is_archived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      If archived, this subscription plan will not appear to
                      your fans.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full mt-10">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className=" w-full"
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
