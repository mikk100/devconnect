"use client";

import React from "react";
import Link from "next/link";
import { FiCode, FiLayers, FiUsers, FiShield, FiArrowRight } from "react-icons/fi";
import { Theme } from "@/components/Theme";

export default function AboutPage() {
  return (
    <main className="min-h-dvh bg-[#F7FAF7] dark:bg-slate-950 p-6 md:p-12 font-sans transition-colors">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Hero Section */}
        <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-neutral-200/80 dark:border-slate-800 shadow-xs space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-[#115E59] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 mx-auto">
            <FiCode /> Welcome to DevConnect
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">
            Empowering Developers to Showcase & Collaborate
          </h1>
          <p className="text-sm md:text-base text-neutral-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            DevConnect is a modern developer ecosystem designed to bridge the gap between creative engineering, project discovery, and community growth.
          </p>
        </div>

        {/* Feature Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-neutral-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#115E59] dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              <FiLayers />
            </div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">Project Showcases</h2>
            <p className="text-xs text-neutral-600 dark:text-slate-400 leading-relaxed">
              Publish your repositories, tech stacks, and live demos seamlessly onto a real-time community feed.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-neutral-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#115E59] dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              <FiUsers />
            </div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">Developer Profiles</h2>
            <p className="text-xs text-neutral-600 dark:text-slate-400 leading-relaxed">
              Manage your personal developer identity, user handles, and account preferences with complete persistence.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-neutral-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-[#115E59] dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              <FiShield />
            </div>
            <h2 className="text-base font-bold text-neutral-900 dark:text-white">Secure Architecture</h2>
            <p className="text-xs text-neutral-600 dark:text-slate-400 leading-relaxed">
              Built on Next.js 16 and Firebase Firestore, guaranteeing rapid data retrieval and reliable authorization.
            </p>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-neutral-900 dark:bg-slate-900 text-white p-8 md:p-10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-neutral-800">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-black">Ready to share your work?</h2>
            <p className="text-xs text-neutral-400">Join the platform and publish your first web application or portfolio.</p>
          </div>
          <Link
            href="/submit-project"
            className="px-6 py-3 rounded-xl font-bold text-xs bg-[#115E59] text-white hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
          >
            <span>Submit a Project</span>
            <FiArrowRight />
          </Link>
        </div>

      </div>
    </main>
  );
}