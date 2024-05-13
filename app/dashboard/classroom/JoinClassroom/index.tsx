"use client";

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCookies } from "next-client-cookies";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  code: z.string().min(2, {
    message: "Class code must be at least 2 characters.",
  }),
});

export default function JoinClassroom() {
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
            title: `${res.statusText} ⛔️`,
            description: "We unable to join you to classroom",
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size={"sm"}>
          Join classroom
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join classroom</DialogTitle>
          <DialogDescription>
            Enter unique classroom code to join classroom
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
                {loading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin mr-2" />
                    <span>Joining</span>
                  </>
                ) : (
                  "Join"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
