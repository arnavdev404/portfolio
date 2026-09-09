"use client";

import { useEffect, useRef, useCallback } from "react";

const projects = [
  {
    title: "NetSage AI",
    description:
      "AI-powered network troubleshooting system that analyzes network symptoms and evidence, identifies root causes, and recommends diagnostic steps.",
    technologies: [
      "Python",
      "AI/LLM",
      "Cisco Packet Tracer",
      "JavaScript",
      "Gemini AI API",
    ],
    github: "https://netsage-ai-arnav.netlify.app/",
    language: "Python",
    languageColor: "#3572A5",
  },
  {
    title: "Weather Web Application",
    description:
      "Responsive weather application that fetches and displays real-time weather information using API integration and dynamic JavaScript data handling.",
    technologies: ["HTML", "Tailwind CSS", "JavaScript", "REST API"],
    github: "https://arnavweatherweb.netlify.app/",
    language: "HTML",
    languageColor: "#e34c26",
  },
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and React to showcase projects, skills, education, and experience.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    github: "https://github.com/arnavdev404",
    language: "TypeScript",
    languageColor: "#3178c6",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const gradientRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!gradientRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gradientRef.current.style.background = `radial-gradient(350px circle at ${x}px ${y}px, rgba(217, 136, 136, 0.06), transparent 60%)`;
    gradientRef.current.style.opacity = "1";
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!gradientRef.current) return;
    gradientRef.current.style.opacity = "0";
  }, []);

  return (
    <div className="reveal">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        id={`project-card-${index}`}
        className="card-hover group relative flex h-full flex-col rounded-xl border border-border bg-surface-light p-6 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Mouse-following gradient — updated via ref, no React re-renders */}
        <div
          ref={gradientRef}
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{ opacity: 0 }}
        />

        {/* Hover corner accent */}
        <span className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-accent rounded-tr-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-0 bottom-0 h-8 w-8 border-l-2 border-b-2 border-accent/50 rounded-bl-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Header */}
        <header className="mb-4 flex items-start justify-between relative z-10">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="h-5 w-5 text-accent"
            >
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
            </svg>
            <h3 className="font-[family-name:var(--font-jetbrains)] text-base font-medium text-text-primary transition-colors group-hover:text-accent">
              {project.title}
            </h3>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="h-4 w-4 text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </header>

        {/* Description */}
        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-text-secondary relative z-10">
          {project.description}
        </p>

        {/* Tech Tags */}
        <ul className="mb-6 flex flex-wrap gap-2 relative z-10">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border px-2.5 py-0.5 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-text-secondary transition-colors group-hover:border-accent/30 group-hover:text-accent/80"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <footer className="mt-auto flex items-center gap-4 border-t border-border pt-4 relative z-10">
          <span className="inline-flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: project.languageColor }}
            />
            <span className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-wider text-text-secondary">
              {project.language}
            </span>
          </span>
        </footer>
      </a>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="border-t border-border px-6 py-24 md:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="reveal mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.3em] text-text-secondary">
              <span className="mr-3 h-px w-8 bg-accent" />
              Engineering
            </p>
            <h2 className="font-[family-name:var(--font-inter)] text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
              Projects
            </h2>
          </div>
          <a
            href="https://github.com/arnavdev404"
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-repos"
            className="link-underline inline-flex items-center gap-2 whitespace-nowrap font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-text-primary transition-colors hover:text-accent"
          >
            View All Repositories
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="h-3 w-3"
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
