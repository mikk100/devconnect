import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiFolder, FiPlus, FiLogOut, FiUser, FiCheckCircle, FiExternalLink } from "react-icons/fi";
import { Theme } from "@/components/Theme";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const userName = session.user?.name || "Developer";
  const userEmail = session.user?.email || "";
  const userImage = session.user?.image;

  // Placeholder for user projects
  const userProjects: Array<{
    id: string;
    title: string;
    description: string;
    techStack: string[];
    githubUrl: string;
    liveUrl?: string;
  }> = [];

  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors p-6 sm:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header Bar: Welcome & User Profile Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <FiCheckCircle /> Active Account
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {userName}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Manage your developer profile, showcase projects, and track portfolio engagement.
            </p>
          </div>

          {/* User Profile Card & Sign Out Button Header Group */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
  <Link
    href="/profile-page"
    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
  >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                {userImage ? (
                  <Image src={userImage} alt={userName} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-xs bg-blue-600 text-white">
                    {userName[0]}
                  </div>
                )}
              </div>
              <div className="text-left max-w-[120px] sm:max-w-[160px]">
                <p className="text-xs font-semibold truncate">{userName}</p>
                <p className="text-[10px] text-slate-500 truncate">{userEmail}</p>
              </div>
            </Link>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/signin" });
              }}
            >
              <button
                type="submit"
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                title="Sign Out"
              >
                <FiLogOut className="text-base" />
              </button>
            </form>
          </div>
        </div>

        {/* Overview Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Published Projects
              </p>
              <p className="text-3xl font-extrabold">{userProjects.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-500">
              <FiFolder className="text-xl" />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Profile Status
              </p>
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Portfolio
              </p>
            </div>
            <Link
              href="/profile-page"
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1"
            >
              <FiUser /> Edit Profile
            </Link>
          </div>
        </div>

        {/* My Projects Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold">My Projects</h2>
            <Link
              href="/submit-project"
              className="text-xs font-semibold hover:underline flex items-center gap-1"
              style={{ color: Theme.primary }}
            >
              <FiPlus /> Add New Project
            </Link>
          </div>

          {userProjects.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <FiFolder className="text-xl" />
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="font-bold text-sm">No projects published yet</h3>
                <p className="text-xs text-slate-500">
                  Share your GitHub repositories and live deployments with the developer network.
                </p>
              </div>
              <Link
                href="/submit-project"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold shadow-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: Theme.primary }}
              >
                <FiPlus /> Publish Your First Project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm"
                >
                  <h3 className="font-bold text-sm">{project.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-xs font-medium">
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 text-slate-600 dark:text-slate-300">
                      GitHub Repo <FiExternalLink className="text-[10px]" />
                    </a>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1" style={{ color: Theme.primary }}>
                        Live Demo <FiExternalLink className="text-[10px]" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}