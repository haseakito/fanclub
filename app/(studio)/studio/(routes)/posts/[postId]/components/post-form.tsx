"use client";

import axios from "@/lib/axios";
import * as z from "zod";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
import { MultiSelect, OptionType } from "@/components/ui/multi-select";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters."),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must not exceed 1000 characters."),
  price: z.coerce
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a number.",
    })
    .nonnegative("Price cannot be negative.")
    .default(0),
  subscriptions: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  is_featured: z.boolean().default(false),
  status: z.boolean().default(false),
});

interface PostFormProps {
  token: string;
  initialData: Post | null;
  categories: Category[];
  subscriptions: Subscription[];
}

export const PostForm: React.FC<PostFormProps> = ({
  token,
  initialData,
  categories,
  subscriptions,
}) => {
  // Boolean state handling modal state
  const [open, setOpen] = useState(false);

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // const [selectedSubscriptions, setSelectedSubscriptions] = useState<
  //   OptionType[]
  // >(initialData?.edges.subscriptions || []);

  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>(
    initialData?.edges.categories || []
  );

  // Default values for form
  const defaultValues = initialData
    ? {
        ...initialData,
      }
    : {
        title: "",
        description: "",
        price: 0,
        categories: [],
        subscriptions: [],
        isFeatured: false,
        status: false,
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

  // TODO: ADD subscription
  // subscriptions: selectedSubscriptions.map(
  //   (subscription) => subscription.id
  // ),
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      await axios.patch(
        `/posts/${params.postId}`,
        {
          title: e.title,
          description: e.description,
          price: e.price,
          categories: selectedCategories.map((category) => category.id),
          is_featured: e.is_featured,
          status: e.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show a success toast
      toast.success("Successfully updated the post.");

      // Refresh the page
      router.push("/studio/posts");
    } catch (error) {
      console.log(error);

      // Show an error toast
      toast.error("Ooops! There was a problem with your request!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/posts/${params.postId}`);

      // Show a success toast
      toast.success("Successfully deleted the post");

      // Refresh the page
      router.refresh();

      // Redirect to post overview page
      router.push("/studio/posts");
    } catch (error) {
      // Show an error toast
      toast.error("Ooops! There was a problem with your request!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="text-sm text-muted-foreground">Update your post details.</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-3 max-w-5xl mx-auto gap-x-6 gap-y-8"
        >
          {/* Post name field */}
          <div className="mb-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="text"
                      placeholder="Post title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Post description field  */}
          <div className="mb-5">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Post description"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Post price field */}
          <div className="mb-5">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormDescription>
                    You can sell this post with or without subscription.
                    Otherwise, publish the post free for your fans.
                  </FormDescription>
                  <Input type="number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Post subscription field
          {subscriptions.length === 0 ? (
            <div className="col-span-2">
              <Label className="underline">
                No subscriptions registered yet.
              </Label>
              <Button
                variant="link"
                type="button"
                onClick={() => router.push("/studio/subscriptions/new")}
              >
                Create a new subscription
              </Button>
            </div>
          ) : (
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="subscriptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subscription</FormLabel>
                    <FormDescription>
                      You can subscribe this post to as many plans as you like.
                    </FormDescription>
                    <MultiSelect
                      placeholder="Select subscriptions..."
                      selected={selectedSubscriptions}
                      options={subscriptions}
                      onChange={setSelectedSubscriptions}
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )} */}

          {/* Post category field */}
          <div className="mb-5">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormDescription>
                    You can set as many categories for this post as you like.
                  </FormDescription>
                  <MultiSelect
                    placeholder="Select categories..."
                    selected={selectedCategories}
                    options={categories}
                    onChange={setSelectedCategories}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Label>Status</Label>
          {/* Product published status field */}
          <div className="mb-5">
            <FormField
              control={form.control}
              name="is_featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      If featured, this post will appear top on your profile
                      page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Post status field */}
          <div className="mb-5">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Publish</FormLabel>
                    <FormDescription>
                      If not published, this post will only appear on creator
                      studio.
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
              className="w-full"
            >
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
