"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FiSun, FiMoon, FiLogIn, FiLogOut, FiPlus, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Theme } from "@/components/Theme";

interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

export default function Nav() {
  const { data: session } = useSession();
  const isAuthenticated = !!session;
  const user = session?.user;

  const [navOpen, setNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // Updated navigation links ("Developers" replaced with "About")
  const allNavStuff: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Explore Projects", href: "/explore-projects" },
    { label: "About", href: "/about" },
    ...(isAuthenticated ? [{ label: "Dashboard", href: "/dashboard" }] : []),
  ];

  return (
    <nav className="flex items-center justify-between px-6 sm:px-10 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Brand Logo & Name */}
      <Link href="/" className="flex items-center gap-2.5 z-50">
        <Image 
          src="/favicon.ico" 
          alt="DevConnect Logo"
          width={40}
          height={40}
          className="w-8 h-8 object-contain"
        />
        <span className="text-lg font-bold tracking-normal" style={{ color: Theme.primary }}>
          DevConnect
        </span>
      </Link>

      {/* Desktop & Tablet Navigation */}
      <div className="hidden lg:flex items-center text-sm font-medium gap-5">
        {allNavStuff.map((item, index) => (
          <Link 
            key={index} 
            href={item.href}
            className="hover:opacity-75 transition-opacity text-slate-600 dark:text-slate-300"
          >
            {item.label}
          </Link>
        ))}

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FiSun className="text-base" /> : <FiMoon className="text-base" />}
        </button>

        {/* Conditional Auth Actions */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700">
            {/* User Profile Avatar Link */}
            <Link href="/profile-page" className="flex items-center" title="Go to Profile">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user?.name || "User Profile"}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-xl object-cover border border-slate-200 dark:border-slate-800 shadow-xs hover:opacity-90 transition-opacity"
                />
              ) : (
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xs hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: Theme.primary }}
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </Link>

            {/* Submit Project Button */}
            <Link
              href="/submit-project"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white transition-opacity hover:opacity-95 font-semibold text-xs shadow-xs"
              style={{ backgroundColor: Theme.primary }}
            >
              <FiPlus className="text-sm" />
              <span>Submit Project</span>
            </Link>

            {/* Sign Out Button */}
            <button
              onClick={() => signOut({ callbackUrl: "/signin" })}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              title="Sign Out"
            >
              <FiLogOut className="text-sm" />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <Link
            href="/signin"
            className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all font-semibold text-xs shadow-xs"
          >
            <FiLogIn className="text-base" />
            <span>Sign In</span>
          </Link>
        )}
      </div>

      {/* Mobile Right Controls */}
      <div className="flex items-center gap-3 lg:hidden z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 cursor-pointer"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <FiSun className="text-base" /> : <FiMoon className="text-base" />}
        </button>

        <button 
          onClick={() => setNavOpen(!navOpen)} 
          className="text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {navOpen ? <IoMdClose className="text-slate-900 dark:text-white" /> : <RiMenu3Fill style={{ color: Theme.primary }} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {navOpen && (
        <div 
          className="fixed inset-0 h-dvh w-full flex flex-col items-center justify-center lg:hidden z-40 text-slate-900 dark:text-white bg-white dark:bg-slate-950 px-6"
        >
          <div className="flex flex-col items-center text-base font-semibold gap-5 w-full max-w-xs text-center">
            {allNavStuff.map((item, index) => (
              <Link 
                key={index} 
                href={item.href}
                onClick={() => setNavOpen(false)}
                className="hover:opacity-75 text-slate-700 dark:text-slate-300 py-1"
              >
                {item.label}
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                href="/profile-page"
                onClick={() => setNavOpen(false)}
                className="hover:opacity-75 text-slate-700 dark:text-slate-300 py-1 flex items-center justify-center gap-2"
              >
                <FiUser />
                <span>My Profile</span>
              </Link>
            )}

            {isAuthenticated ? (
              <>
                <Link
                  href="/submit-project"
                  onClick={() => setNavOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-xs shadow-xs"
                  style={{ backgroundColor: Theme.primary }}
                >
                  <FiPlus />
                  <span>Submit Project</span>
                </Link>

                <button
                  onClick={() => {
                    setNavOpen(false);
                    signOut({ callbackUrl: "/signin" });
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-red-600 dark:text-red-400 font-semibold text-xs hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                >
                  <FiLogOut />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                onClick={() => setNavOpen(false)}
                className="w-full flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 py-3 rounded-xl text-slate-700 dark:text-slate-200 font-semibold text-xs shadow-xs"
              >
                <FiLogIn className="text-base" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
      
    </nav>
  );
}