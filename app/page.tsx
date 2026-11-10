import Link from "next/link";
import { auth } from "@/auth";
import { FiCode, FiCompass, FiPlus, FiArrowRight, FiCheckCircle, FiLayers, FiShield, FiZap, FiCpu, FiTerminal, FiGlobe, FiUsers } from "react-icons/fi";
import { Theme } from "@/components/Theme";

export default async function HomePage() {
  const session = await auth();
  const isAuthenticated = !!session;

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col justify-between">
      
      <main className="w-full space-y-20 pb-16">
        
        {/* Hero Section with Background Image & Overlay */}
        <div className="relative bg-slate-900 text-white overflow-hidden py-24 sm:py-36 px-6 border-b border-slate-200 dark:border-slate-800">
          
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 backdrop-blur-md mx-auto shadow-sm">
              <FiZap className="text-emerald-400" /> Next.js 16 • Firebase Firestore • Multi-OAuth Ecosystem
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

        {/* Live Ecosystem Stats / Trust Strip */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-xs">
            <div className="space-y-1 border-r border-slate-100 dark:border-slate-800 last:border-none">
              <p className="text-2xl sm:text-3xl font-black text-[#115E59] dark:text-emerald-400">100%</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Cloud Firestore Sync</p>
            </div>
            <div className="space-y-1 md:border-r border-slate-100 dark:border-slate-800">
              <p className="text-2xl sm:text-3xl font-black text-[#115E59] dark:text-emerald-400">OAuth</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Google & GitHub Link</p>
            </div>
            <div className="space-y-1 border-r border-slate-100 dark:border-slate-800 last:border-none">
              <p className="text-2xl sm:text-3xl font-black text-[#115E59] dark:text-emerald-400">Live</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Project Feed</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl sm:text-3xl font-black text-[#115E59] dark:text-emerald-400">Dark</p>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Mode Ready UI</p>
            </div>
          </div>
        </div>

        {/* Core Capabilities Grid */}
        <div className="max-w-5xl mx-auto px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-[#115E59] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Engineered For Builders
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight pt-2">Everything you need to broadcast your work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#115E59] dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                <FiCode />
              </div>
              <h3 className="font-bold text-base">Repository Showcases</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Publish your projects with structured tech stack tags, GitHub links, and live deployment previews synced instantly to Firestore.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#115E59] dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                <FiUsers />
              </div>
              <h3 className="font-bold text-base">Persistent Profiles</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Manage your personal developer handles, sync your Google or GitHub avatars, and update usernames with persistent database storage.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-[#115E59] dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                <FiShield />
              </div>
              <h3 className="font-bold text-base">Secure SaaS Session</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Protected by Auth.js and NextAuth strategy rules, ensuring seamless login routing and data integrity across all your routes.
              </p>
            </div>

          </div>
        </div>

        {/* Workflow Showcase Banner */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <FiTerminal /> Streamlined Developer Workflow
              </div>
              <h3 className="text-2xl font-black">Ready to explore what others are building?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Browse through community submissions, check out full-stack tech stacks, and find inspiration for your next application.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                href="/explore-projects"
                className="px-6 py-3.5 rounded-xl font-bold text-xs bg-white text-slate-900 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
              >
                <FiCompass /> Explore Feed
              </Link>
            </div>
          </div>
        </div>

        {/* Platform Bottom Call to Action */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-black tracking-tight">Join the DevConnect Community Today</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Sign in with your preferred provider and publish your first portfolio project in seconds.</p>
            </div>
            <Link
              href={isAuthenticated ? "/submit-project" : "/signin"}
              className="px-6 py-3.5 rounded-xl font-bold text-xs text-white shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer whitespace-nowrap"
              style={{ backgroundColor: Theme.primary }}
            >
              <span>{isAuthenticated ? "Submit Project Now" : "Get Started Now"}</span>
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