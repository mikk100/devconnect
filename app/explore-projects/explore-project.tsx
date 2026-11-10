"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { FiGithub, FiExternalLink, FiTrash2, FiEye } from "react-icons/fi";

interface IdeasProps {
    newIdea?: any;
}

const Ideas = ({ newIdea }: IdeasProps) => {
    const [loadedIdeas, setLoadedIdeas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedIdea, setSelectedIdea] = useState<any | null>(null);
    const [ideaToDelete, setIdeaToDelete] = useState<any | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch data from Firestore collection ("business_ideas")
    const handleFetch = async (isRefreshAction = false) => {
        if (isRefreshAction) setIsRefreshing(true);
        else setLoading(true);

        try {
            const querySnapshot = await getDocs(collection(db, "business_ideas"));
            const fetchedList: any[] = [];

            querySnapshot.forEach((docSnap) => {
                const data = { id: docSnap.id, ...docSnap.data() };
                fetchedList.push(data);
            });

            setLoadedIdeas(fetchedList);
        } catch (error) {
            console.error("Error fetching projects>>>>", error);   
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    // Initial load on mount
    useEffect(() => { 
        handleFetch(); 
    }, []);

    // Instantly append new incoming projects if passed via props
    useEffect(() => {
        if (newIdea) {
            setLoadedIdeas((prev) => [newIdea, ...prev]);
        }
    }, [newIdea]);

    // Trigger the custom delete confirmation modal
    const promptDelete = (idea: any, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevents opening the View Details modal
        setIdeaToDelete(idea);
    };

    // Execute the deletion from Firestore
    const confirmDelete = async () => {
        if (!ideaToDelete) return;
        setIsDeleting(true);

        try {
            await deleteDoc(doc(db, "business_ideas", ideaToDelete.id));
            
            // Remove deleted item from local state immediately
            setLoadedIdeas((prev) => prev.filter((item) => item.id !== ideaToDelete.id));
            
            // Close details modal if the deleted item was open
            if (selectedIdea?.id === ideaToDelete.id) {
                setSelectedIdea(null);
            }

            setIdeaToDelete(null);
        } catch (error) {
            console.error("Error deleting document>>>>", error);
            alert("Failed to delete the project.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-5 border-b border-neutral-200 dark:border-slate-800 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                        Explore Developer Projects
                    </h1>
                    <p className="text-sm text-neutral-600 dark:text-slate-400 mt-1">
                        Discover open-source repositories and applications built by the community.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-[#115E59] dark:text-emerald-400 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 shadow-xs">
                        {loadedIdeas.length} {loadedIdeas.length === 1 ? "Project" : "Projects"} Available
                    </span>
                    <button 
                        onClick={() => handleFetch(true)} 
                        disabled={isRefreshing}
                        className="flex items-center gap-1.5 text-xs font-bold bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 hover:bg-neutral-200 dark:hover:bg-slate-700 px-3.5 py-1.5 rounded-full transition-all border border-neutral-200 dark:border-slate-700 cursor-pointer disabled:opacity-50"
                    >
                        <span className={`${isRefreshing ? "animate-spin" : ""}`}>🔄</span> 
                        {isRefreshing ? "Refreshing..." : "Refresh"}
                    </button>
                </div>
            </div>

            {/* Loading / Empty / Grid States */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-3">
                    <div className="w-8 h-8 border-4 border-[#115E59] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-neutral-500 text-sm font-medium">Loading projects from Firestore...</p>
                </div>
            ) : loadedIdeas.length === 0 ? (
                <div className="text-center py-20 bg-neutral-50 dark:bg-slate-900 rounded-3xl border border-neutral-200 dark:border-slate-800 p-8">
                    <p className="text-lg font-bold text-neutral-800 dark:text-slate-200 mb-1">No projects found</p>
                    <p className="text-neutral-500 text-sm">Be the first to share your project using the submit form!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loadedIdeas.map((project) => (
                        <div 
                            key={project.id} 
                            onClick={() => setSelectedIdea(project)}
                            className="bg-white dark:bg-slate-900 border border-neutral-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
                        >
                            <div className="space-y-4">
                                {/* Author & Timestamp Header */}
                                <div className="flex items-center justify-between border-b border-neutral-100 dark:border-slate-800 pb-4">
                                    <div className="flex items-center gap-3">
                                        {project.authorImage ? (
                                            <img 
                                                src={project.authorImage} 
                                                alt={project.authorName || "User"} 
                                                className="w-10 h-10 rounded-full object-cover border border-neutral-200 dark:border-slate-700 shadow-xs"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-[#115E59] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                                                {project.authorName?.[0] || "U"}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-xs font-bold text-neutral-900 dark:text-white truncate max-w-[120px]">
                                                {project.authorName || "Anonymous"}
                                            </h3>
                                            <p className="text-[10px] text-neutral-400 font-medium">
                                                {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "Recent"}
                                            </p>
                                        </div>
                                    </div>

                                    {project.liveUrl && (
                                        <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/40 text-[#115E59] dark:text-emerald-400 font-bold px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                                            Live
                                        </span>
                                    )}
                                </div>

                                {/* Project Title & Description */}
                                <div>
                                    <h2 className="text-base font-extrabold text-neutral-900 dark:text-white mb-2 group-hover:text-[#115E59] dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                                        {project.title || "Untitled Project"}
                                    </h2>
                                    <p className="text-neutral-600 dark:text-slate-400 text-xs line-clamp-3 leading-relaxed font-normal">
                                        {project.description || "No description provided."}
                                    </p>
                                </div>

                                {/* Tech Stack Pills */}
                                {project.techStack && project.techStack.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {project.techStack.map((tech: string, idx: number) => (
                                            <span 
                                                key={idx}
                                                className="px-2.5 py-0.5 bg-neutral-100 dark:bg-slate-800 text-[#115E59] dark:text-emerald-400 text-[10px] font-bold rounded-lg"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer Links & Actions */}
                            <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {project.githubUrl && (
                                        <a 
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-neutral-600 dark:text-slate-300 hover:text-[#115E59] transition-colors flex items-center gap-1 text-xs font-bold"
                                            title="View GitHub Repository"
                                        >
                                            <FiGithub className="text-sm" />
                                            <span>Repo</span>
                                        </a>
                                    )}
                                    {project.liveUrl && (
                                        <a 
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-[#115E59] dark:text-emerald-400 hover:opacity-80 transition-opacity flex items-center gap-1 text-xs font-bold"
                                            title="View Live Demo"
                                        >
                                            <FiExternalLink className="text-sm" />
                                            <span>Demo</span>
                                        </a>
                                    )}
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <button 
                                        onClick={() => setSelectedIdea(project)}
                                        className="p-2 bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 rounded-xl hover:bg-neutral-200 transition-all cursor-pointer"
                                        title="View Details"
                                    >
                                        <FiEye className="text-xs" />
                                    </button>
                                    <button 
                                        onClick={(e) => promptDelete(project, e)}
                                        className="p-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 transition-all border border-red-200 dark:border-red-900 cursor-pointer"
                                        title="Delete Project"
                                    >
                                        <FiTrash2 className="text-xs" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {ideaToDelete && (
                <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-neutral-200 dark:border-slate-800 space-y-5 text-center">
                        <div className="w-12 h-12 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto text-xl border border-red-200 dark:border-red-900">
                            ⚠️
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-neutral-900 dark:text-white mb-1">Delete Project?</h3>
                            <p className="text-xs text-neutral-600 dark:text-slate-400 leading-relaxed">
                                Are you sure you want to delete <span className="font-bold text-neutral-900 dark:text-white">"{ideaToDelete.title}"</span>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <button
                                onClick={() => setIdeaToDelete(null)}
                                disabled={isDeleting}
                                className="flex-1 py-3 bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 rounded-xl font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-xs hover:bg-red-700 transition-all shadow-md cursor-pointer disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* View Details Modal */}
            {selectedIdea && (
                <div className="fixed inset-0 bg-neutral-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-neutral-200 dark:border-slate-800 space-y-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-slate-800 pb-4">
                            <div className="flex items-center gap-3">
                                {selectedIdea.authorImage ? (
                                    <img 
                                        src={selectedIdea.authorImage} 
                                        alt={selectedIdea.authorName} 
                                        className="w-11 h-11 rounded-full object-cover border border-neutral-200 dark:border-slate-700 shadow-xs"
                                    />
                                ) : (
                                    <div className="w-11 h-11 rounded-full bg-[#115E59] text-white flex items-center justify-center font-bold text-base shadow-xs">
                                        {selectedIdea.authorName?.[0] || "U"}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{selectedIdea.authorName}</h3>
                                    <p className="text-xs text-neutral-500">
                                        {selectedIdea.createdAt ? new Date(selectedIdea.createdAt).toLocaleString() : ""}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setSelectedIdea(null)}
                                className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-slate-800 flex items-center justify-center text-neutral-600 dark:text-slate-300 hover:bg-neutral-200 font-bold text-sm transition-colors cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-3">{selectedIdea.title}</h2>
                            <p className="text-neutral-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap bg-neutral-50 dark:bg-slate-800 p-4 rounded-2xl border border-neutral-100 dark:border-slate-700">
                                {selectedIdea.description}
                            </p>
                        </div>

                        {selectedIdea.techStack && selectedIdea.techStack.length > 0 && (
                            <div>
                                <span className="font-bold text-xs text-neutral-500 block mb-2">Tech Stack</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedIdea.techStack.map((tech: string, idx: number) => (
                                        <span 
                                            key={idx}
                                            className="px-3 py-1 bg-neutral-100 dark:bg-slate-800 text-[#115E59] dark:text-emerald-400 text-xs font-bold rounded-xl"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-3 pt-2">
                            {selectedIdea.githubUrl && (
                                <a 
                                    href={selectedIdea.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 bg-neutral-900 dark:bg-slate-800 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xs"
                                >
                                    <FiGithub />
                                    <span>Repository</span>
                                </a>
                            )}
                            {selectedIdea.liveUrl && (
                                <a 
                                    href={selectedIdea.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3 bg-[#115E59] text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xs"
                                >
                                    <FiExternalLink />
                                    <span>Live Demo</span>
                                </a>
                            )}
                        </div>

                        <button 
                            onClick={() => setSelectedIdea(null)}
                            className="w-full py-3 bg-neutral-100 dark:bg-slate-800 text-neutral-700 dark:text-slate-300 rounded-2xl font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer"
                        >
                            Close Details
                        </button>
                    </div>
                </div>
            )}
        </main>    
    );
};    

export default Ideas;