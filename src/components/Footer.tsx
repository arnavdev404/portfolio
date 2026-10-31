export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        {/* Copyright */}
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-jetbrains)] text-xs text-text-muted">
            © {new Date().getFullYear()} Arnav Anand. All rights reserved.
          </span>
        </div>

        {/* Expandable Social Buttons */}
        <div className="flex items-center gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/arnavdev404"
            target="_blank"
            rel="noopener noreferrer"
            className="social-expand-btn github-expand"
            aria-label="Visit GitHub profile"
          >
            <span className="social-expand-sign">
              <svg viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.91c.58.1.79-.25.79-.56v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.16v3.21c0 .3.21.66.8.55A11.5 11.5 0 0 0 12 .5Z" />
              </svg>
            </span>
            <span className="social-expand-label">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/arnav-anand-neverstop/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-expand-btn linkedin-expand"
            aria-label="Visit LinkedIn profile"
          >
            <span className="social-expand-sign">
              <svg viewBox="0 0 448 512" fill="white" aria-hidden="true">
                <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
              </svg>
            </span>
            <span className="social-expand-label">LinkedIn</span>
          </a>

          {/* Gmail */}
          <a
            href="mailto:devwitharnav@gmail.com"
            className="social-expand-btn gmail-expand"
            aria-label="Send me an email"
          >
            <span className="social-expand-sign">
              <svg
                className="gmail-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </span>
            <span className="social-expand-label">Gmail</span>
          </a>
        </div>
      </div>

      {/* Footer Tagline */}
      <div className="mx-auto mt-6 max-w-7xl text-center">
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-text-muted">
          ┈━═☆❣️POWERED BY CURIOSITY &amp; LATE NIGHTS❣️☆═━┈
        </p>
      </div>
    </footer>
  );
}
