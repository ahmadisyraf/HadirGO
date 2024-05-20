import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function DeleteParticipant({ classroomId, userId }: any) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size={"icon"}>
          <Trash size={18} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await fetch(`/api/participant/${classroomId}`, {
                method: "DELETE",
                body: JSON.stringify({
                  userId,
                }),
                next: {
                  revalidate: 0,
                },
              })
                .then((res) => {
                  if (res.ok) {
                    toast({
                      title: "User kicked 🎉",
                      description: "Classroom has been deleted",
                    });
                  } else {
                    toast({
                      title: `${res.statusText} ⛔️`,
                      description: "Please contact our support",
                    });
                  }
                })
                .catch((error) => {
                  toast({
                    title: "Opps! something wrong ⛔️",
                    description: error,
                  });
                })
                .finally(() => router.push("/dashboard"));
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
