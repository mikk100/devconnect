"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Theme } from "@/components/Theme";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { FiCheck } from "react-icons/fi";

// 1. Zod Validation Schema
const projectSchema = z.object({
  title: z.string().min(2, "Project title must be at least 2 characters long"),
  description: z.string().min(10, "Please provide at least 10 characters describing the project"),
  techStack: z.array(z.string()).min(1, "Select or type at least one tech stack tag"),
  githubUrl: z.string().url("Please enter a valid GitHub repository URL"),
  liveUrl: z.string().url("Please enter a valid live demo URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof projectSchema>;

// Popular options for the dropdown & typeable combo
const POPULAR_TECHS = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Prisma",
  "MongoDB",
  "Docker",
];

export default function SubmitProjectForm({ session }: { session: any }) {
  const router = useRouter();
  const [techInput, setTechInput] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      techStack: [],
      githubUrl: "",
      liveUrl: "",
    },
  });

  const selectedTechs = watch("techStack");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleTech = (tech: string) => {
    if (selectedTechs.includes(tech)) {
      setValue(
        "techStack",
        selectedTechs.filter((t) => t !== tech),
        { shouldValidate: true }
      );
    } else {
      setValue("techStack", [...selectedTechs, tech], { shouldValidate: true });
    }
  };

  const handleAddCustomTech = (tech: string) => {
    const trimmed = tech.trim();
    if (trimmed && !selectedTechs.includes(trimmed)) {
      setValue("techStack", [...selectedTechs, trimmed], { shouldValidate: true });
    }
    setTechInput("");
  };

  const handleRemoveTech = (techToRemove: string) => {
    setValue(
      "techStack",
      selectedTechs.filter((t) => t !== techToRemove),
      { shouldValidate: true }
    );
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
  
      const completeProjectData = {
        ...data,
        authorName: session?.user?.name || "Developer",
        authorImage: session?.user?.image || "",
        createdAt: new Date().toISOString(),
      };

     console.log("Complete Post Payload:", completeProjectData);

    const docRef = await addDoc(collection(db, "business_ideas"),  completeProjectData);

    reset();
    router.refresh(); 
  };

  return (
    <div>
      {/* Authenticated Author Badge */}
      {session?.user && (
        <div className="mb-6 flex items-center gap-3.5 p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-10 h-10 rounded-xl object-cover border border-slate-300 dark:border-slate-700 shadow-sm"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold text-sm"
              style={{ backgroundColor: Theme.primary }}
            >
              {session.user.name?.[0] || "U"}
            </div>
          )}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Submitting As
            </span>
            <p className="text-sm font-bold">{session.user.name}</p>
          </div>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="mb-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 flex items-center gap-2.5 text-xs font-semibold">
          <FiCheck className="text-base" />
          <span>Project published successfully! Redirecting...</span>
        </div>
      )}

      {/* Form Design */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Project Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            placeholder="e.g. DevConnect Portfolio Hub"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-blue-600"
          />
          {errors.title && (
            <p className="text-red-600 text-xs font-bold mt-1.5">• {errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={3}
            {...register("description")}
            placeholder="What does your project do? What problem does it solve?"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-blue-600 resize-none"
          />
          {errors.description && (
            <p className="text-red-600 text-xs font-bold mt-1.5">• {errors.description.message}</p>
          )}
        </div>

        {/* Tech Stack & Tags */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Tech Stack & Tags <span className="text-red-500">*</span>
          </label>

          <div className="relative mb-2" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-medium cursor-pointer flex items-center justify-between transition-all"
            >
              <span className={selectedTechs.length > 0 ? "text-slate-900 dark:text-slate-100" : "text-slate-400"}>
                {selectedTechs.length > 0
                  ? `${selectedTechs.length} tech stack(s) selected`
                  : "Select Popular Tech..."}
              </span>
              <svg className={`w-4 h-4 transition-transform text-slate-500 ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {isDropdownOpen && (
              <div className="absolute z-20 w-full mt-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl max-h-60 overflow-y-auto p-2 space-y-1">
                {POPULAR_TECHS.map((tech) => {
                  const isSelected = selectedTechs.includes(tech);
                  return (
                    <div
                      key={tech}
                      onClick={() => handleToggleTech(tech)}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                        isSelected ? "bg-slate-100 dark:bg-slate-800 font-bold" : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <span>{tech}</span>
                      {isSelected && <span className="font-bold">✓</span>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCustomTech(techInput);
                }
              }}
              placeholder="Or type custom tech & press enter..."
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="button"
              onClick={() => handleAddCustomTech(techInput)}
              className="px-4 py-3 bg-slate-900 dark:bg-slate-800 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-colors"
            >
              Add
            </button>
          </div>

          {selectedTechs.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800">
              {selectedTechs.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 text-xs text-white px-3 py-1 rounded-lg font-semibold shadow-sm"
                  style={{ backgroundColor: Theme.primary }}
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="hover:opacity-70 text-sm font-bold leading-none cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          {errors.techStack && (
            <p className="text-red-600 text-xs font-bold mt-1.5">• {errors.techStack.message}</p>
          )}
        </div>

        {/* GitHub URL */}
        <div>
          <label htmlFor="githubUrl" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            GitHub Repository URL <span className="text-red-500">*</span>
          </label>
          <input
            id="githubUrl"
            type="url"
            {...register("githubUrl")}
            placeholder="https://github.com/username/project"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-blue-600"
          />
          {errors.githubUrl && (
            <p className="text-red-600 text-xs font-bold mt-1.5">• {errors.githubUrl.message}</p>
          )}
        </div>

        {/* Live Demo URL */}
        <div>
          <label htmlFor="liveUrl" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Live Demo URL <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            id="liveUrl"
            type="url"
            {...register("liveUrl")}
            placeholder="https://myproject.com"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-3 text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-blue-600"
          />
          {errors.liveUrl && (
            <p className="text-red-600 text-xs font-bold mt-1.5">• {errors.liveUrl.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-md transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-50 mt-4 cursor-pointer"
          style={{ backgroundColor: Theme.primary }}
        >
          {isSubmitting ? "Publishing Project..." : "Publish Project"}
        </button>

      </form>
    </div>
  );
}