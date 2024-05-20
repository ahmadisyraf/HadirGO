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

export default function ShareQrCode({ classcode }: { classcode: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size={"sm"} className="mr-2">
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
          <div className="border-2 border-black p-5 rounded-lg">
            <QRCodeCanvas
              value={`https://hadir-go.vercel.app/attendance/${classcode}`}
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
