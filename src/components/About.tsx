"use client";

import { useEffect, useRef } from "react";

const highlights = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m4 8 4 4-4 4M12 17h8" />
      </svg>
    ),
    title: "Programming",
    description: "Proficient in C, C++, Python, Java with a focus on writing clean, efficient code.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2a7 7 0 0 1 7 7c0 3-2 5.5-4 7.5L12 22l-3-5.5C7 14.5 5 12 5 9a7 7 0 0 1 7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    title: "AI & Machine Learning",
    description: "Exploring the frontiers of artificial intelligence, deep learning, and data science.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Linux & Open Source",
    description: "Passionate about Linux systems, open-source software, and command-line tools.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 20V10M6 20V4M18 20v-6" />
      </svg>
    ),
    title: "Problem Solving & DSA",
    description: "Dedicated to strengthening DSA fundamentals and competitive thinking.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "Full Stack Development",
    description: "Building modern, responsive web applications with cutting-edge technologies.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Continuous Learning",
    description: "Always seeking to expand knowledge and stay updated with emerging technologies.",
  },
];

export default function About() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="border-t border-border px-6 py-24 md:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <div className="reveal mb-16">
          <p className="mb-3 flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.3em] text-text-secondary">
            <span className="mr-3 h-px w-8 bg-accent" />
            About Me
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            Who I Am
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 min-[900px]:grid-cols-2">
          {/* Left: Bio */}
          <div className="space-y-6">
            <div className="reveal">
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                I am a <span className="font-semibold text-text-primary">B.Tech Computer Science Engineering</span> student
                specializing in <span className="text-accent">Artificial Intelligence and Machine Learning</span> at
                IILM University, Greater Noida.
              </p>
            </div>
            <div className="reveal">
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                My passion for technology drives me to constantly learn and grow.
                From the fundamentals of C and C++ to the complexities of neural networks,
                I believe in building a <span className="font-semibold text-text-primary">strong foundation</span> that
                enables innovation.
              </p>
            </div>
            <div className="reveal">
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                Currently focused on strengthening my skills in{" "}
                <span className="font-semibold text-text-primary">Data Structures & Algorithms</span>,{" "}
                <span className="font-semibold text-text-primary">Linux systems</span>, and{" "}
                <span className="font-semibold text-text-primary">modern web development</span>{" "}
                while exploring the cutting edge of AI/ML.
              </p>
            </div>
            <div className="reveal">
              <p className="text-base leading-relaxed text-text-secondary md:text-lg">
                I approach every project with a{" "}
                <span className="text-accent">growth-oriented mindset</span>,
                seeking not just to build software, but to understand the engineering
                principles behind it.
              </p>
            </div>

            {/* Stats row */}
            <div className="reveal grid grid-cols-3 gap-4 pt-4">
              <div className="rounded-xl border border-border bg-surface-light p-4 text-center">
                <p className="text-2xl font-bold gradient-text">7+</p>
                <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-text-muted">Languages</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-light p-4 text-center">
                <p className="text-2xl font-bold gradient-text">10+</p>
                <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-text-muted">Projects</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-light p-4 text-center">
                <p className="text-2xl font-bold gradient-text">∞</p>
                <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-text-muted">Curiosity</p>
              </div>
            </div>
          </div>

          {/* Right: Highlight Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="reveal card-hover group rounded-xl border border-border bg-surface-light p-5 relative overflow-hidden"
              >
                {/* Hover gradient — pure CSS, no JS state */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-3 text-accent transition-transform duration-300 group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-jetbrains)] text-sm font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
