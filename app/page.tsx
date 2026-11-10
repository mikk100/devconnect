import Link from "next/link";
import { auth } from "@/auth";
import { FiCode, FiCompass, FiPlus, FiArrowRight, FiCheckCircle, FiLayers, FiShield, FiZap } from "react-icons/fi";
import { Theme } from "@/components/Theme";

export default async function HomePage() {
  const session = await auth();
  const isAuthenticated = !!session;

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col justify-between">
      
      <main className="w-full space-y-16">
        
        {/* Hero Section with Background Image & Overlay */}
        <div className="relative bg-slate-900 text-white overflow-hidden py-24 sm:py-32 px-6 border-b border-slate-200 dark:border-slate-800">
          
          {/* Background Image with Opacity & Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transform transition-transform"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950 dark:from-slate-950/90 dark:to-slate-950" />

          {/* Hero Content */}
          <div className="relative max-w-4xl mx-auto text-center space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 backdrop-blur-md mx-auto shadow-sm">
              <FiZap className="text-emerald-400" /> DevConnect Ecosystem • Built for Modern Builders
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              Showcase code builds. Connect with developers worldwide.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Publish your GitHub repositories, explore production-ready open source projects, and establish your professional developer identity in one unified SaaS hub.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/submit-project"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-bold shadow-md transition-opacity hover:opacity-90 cursor-pointer"
                    style={{ backgroundColor: Theme.primary }}
                  >
                    <FiPlus /> Submit New Project
                  </Link>
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 backdrop-blur-md text-slate-200 text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Go to Dashboard <FiArrowRight />
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-bold shadow-md transition-opacity hover:opacity-90 cursor-pointer"
                    style={{ backgroundColor: Theme.primary }}
                  >
                    Get Started / Sign In
                  </Link>
                  <Link
                    href="/explore-projects"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 backdrop-blur-md text-slate-200 text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    <FiCompass /> Explore Community
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Feature Grid Section */}
        <div className="max-w-5xl mx-auto px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#115E59] dark:text-emerald-400">Core Capabilities</h2>
            <h3 className="text-2xl font-black tracking-tight">Everything you need to broadcast your work</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#115E59] dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                <FiCode />
              </div>
              <h3 className="font-bold text-base">Repository Showcase</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Publish your projects with structured tech stack tags, GitHub links, and live deployment previews synced instantly.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#115E59] dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                <FiLayers />
              </div>
              <h3 className="font-bold text-base">Developer Discovery</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Explore profiles of fellow engineers, view their technical stacks, and update your personal handle across sessions.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#115E59] dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                <FiShield />
              </div>
              <h3 className="font-bold text-base">Secure SaaS Dashboard</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Manage your published portfolio items and track account metrics behind robust multi-provider OAuth session authentication.
              </p>
            </div>

          </div>
        </div>

        {/* Platform Highlights Banner */}
        <div className="max-w-5xl mx-auto px-6 pb-12">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-black tracking-tight">Ready to launch your developer profile?</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Join the platform, customize your handle, and start submitting code builds today.</p>
            </div>
            <Link
              href={isAuthenticated ? "/submit-project" : "/signin"}
              className="px-6 py-3 rounded-xl font-bold text-xs text-white shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: Theme.primary }}
            >
              <span>Get Started Now</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>

      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>DevConnect Platform. Built for developers worldwide.</p>
      </footer>

    </div>
  );
}