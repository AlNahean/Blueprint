// src/app/projects/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Github, Star } from "lucide-react";

import { PROJECTS, Project } from "@/config/site"; // Adjust path if needed
import { cn } from "@/lib/utils";

// Reusable Project Card Component, styled like the Blog's <article>
function ProjectCard({ project, priority }: { project: Project, priority: boolean }) {
    return (
        <article className="group relative flex flex-col space-y-2">
            {/* Clickable Image Link */}
            <Link href={project.href} target="_blank" rel="noopener noreferrer">
                <Image
                    src={project.image}
                    alt={project.title}
                    width={804}
                    height={452}
                    className="rounded-md border bg-muted transition-colors group-hover:border-primary"
                    priority={priority}
                />
            </Link>

            {/* Header with Title and Links */}
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold flex items-center gap-2">
                    {project.title}
                    {project.featured && (
                        <Star className="h-4 w-4 text-primary" fill="currentColor" />
                    )}
                </h2>
                {/* GitHub link is separate and positioned on top of the main link overlay */}
                {project.github && (
                    <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="z-10 text-muted-foreground hover:text-foreground"
                        aria-label="GitHub Repository"
                    >
                        <Github className="h-5 w-5" />
                    </Link>
                )}
            </div>

            {project.description && (
                <p className="text-muted-foreground">{project.description}</p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
                {project.tags.map((tag) => (
                    <div
                        key={tag}
                        className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                    >
                        {tag}
                    </div>
                ))}
            </div>

            {/* Full Card Clickable Overlay Link */}
            <Link href={project.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0">
                <span className="sr-only">View {project.title}</span>
            </Link>
        </article>
    );
}

// Main Projects Page Component
export default function ProjectsPage() {
    const featuredProjects = PROJECTS.filter((p) => p.featured);
    const otherProjects = PROJECTS.filter((p) => !p.featured);

    return (
        <>
            {/* Header Section */}
            <div className="container py-6 lg:py-10 border-grid md:border-r md:border-l">
                <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
                    <div className="flex-1 space-y-4">
                        <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
                            Projects
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            A collection of my work, from full-stack apps to simple websites.
                        </p>
                    </div>
                </div>
            </div>
            <div className="border-grid border-b"></div>

            {/* Main Content Section */}
            <div className="container py-6 lg:py-10 border-grid md:border-r md:border-l">
                {PROJECTS?.length ? (
                    <div className="space-y-12">
                        {/* Featured Projects */}
                        <section>
                            <h2 className="font-heading text-3xl mb-8">Featured</h2>
                            <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
                                {featuredProjects.map((project, index) => (
                                    <ProjectCard key={project.href} project={project} priority={index <= 1} />
                                ))}
                            </div>
                        </section>

                        {/* Other Projects */}
                        <section>
                            <h2 className="font-heading text-3xl mb-8">All Projects</h2>
                            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                                {otherProjects.map((project, index) => (
                                    <ProjectCard key={project.href} project={project} priority={false} />
                                ))}
                            </div>
                        </section>
                    </div>
                ) : (
                    <p>No projects to display yet.</p>
                )}
            </div>
        </>
    );
}