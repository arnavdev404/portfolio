"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#hero");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => section !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-18% 0px -50% 0px", threshold: [0.05, 0.2, 0.45] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const themeLabel = theme === "dark" ? "Light Mode" : "Dark Mode";
  const ThemeToggle = ({ mobile = false }: { mobile?: boolean }) => (
  <button
    id={mobile ? "mobile-theme-toggle" : "theme-toggle"}
    type="button"
    className={`theme-toggle ${theme} ${mobile ? "mobile-theme-toggle" : ""}`}
    aria-label={`Switch to ${themeLabel.toLowerCase()}`}
    title={themeLabel}
    onClick={toggleTheme}
  >
    <span className="theme-toggle-track">
      <span className="theme-toggle-icon sun-icon">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
        </svg>
      </span>

      <span className="theme-toggle-icon moon-icon">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.6 8.6 0 1 0 20.2 15.3Z" />
        </svg>
      </span>
    </span>
  </button>
);
  return (
    <header id="navbar" className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="site-nav-inner" aria-label="Main navigation">
        <a href="#hero" className="site-logo" onClick={() => setActive("#hero")}>
          <strong>ARNAV</strong><span>(◠⁠‿⁠◕⁠)</span>
        </a>

        <div className="site-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`site-nav-link ${active === link.href ? "active" : ""}`}
              onClick={() => setActive(link.href)}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        <div className="site-mobile-controls">
        <ThemeToggle mobile />
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`site-mobile-menu ${mobileOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => { setActive(link.href); setMobileOpen(false); }}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
