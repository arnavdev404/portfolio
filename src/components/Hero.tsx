"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 md:px-16 min-h-screen flex items-center"
    >
      {/* Ambient gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-accent-subtle/[0.03] blur-[100px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 min-[950px]:grid-cols-12">
        {/* Text Content */}
        <div className="min-[950px]:col-span-7">
          <div className="reveal">
            <p className="mb-6 flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.3em] text-text-muted">
              <span className="animate-blink mr-3 inline-block h-2 w-2 rounded-sm bg-accent" />
              Introduction
            </p>
          </div>

          <h1 className="mb-8 font-[family-name:var(--font-inter)] text-4xl font-bold leading-[1.05] tracking-tight text-text-primary md:text-6xl lg:text-7xl">
            <span className="reveal inline-block">Hello, my name is</span>
            <br />
            <span className="reveal inline-block gradient-text">
              Arnav Anand.
            </span>
          </h1>

          <div className="reveal">
            <p className="mb-2 font-[family-name:var(--font-jetbrains)] text-sm text-text-secondary">
              B.Tech CSE (AI &amp; ML) Student
            </p>
            <p className="mb-8 font-[family-name:var(--font-jetbrains)] text-sm text-text-muted">
              IILM University, Greater Noida
            </p>
          </div>

          <div className="reveal">
            <p className="mb-4 max-w-xl text-base leading-[1.8] text-text-secondary md:text-lg">
              I am a Computer Science student specializing in{" "}
              <span className="font-semibold text-text-primary">
                Artificial Intelligence and Machine Learning
              </span>
              .
            </p>
          </div>

          <div className="reveal">
            <p className="mb-12 max-w-xl text-base leading-[1.8] text-text-secondary md:text-lg">
              I enjoy programming, software development, Linux,
              problem-solving, and exploring{" "}
              <span className="font-semibold text-text-primary">
                emerging technologies
              </span>
              .
            </p>
          </div>

          <div className="reveal">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                id="resume-btn"
                className="btn-shine group inline-flex items-center gap-3 rounded-lg bg-accent px-8 py-4 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-accent-hover hover:gap-5 hover:shadow-[0_0_30px_rgba(217,136,136,0.25)] active:scale-[0.97]"
              >
                View Resume
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="https://github.com/arnavdev404"
                target="_blank"
                rel="noopener noreferrer"
                id="github-btn"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-4 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-text-primary transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(217,136,136,0.1)] active:scale-[0.97]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.21 0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/arnav-anand-neverstop/"
                target="_blank"
                rel="noopener noreferrer"
                id="linkedin-btn"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-4 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-text-primary transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(217,136,136,0.1)] active:scale-[0.97]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <rect x="2" y="2" width="20" height="20" rx="2" />
                  <path d="M6 9v9M6 6v.01M10 18v-6a3 3 0 0 1 6 0v6M10 12v6" />
                </svg>
                LinkedIn
              </a>
              <a
                href="#contact"
                id="contact-btn"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-4 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-text-primary transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_rgba(217,136,136,0.1)] active:scale-[0.97]"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* Profile Image */}
        <div className="reveal hidden min-[950px]:col-span-5 min-[950px]:block">
          <div className="relative ml-auto flex w-full justify-end">
            {/* Shadow card behind — layered effect */}
            <div className="absolute -right-5 top-5 h-full w-full max-w-[380px]">
              <div className="h-full w-full rounded-2xl border border-border/40 bg-surface/30" />
            </div>

            {/* Main image frame */}
            <div className="profile-frame group relative z-10 aspect-square w-full max-w-[380px] overflow-hidden rounded-2xl border border-border bg-surface-light p-2 shadow-2xl">
              <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-accent/10" />

              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  src="/profile.webp"
                  alt="Arnav Anand — B.Tech CSE (AI & ML) Student"
                  fill
                  sizes="(max-width: 950px) 0px, 380px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

            

             <span className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-black/90 px-3 py-1 text-[11px] uppercase tracking-wider !text-white backdrop-blur-md">
             <span className="animate-blink h-1.5 w-1.5 rounded-full bg-status" />
                Open to work
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="reveal absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.3em] text-text-muted">
          Scroll
        </span>
        <div className="h-8 w-5 rounded-full border border-border flex items-start justify-center p-1">
          <div className="h-2 w-1 rounded-full bg-accent animate-bounce" />
        </div>
      </div>
      <div className="hidden">test</div>
      
    </section>
    
  );
}
