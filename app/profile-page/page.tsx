"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import Link from "next/link";
import { FiArrowLeft, FiEdit2, FiCheck, FiX, FiUser, FiMail, FiShield } from "react-icons/fi";
import { Theme } from "@/components/Theme";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
  location?: string;
  bio?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Fetch user data from Firestore ("users" collection)
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "users"));
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = { id: userDoc.id, ...userDoc.data() } as UserProfile;
        
        setProfile(userData);
        setUsername(userData.name || "");
      } else {
        // Fallback demo state if collection is empty
        const fallbackUser: UserProfile = {
          id: "temp_id",
          name: "Michael",
          email: "developer@devconnect.com",
          bio: "Undergraduate computer science student building full-stack web applications.",
          role: "Full-Stack Developer",
          location: "Nigeria",
        };
        setProfile(fallbackUser);
        setUsername(fallbackUser.name);
      }
    } catch (error) {
      console.warn("Could not load user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Persist updated username to Firestore
  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !profile) return;

    setSaving(true);
    try {
      if (profile.id !== "temp_id") {
        const userRef = doc(db, "users", profile.id);
        await updateDoc(userRef, {
          name: username.trim(),
        });
      }

      setProfile((prev) => (prev ? { ...prev, name: username.trim() } : null));
      setIsEditing(false);
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Error updating username:", error);
      alert("Failed to update username.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-dvh bg-[#F7FAF7] dark:bg-slate-950 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#115E59] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Loading developer profile...</p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="min-h-dvh bg-[#F7FAF7] dark:bg-slate-950 p-6 flex items-center justify-center">
        <p className="text-xs text-slate-500 font-medium">No profile data found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-[#F7FAF7] dark:bg-slate-950 p-6 md:p-10 font-sans transition-colors">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Navigation & Header */}
        <div className="space-y-1">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mb-2 transition-colors"
          >
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Developer Profile
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Manage your personal details and persistent account credentials.
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[#115E59] dark:text-emerald-300 flex items-center gap-2.5 text-xs font-semibold shadow-xs">
            <FiCheck className="text-base" />
            <span>Username updated and persisted successfully!</span>
          </div>
        )}

        {/* Main Profile Info Card */}
        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* User Avatar */}
            <div className="relative">
              {profile.image ? (
                <img
                  src={profile.image}
                  alt={profile.name || "User"}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-800 shadow-xs"
                />
              ) : (
                <div 
                  className="w-24 h-24 rounded-2xl text-white font-black text-3xl flex items-center justify-center shadow-xs"
                  style={{ backgroundColor: Theme.primary }}
                >
                  {profile.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* Profile Metadata */}
            <div className="flex-1 text-center sm:text-left space-y-3 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    {profile.name || "Anonymous User"}
                  </h2>
                  <p className="text-xs font-semibold text-[#115E59] dark:text-emerald-400 mt-0.5">
                    {profile.role || "Member"} {profile.location ? `• ${profile.location}` : ""}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setUsername(profile.name || "");
                    setIsEditing(!isEditing);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 self-center sm:self-start cursor-pointer shadow-xs"
                >
                  {isEditing ? <FiX /> : <FiEdit2 />}
                  <span>{isEditing ? "Cancel" : "Change Username"}</span>
                </button>
              </div>

              {profile.bio && (
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                  {profile.bio}
                </p>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-400">
                <FiMail />
                <span>{profile.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Username Edit Form */}
        {isEditing && (
          <form 
            onSubmit={handleUpdateUsername} 
            className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 transition-all"
          >
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">Update Username</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                This will update your handle across your project posts and profile page.
              </p>

              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
                New Username
              </label>
              <div className="relative flex items-center">
                <FiUser className="absolute left-3.5 text-slate-400 text-sm" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#115E59]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50 shadow-xs cursor-pointer"
                style={{ backgroundColor: Theme.primary }}
              >
                {saving ? "Saving..." : "Save Username"}
              </button>
            </div>
          </form>
        )}

      </div>
    </main>
  );
}