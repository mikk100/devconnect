import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/auth";
import { FiLogIn, FiGithub, FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Theme } from "@/components/Theme";



export default async function SignInPage() {
  // Check session on the server; redirect if already authenticated
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }

  // Server action for email/password sign in
  async function handleCredentialsSignIn(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/dashboard",
      });
    } catch (error) {
      throw error; // NextAuth throws a redirect error on success, so rethrow it
    }
  }

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-12 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="w-full max-w-md p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image 
              src="/favicon.ico" 
              alt="DevConnect Logo"
              width={36}
              height={36}
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold" style={{ color: Theme.primary }}>
              DevConnect
            </span>
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Sign in to manage your portfolio and share your projects.
          </p>
        </div>

        {/* Email & Password Form */}
        <form action={handleCredentialsSignIn} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FiMail className="absolute left-3.5 text-slate-400 text-base" />
              <input
                type="email"
                name="email"
                required
                placeholder="developer@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Password
            </label>
            <div className="relative flex items-center">
              <FiLock className="absolute left-3.5 text-slate-400 text-base" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-medium text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 text-sm shadow-sm cursor-pointer mt-2"
            style={{ backgroundColor: Theme.primary }}
          >
            <FiLogIn className="text-base" />
            <span>Sign In</span>
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
          <span className="px-3 text-xs text-slate-400 uppercase tracking-wider">Or continue with</span>
          <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        </div>

        {/* Alternative OAuth Buttons (wrapped in server action forms) */}
        <div className="grid grid-cols-2 gap-3">
          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-xs transition-colors cursor-pointer text-slate-700 dark:text-slate-200 shadow-sm"
            >
              <FiGithub className="text-base" />
              <span>GitHub</span>
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 font-medium text-xs transition-colors cursor-pointer text-slate-700 dark:text-slate-200 shadow-sm"
            >
              <FcGoogle className="text-base" />
              <span>Google</span>
            </button>
          </form>
        </div>

        {/* Footer info */}
        <div className="text-center pt-2 text-xs text-slate-500 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium hover:underline" style={{ color: Theme.primary }}>
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}