import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-row items-center justify-center h-dvh w-full">
      <div className="text-center flex flex-col items-center justify-center">
        <LoaderCircle size={30} className="animate-spin" />
        <p>Fetching data, please wait...</p>
      </div>
    </div>
  );
}
