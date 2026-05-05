import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getCurrentUser } from "@/lib/auth";

export default async function SignupPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-3xl font-semibold">Create your ReviewFlow account</h1>
        <p className="text-sm text-slate-300">
          Start collecting better reviews while capturing private feedback.
        </p>
        <AuthForm mode="signup" />
        <p className="text-sm text-slate-300">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-300 hover:text-indigo-200">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
