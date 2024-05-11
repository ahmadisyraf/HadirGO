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
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "next-client-cookies";

const formSchema = z.object({
  classname: z.string().min(2, {
    message: "Class name must be at least 2 characters.",
  }),
  section: z.string().min(2, {
    message: "Section must be at least 2 characters.",
  }),
  subject: z.string().min(2, {
    message: "Section must be at least 2 characters.",
  }),
});

export default function CreateClassroom() {
  const { toast } = useToast();
  const router = useRouter();
  const cookies = useCookies();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classname: "",
      section: "",
      subject: "",
    },
  });

  // console.log(cookies.get("userid"))

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    await fetch("/api/classroom", {
      method: "POST",
      body: JSON.stringify({
        subject: values.subject,
        classname: values.classname,
        section: values.section,
        userid: cookies.get("userid"),
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (!res.ok) {
          toast({
            title: "Oops! something wrong ⛔️",
            description:
              "We unable to save your classroom, please try again later.",
          });
        } else {
          toast({
            title: "You classroom has been created! 🎉",
            description: "You now can share classroom code with your student",
          });

          router.push("/dashboard");
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
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
            <BreadcrumbPage>Create classroom</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Create classroom</h1>
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
              name="classname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class name</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoaderCircle size={18} className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </main>
  );
}
