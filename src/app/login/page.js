import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/auth";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="text-sm text-slate-300">
          Sign in to manage locations and QR-powered review routing.
        </p>
        <AuthForm mode="login" />
        <p className="text-sm text-slate-300">
          New here?{" "}
          <Link href="/signup" className="text-indigo-300 hover:text-indigo-200">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
