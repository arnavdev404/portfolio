"use client";

import { useEffect, useRef, useState } from "react";

const contactInfo = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
    label: "Email",
    value: "devwitharnav@gmail.com",
    href: "mailto:devwitharnav@gmail.com",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.21 0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
      </svg>
    ),
    label: "GitHub",
    value: "arnavdev404",
    href: "https://github.com/arnavdev404",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M6 9v9M6 6v.01M10 18v-6a3 3 0 0 1 6 0v6M10 12v6" />
      </svg>
    ),
    label: "LinkedIn",
    value: "arnav-anand-neverstop",
    href: "https://www.linkedin.com/in/arnav-anand-neverstop/",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Location",
    value: "Lucknow, Uttar Pradesh, India",
    href: "https://www.google.com/maps/search/?api=1&query=Lucknow%2C%20Uttar%20Pradesh%2C%20India",
  },
];

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "9e439ad0-47f2-45f9-ab28-95233a46f0d8",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "Portfolio Contact Form",
          subject: `New message from ${formData.name}`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="border-t border-border px-6 py-24 md:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="reveal mb-16">
          <p className="mb-3 flex items-center font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.3em] text-text-secondary">
            <span className="mr-3 h-px w-8 bg-accent" />
            Get In Touch
          </p>
          <h2 className="font-[family-name:var(--font-inter)] text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
            Let&apos;s Connect
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
            I&apos;m always open to discussing new projects, ideas, or
            opportunities to collaborate.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <div key={index} className="reveal">
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    id={`contact-${item.label.toLowerCase()}`}
                    className="card-hover group flex items-center gap-4 rounded-xl border border-border bg-surface-light p-5 transition-all duration-300"
                  >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-black transition-transform duration-300 group-hover:scale-110">
                          {item.icon}
                        </div>
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-text-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-text-primary group-hover:text-accent transition-colors">
                        {item.value}
                      </p>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="ml-auto h-4 w-4 text-text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                ) : (
                  <div className="card-hover group flex items-center gap-4 rounded-xl border border-border bg-surface-light p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-text-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-text-primary">
                        {item.value}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="reveal">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-border bg-surface-light p-8 space-y-6"
              noValidate
            >
              {/* Status Messages */}
              {status === "success" && (
                <div className="flex items-center gap-3 rounded-lg border border-status/30 bg-status/10 p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-status flex-shrink-0">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="m9 11 3 3L22 4" />
                  </svg>
                  <p className="text-sm text-status">Message sent successfully! I&apos;ll get back to you soon.</p>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-3 rounded-lg border border-error/30 bg-error/10 p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-error flex-shrink-0">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6M9 9l6 6" />
                  </svg>
                  <p className="text-sm text-error">Something went wrong. Please try again or email me directly.</p>
                </div>
              )}

              <div>
                <label
                  htmlFor="contact-name"
                  className="block mb-2 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-text-secondary"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.name ? "border-error" : "border-border"
                  } bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent font-[family-name:var(--font-inter)]`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-error">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block mb-2 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-text-secondary"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email)
                      setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full rounded-lg border ${
                    errors.email ? "border-error" : "border-border"
                  } bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent font-[family-name:var(--font-inter)]`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-error">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block mb-2 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-text-secondary"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message)
                      setErrors({ ...errors, message: undefined });
                  }}
                  className={`w-full resize-none rounded-lg border ${
                    errors.message ? "border-error" : "border-border"
                  } bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-colors focus:border-accent font-[family-name:var(--font-inter)]`}
                  placeholder="Tell me about your project or idea..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-error">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                id="submit-contact"
                disabled={status === "sending"}
                className="btn-shine group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-accent px-8 py-4 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(217,136,136,0.25)] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : status === "success" ? (
                  "Message Sent! ✓"
                ) : (
                  <>
                    Send Message
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
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
