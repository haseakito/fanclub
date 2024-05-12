"use client";

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Heading } from "@/components/ui/heading";
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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not a valid email format"),
});

export function PasswordResetForm() {
  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling router
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/reset-password",
        {
          email: e.email,
        }
      );

      // Show a success toast
      toast.success("Successfully sent an email.");

      // Refresh the page
      router.push("/auth/reset-password/verify");
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
      <Heading
        title="Reset Password"
        description="We'll send you an email with a link for password reset."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 mx-auto">
          {/* User email field */}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    type="text"
                    placeholder="example@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-10">
            <Button type="submit" size="lg" disabled={loading}>
              Send
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
