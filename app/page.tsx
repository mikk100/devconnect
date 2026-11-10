import Link from "next/link";
import { auth } from "@/auth";
import { FiCode, FiCompass, FiPlus, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { Theme } from "@/components/Theme";

export default async function HomePage() {
  const session = await auth();
  const isAuthenticated = !!session;

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col justify-between">
      
      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24 space-y-12 w-full">
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          
          
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Showcase code builds. Connect with developers worldwide.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Publish your GitHub repositories, explore production-ready open source projects, and establish your professional developer identity in one unified SaaS hub.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/submit-project"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: Theme.primary }}
                >
                  <FiPlus /> Submit New Project
                </Link>
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Go to Dashboard <FiArrowRight />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-bold shadow-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: Theme.primary }}
                >
                  Get Started / Sign In
                </Link>
                <Link
                  href="/signin"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <FiCompass /> Explore Community
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-200 dark:border-slate-800">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-500 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-bold text-base">Repository Showcase</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Publish your projects with structured tech stack tags, GitHub links, and live deployment previews.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-500 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-bold text-base">Developer Discovery</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore profiles of fellow engineers, view their technical stacks, and connect across social profiles.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-bold text-base">Secure SaaS Dashboard</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Manage your published portfolio items and track account metrics behind secure session authentication.
            </p>
          </div>

        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-6 text-center text-xs text-slate-500">
        <p>DevConnect Platform. Built for developers worldwide.</p>
      </footer>

    </div>
  );
}