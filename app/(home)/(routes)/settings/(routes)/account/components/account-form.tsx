"use client";

import axios from "@/lib/axios";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username is required",
    })
    .max(100, {
      message: "Username must be no more than 100 characters long",
    }),
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not a valid email format"),
  dob: z.date(),
});

interface AccountFormProps {
  initialData: User | null;
  token: string | null;
}

export const AccountForm: React.FC<AccountFormProps> = ({
  initialData,
  token,
}) => {
  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Default values for form
  const defaultValues = initialData
    ? {
        ...initialData,
        dob: initialData.dob ? new Date(initialData.dob) : undefined,
      }
    : {
        username: "",
        email: "",
      };

  // Hooks handling router
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Function handling updating the user's account
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      await axios.patch(
        "/users/update/account",
        {
          username: e.username,
          email: e.email,
          dob: format(e.dob, "yyyy-MM-dd"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Show a success toast
      toast.success("Successfully updated the account.");

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
          {/* Username field */}
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
                      placeholder="example"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* User email field  */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled
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

          {/* User dob field  */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-full mt-10">
            <Button type="submit" size="lg" disabled={loading}>
              Update account
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
