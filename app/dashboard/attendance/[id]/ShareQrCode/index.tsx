import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QrCode } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function ShareQrCode({ classid }: { classid: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size={"sm"}>
          <QrCode size={18} className="mr-2" />
          QR Code
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share attendance QR Code</DialogTitle>
          <DialogDescription>
            Share Attendance QR Code to record your student attendance.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full relative flex flex-row items-center justify-center">
          <div className="border border-black p-5 rounded-lg">
            <QRCodeCanvas
              value={`https://hadir-go.vercel.app/attendance/${classid}`}
              width={"100%"}
              height={"100%"}
              size={300}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useState } from "react";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// const FormSchema = z.object({
//   createdAt: z.date({
//     required_error: "A date is required.",
//   }),
// });

// export default function CreateAttendance() {
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   });
//   const [date, setDate] = useState<Date>();
//   function onSubmit(data: z.infer<typeof FormSchema>) {
//     console.log(data);
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="default" size={"sm"}>
//           Create attendance
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <DialogHeader>
//               <DialogTitle>Create Attendance</DialogTitle>
//               <DialogDescription>
//                 Create attendance to record your student attendance.
//               </DialogDescription>
//             </DialogHeader>
//             <div className="flex flex-row items-center justify-center">
//               <FormField
//                 control={form.control}
//                 name="createdAt"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>Attendance date:</FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-[240px] pl-3 text-left font-normal",
//                               !field.value && "text-muted-foreground"
//                             )}
//                           >
//                             {field.value ? (
//                               format(field.value, "PPP")
//                             ) : (
//                               <span>Pick a date</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={field.value}
//                           onSelect={field.onChange}
//                           disabled={(date) =>
//                             date > new Date() || date < new Date("1900-01-01")
//                           }
//                           initialFocus
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <DialogFooter>
//               <Button type="submit" size={"sm"}>
//                 Create
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
