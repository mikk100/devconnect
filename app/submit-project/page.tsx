import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SubmitProjectForm from "./submit-project-form";

export default async function SubmitProjectPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6 sm:p-10">
        <div className="mb-8">
          <span className="inline-block text-xs font-bold tracking-wider text-slate-400 uppercase mb-1">
            DevConnect Showcase
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Submit a Project
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
            Share your repository link, live demo, and build stack with the developer community.
          </p>
        </div>

        {/* Pass session down to the client form */}
        <SubmitProjectForm session={session} />
      </div>
    </main>
  );
}