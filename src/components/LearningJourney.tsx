"use client";

import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "C", level: 80, color: "from-accent to-accent-hover" },
  { name: "C++", level: 85, color: "from-error to-amber" },
  { name: "Python", level: 75, color: "from-accent to-violet" },
  { name: "Java", level: 65, color: "from-amber to-error" },
  { name: "Linux", level: 60, color: "from-accent-subtle to-accent" },
  { name: "HTML/CSS", level: 85, color: "from-accent to-amber" },
  { name: "JavaScript", level: 70, color: "from-amber to-accent" },
  { name: "AI/ML", level: 55, color: "from-violet to-error" },
  { name: "DSA", level: 65, color: "from-accent to-violet" },
];

const currentFocus = [
  {
    title: "Data Structures & Algorithms",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 20V10M6 20V4M18 20v-6" />
      </svg>
    ),
    description: "Mastering core algorithms and complex data structures for problem solving.",
    tags: ["Arrays", "Trees", "Graphs", "DP"],
  },
  {
    title: "Linux Fundamentals",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    description: "Deep diving into Linux system administration and shell scripting.",
    tags: ["CLI", "Bash", "Networking", "Sysadmin"],
  },
  {
    title: "Artificial Intelligence",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M12 2a7 7 0 0 1 7 7c0 3-2 5.5-4 7.5L12 22l-3-5.5C7 14.5 5 12 5 9a7 7 0 0 1 7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    description: "Studying neural networks, NLP, and computer vision fundamentals.",
    tags: ["Neural Networks", "NLP", "CV"],
  },
  {
    title: "Machine Learning",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    description: "Building ML models with scikit-learn, TensorFlow, and PyTorch.",
    tags: ["Scikit-learn", "TensorFlow", "PyTorch"],
  },
  {
    title: "Full Stack Development",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="m4 8 4 4-4 4M12 17h8" />
      </svg>
    ),
    description: "Creating end-to-end web applications with modern frameworks.",
    tags: ["React", "Next.js", "Node.js", "APIs"],
  },
];

const timeline = [
  {
    period: "2024 — Present",
    title: "B.Tech CSE (AI & ML)",
    description: "Pursuing Computer Science Engineering with specialization in AI & ML at IILM University.",
    status: "active" as const,
  },
  {
    period: "Ongoing",
    title: "DSA & Competitive Programming",
    description: "Building strong problem-solving skills through consistent practice and algorithmic thinking.",
    status: "active" as const,
  },
  {
    period: "Ongoing",
    title: "Full Stack Web Development",
    description: "Learning React, Next.js, Node.js and modern web technologies.",
    status: "active" as const,
  },
  {
    period: "Ongoing",
    title: "AI/ML & Deep Learning",
    description: "Exploring machine learning algorithms, neural networks, and AI applications.",
    status: "upcoming" as const,
  },
];

function ProgressBar({
  name,
  level,
  color,
  delay,
  isVisible,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
  isVisible: boolean;
}) {
  return (
    <div className="group">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-[family-name:var(--font-jetbrains)] text-sm text-text-primary">
          {name}
        </span>
        <span className="font-[family-name:var(--font-jetbrains)] text-xs text-text-muted">
          {level}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-lighter">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: isVisible ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function LearningJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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
      id="journey"
      ref={sectionRef}
      className="border-t border-border bg-surface px-6 py-24 md:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="reveal mb-16">
          <p className="mb-3 flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.3em] text-text-secondary">
            <span className="animate-blink mr-2 inline-block h-2 w-2 rounded-sm bg-accent" />
            Always Growing
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            Learning Journey
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
            A snapshot of my technical skills and current learning goals. Every
            day is an opportunity to grow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Skills Section */}
          <div>
            <div className="reveal">
              <h3 className="mb-8 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.2em] text-text-secondary border-b border-border pb-3">
                Technical Skills
              </h3>
            </div>
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={skill.name} className="reveal">
                  <ProgressBar
                    {...skill}
                    delay={index * 150}
                    isVisible={isVisible}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Current Focus */}
          <div>
            <div className="reveal">
              <h3 className="mb-8 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.2em] text-text-secondary border-b border-border pb-3">
                Current Focus
              </h3>
            </div>
            <div className="space-y-4">
              {currentFocus.map((item, index) => (
                <div
                  key={index}
                  className="reveal card-hover group rounded-xl border border-border bg-surface-light p-5 relative overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-start gap-4 relative z-10">
                   <div className="current-focus-icon transition-transform duration-300 group-hover:scale-110 flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-[family-name:var(--font-jetbrains)] text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-text-secondary">
                        {item.description}
                      </p>
                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-accent/10 px-2 py-0.5 font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <div className="reveal">
            <h3 className="mb-10 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-[0.2em] text-text-secondary border-b border-border pb-3">
              Learning Timeline
            </h3>
          </div>
          <div className="relative">
            <div className="timeline-line" />
            <div className="space-y-8 pl-8">
              {timeline.map((item, index) => (
                <div key={index} className="reveal group relative">
                  {/* Dot */}
                  <span
                    className={`absolute -left-8 top-1 h-4 w-4 rounded-sm border-2 ${
                      item.status === "active"
                        ? "border-accent bg-accent/20"
                        : "border-text-muted bg-surface"
                    } transition-transform duration-300 group-hover:scale-125`}
                    style={{ transform: "translateX(-50%)" }}
                  />
                  <div className="rounded-xl border border-border bg-surface-light p-5 transition-all duration-300 group-hover:border-accent/30">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-wider text-accent">
                        {item.period}
                      </span>
                      {item.status === "active" && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-status/10 px-2 py-0.5 font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-wider text-status">
                          <span className="animate-blink h-1.5 w-1.5 rounded-full bg-status" />
                          In Progress
                        </span>
                      )}
                    </div>
                    <h4 className="font-[family-name:var(--font-inter)] text-base font-medium text-text-primary">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
