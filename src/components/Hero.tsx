"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Lightbulb,
} from "lucide-react";

const skills = [
  { label: <>Web<br />Explorer</>, icon: Code2, tone: "coral" },
  { label: <>	Beyond <br /> AI </> , icon: BrainCircuit, tone: "blue" },
  { label: <>Data<br />& Insights</>, icon: Database, tone: "teal" },
  { label: <>Cloud &amp;<br />DevOps</>, icon: Cloud, tone: "amber" },
  { label: <>Create &<br /> Contribute </>, icon: Lightbulb, tone: "violet" },
];

export default function Hero() {
  const quotes = [
  "Turning Coffee ☕︎ Into Code.",
  "Code With Purpose Create With Passion.",
  "Code → Create  ↪Contribute",
];

const [quoteIndex, setQuoteIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
  }, 7000);

  return () => clearInterval(interval);
}, []);
  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="hero-eyebrow">Hello, I&apos;m</p>
          <h1 className="hero-title" id="hero-title">
            A r n a v {"\u00A0\u00A0"}A n a n d<span>.</span>
          </h1>
          <p className="hero-role">B.Tech CSE (AI &amp; ML) Student</p>
          <p className="hero-university">IILM University, Greater Noida</p>

         
                                
              <p className="hero-description">
                Curious by nature, a developer by choice, and powered by coffee ☕︎
                <br />
                I love exploring{" "}
                <strong className="hero-highlight">AI</strong>,{" "}
                <strong className="hero-highlight">Web Development</strong>, and{" "}
                <strong className="hero-highlight">emerging technologies</strong>,
                turning random ideas into{" "}
                <strong className="hero-highlight">cool projects</strong> and learning
                something new along the way.
              </p>


          <div className="hero-skills" aria-label="Areas of interest">
            {skills.map(({ label, icon: Icon, tone }) => (
              <div className="hero-skill" key={tone} tabIndex={0}>
                <div className={`hero-skill-icon tone-${tone}`}>
                  <Icon aria-hidden="true" strokeWidth={1.8} />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hero-button hero-button-primary" id="resume-btn">
              View Resume <ArrowRight aria-hidden="true" size={20} strokeWidth={1.8} />
            </a>
            <a href="https://github.com/arnavdev404" target="_blank" rel="noopener noreferrer" className="hero-button hero-button-secondary" id="github-btn">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-1.86c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.21 3.26.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.06-1.14 3.06-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.77 1.15 2.99 0 4.29-2.62 5.23-5.11 5.51.4.35.75 1.02.75 2.06V22c0 .29.2.64.77.53A11.1 11.1 0 0 0 12 .9Z" /></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/arnav-anand-neverstop/" target="_blank" rel="noopener noreferrer" className="hero-button hero-button-secondary" id="linkedin-btn">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.74H4.96V9.2h2.97v9.54ZM6.45 7.9a1.72 1.72 0 1 1 .02-3.44 1.72 1.72 0 0 1-.02 3.44Zm12.29 10.84h-2.96V14.1c0-1.1-.02-2.51-1.53-2.51-1.54 0-1.78 1.2-1.78 2.43v4.72H9.51V9.2h2.84v1.3h.04c.39-.74 1.36-1.52 2.8-1.52 3 0 3.55 1.97 3.55 4.54v5.22Z" /></svg>
              LinkedIn
            </a>
            <a href="#contact" className="hero-button hero-button-secondary" id="contact-btn">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              Contact Me
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Arnav Anand portrait">
          <div className="hero-orb" aria-hidden="true" />
          <Image
            src="/profile.png"
            alt="Arnav Anand wearing a blue shirt"
            fill
            priority
            quality={100}
            sizes="(max-width: 900px) 100vw, 64vw"
            className="hero-portrait"
          />
         <div className="hero-handwritten">
            <Image
              src="/slogan-light.png"
              alt="Better Code Brighter Tomorrow"
              width={450}
              height={450}
              className="slogan-light"
            />
            <Image
              src="/slogan-dark.png"
              alt="Better Code Brighter Tomorrow"
              width={450}
              height={450}
              className="slogan-dark"
            />
          </div>
          <div className="hero-tags" aria-label="Skills">
            <span>#WebDev</span>
            <span>#ProblemSolver</span>
            <span>#DevMode</span>
            <span>#LifelongLearner</span>
          </div>
           <div className="hero-quote" aria-live="polite">
              <span className="hero-quote-mark" aria-hidden="true">
                “
              </span>

              <p key={quoteIndex} className="hero-quote-text">
                {quotes[quoteIndex]}
              </p>

              <i aria-hidden="true" />
            </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to About section">
        <span>Scroll</span>
        <span className="hero-mouse" aria-hidden="true"><i /></span>
      </a>
    </section>
  );
}
