import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <section className="bg-gray-50">
      <div className="w-full px-4 py-3 text-white bg-slate-950 fixed">
        <p className="text-center text-sm font-medium">
          We&apos;re just released our v.1.0.0 version
          <a href="/dashboard" className="inline-block underline ml-1">
            Check us out!
          </a>
        </p>
      </div>
      <div className="mx-auto max-w-screen-xl px-4 py-32 h-dvh lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <Badge className="mb-3">
            University Malaysia Pahang Al-Sultan Abdullah | Hadir GO
          </Badge>
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Simplify and Streamline Class Attendance
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Easily track and manage class attendance with our intuitive
            platform.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={"/dashboard"}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
