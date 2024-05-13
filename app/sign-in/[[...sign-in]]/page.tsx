import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-dvh w-full flex flex-row items-center justify-center relative">
      <SignIn forceRedirectUrl={"/dashboard"} path="/sign-in" />
    </div>
  );
}
