"use client";

import axios from "axios";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/nextjs";
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
import { MultiSelect, OptionType } from "@/components/ui/multi-select";
import { AlertModal } from "@/components/modals/alert-modal";
import { Trash } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";

const formSchema = z.object({
  images: z.array(z.string()).optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required").max(1000),
  price: z.coerce.number(),
  subscriptions: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  is_featured: z.boolean().default(false),
  status: z.boolean().default(false),
});

interface PostFormProps {
  initialData: Post | null;
  categories: Category[];
  subscriptions: Subscription[];
}

export const PostForm: React.FC<PostFormProps> = ({
  initialData,
  categories,
  subscriptions,
}) => {
  const { userId, getToken } = useAuth();

  // Boolean state handling modal state
  const [open, setOpen] = useState(false);

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  const [selectedSubscriptions, setSelectedSubscriptions] = useState<
    OptionType[]
  >(initialData?.edges.subscriptions || []);

  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>(
    initialData?.edges.categories || []
  );

  // Default values for form
  const defaultValues = initialData
    ? {
        ...initialData,
        images:
          initialData.edges.assets &&
          initialData.edges.assets.map((asset) => asset.url),
      }
    : {
        title: "",
        images: [],
        price: 0,
        categoryId: [],
        subscriptionId: [],
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
        process.env.NEXT_PUBLIC_API_URL + `/posts/${params.postId}`,
        {
          title: e.title,
          description: e.description,
          user_id: userId,
          price: e.price,
          categories: selectedCategories.map((category) => category.id),
          subscriptions: selectedSubscriptions.map(
            (subscription) => subscription.id
          ),
          is_featured: e.is_featured,
          status: e.status,
        },
        {
          headers: {
            Authorization: `${await getToken()}`,
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

  // Asynchronous function handling uploading post images
  const onUpload = async (files: FileList) => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // Instantiate a new form data
      const formData = new FormData();

      // Append each file to the formData
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });

      // POST request to upload a billboard image
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/posts/${params.postId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show successful toast
      toast.success("Successfully uploaded the post images");

      // Refresh the page to update content
      window.location.reload()
    } catch (error) {
      // Output the error to log
      console.log(error);

      // Show alert toast if the request failed
      toast.error("Ooops! Something went wrong with your request.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/posts/${params.postId}`
      );

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
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <Heading title="Edit the post" description="Edit the post details" />
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
          {/* Post images field */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Content</FormLabel>
                  <FormControl>
                    <ImageUpload
                      urls={field.value?.map((image) => image) || []}
                      disabled={loading}
                      multiple={true}
                      onUpload={onUpload}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Post name field */}
          <div className="col-span-full">
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
          <div className="col-span-2">
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

          {/* Post subscription field */}
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
          )}

          {/* Post category field */}
          <div className="col-span-2">
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
                    className="w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Label className="col-span-full">Status</Label>

          {/* Product published status field */}
          <div className="col-span-full">
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
          <div className="col-span-full">
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
