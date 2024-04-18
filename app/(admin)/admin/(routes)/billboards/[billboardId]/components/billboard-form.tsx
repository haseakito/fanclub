"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { ImageUpload } from "@/components/image-upload";
import { AlertModal } from "@/components/modals/alert-modal";

import { Trash } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string().min(1),
});

interface BillboardFormProps {
  initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData,
}) => {
  const { getToken } = useAuth();

  // Boolean state handling modal state
  const [open, setOpen] = useState(false);

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling router
  const router = useRouter();

  // Hooks handling url param
  const params = useParams();

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description =
    "Add a new billboard to site to notify campaigns, news and pickups";

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          url: initialData.edges.asset ? initialData.edges.asset.url : "",
        }
      : {
          title: "",
          description: "",
          url: "",
        },
  });

  // Asynchronous function handling updating the billboard
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      // POST request to create a new billboard
      await axios.patch(
        process.env.NEXT_PUBLIC_API_URL + `/billboards/${params.billboardId}`,
        e,
        {
          headers: {
            Authorization: `${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh the page
      router.refresh();

      // Show a success toast
      toast.success("Successfully updated the billboard.");

      // Redirect the user to billboard page
      router.push("/admin/billboards")
    } catch (error: any) {
      // Show an error toast
      toast.error("Ooops! There was a problem with your request!");
    } finally {
      setLoading(false);
    }
  };

  // Asynchronous function handling uploading a billboard image
  const onUpload = async (files: FileList) => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // Instantiate a new form data
      const formData = new FormData();

      // Append file to the formData
      formData.append("image", files[0]);

      // POST request to upload a billboard image
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          `/billboards/${params.billboardId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show successful toast
      toast.success("Successfully uploaded the billboard image");

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

  // Asynchronous function handling deleting the billboard
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/billboards/${params.billboardId}`
      );

      // Refresh the page
      router.refresh();

      // Redirect to the billboards overview page
      router.push(`/admin/billboards`);

      // Show a success toast
      toast.success("Successfully deleted the billboard.");
    } catch (error: any) {
      // Show an error toast
      toast.error("Ooops! There was a problem with your request!");
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
          {/* Billboard image field */}
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    urls={field.value ? [field.value] : []}
                    disabled={loading}
                    onUpload={onUpload}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Billboard name field */}
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
                      placeholder="Billboard title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Billboard description field  */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormDescription>
                    Note that this description does not appear anywhere on
                    designful but admin console. Use this field as a note for
                    this billboard
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Billboard description"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
