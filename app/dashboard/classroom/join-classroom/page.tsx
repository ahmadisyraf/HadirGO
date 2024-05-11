"use client";

import { Card } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  code: z.string().min(2, {
    message: "Class code must be at least 2 characters.",
  }),
});

export default function CreateClassroom() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const cookies = useCookies();
  const userid = cookies.get("userid");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await fetch(`/api/participant/${userid}`, {
      method: "POST",
      body: JSON.stringify({
        classcode: values.code,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          toast({
            title: "Successfuly join classroom 🎉",
            description: "Continue to fill in attendance.",
          });
        } else {
          toast({
            title: "Oops! something wrong ⛔️",
            description:
              "We unable to find your class or you already joined the class",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Oops! something wrong ⛔️",
          description: error,
        });
      })
      .finally(() => {
        setLoading(false);
        router.push("/dashboard");
      });
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Classroom</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Join classroom</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Join classroom</h1>
      </div>
      <Card
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm px-5 md:px-10"
        x-chunk="dashboard-02-chunk-1"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Classroom code</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              Join
            </Button>
          </form>
        </Form>
      </Card>
    </main>
  );
}
