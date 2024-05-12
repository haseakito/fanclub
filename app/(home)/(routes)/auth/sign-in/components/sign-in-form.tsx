"use client";

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not a valid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain at least one lowercase letter, one uppercase letter, and one number"
    ),
});

export const SignInForm = () => {
  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling router
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      // POST request to proxy server
      await axios.post("/api/auth/sign-in", {
        email: e.email,
        password: e.password,
      });

      // Show a success toast
      toast.success("Successfully sign in.");

      router.push("/profile");
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
      <div className="flex items-center justify-center">
        <Heading title="Sign in to your account" description="" />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-3 mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-8"
        >
          {/* User email field */}
          <div className="col-span-full">
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
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* User password field */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="col-span-full px-2 text-sm text-muted-foreground">
            <a
              href="/auth/reset-password"
              className="underline underline-offset-4 hover:text-primary duration-150"
            >
              Forgot password?
            </a>
          </p>

          <div className="col-span-full mt-10">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              Sign In
            </Button>
          </div>
        </form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a
            href=""
            className="underline underline-offset-4 hover:text-primary duration-150"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href=""
            className="underline underline-offset-4 hover:text-primary duration-150"
          >
            Privacy Policy
          </a>
        </p>

        <p className="p-8 text-center text-sm text-muted-foreground">
          New to Designful?{" "}
          <a
            href="/auth/sign-up"
            className="underline underline-offset-4 text-indigo-400 hover:text-primary duration-150"
          >
            Create an account
          </a>
        </p>
      </Form>
    </>
  );
};
