"use client";

export default function SocialSidebar() {
  return (
    <aside
      aria-label="Social links"
      className="fixed left-0 top-0 z-40 hidden h-full w-16 flex-col items-center justify-center border-r border-border bg-background/60 py-16 backdrop-blur-sm md:flex"
    >
      <ul className="flex flex-col items-center gap-8">
        {/* GitHub */}
        <li>
          <a
            href="https://github.com/arnavdev404"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="block h-5 w-5 text-text-secondary transition-all duration-300 hover:text-accent hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-full w-full"
            >
              <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.21 0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
            </svg>
          </a>
        </li>
        {/* LinkedIn */}
        <li>
          <a
            href="https://www.linkedin.com/in/arnav-anand-neverstop/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="block h-5 w-5 text-text-secondary transition-all duration-300 hover:text-accent hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-full w-full"
            >
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <path d="M6 9v9M6 6v.01M10 18v-6a3 3 0 0 1 6 0v6M10 12v6" />
            </svg>
          </a>
        </li>
        {/* Email */}
        <li>
          <a
            href="mailto:devwitharnav@gmail.com"
            aria-label="Email"
            className="block h-5 w-5 text-text-secondary transition-all duration-300 hover:text-accent hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-full w-full"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </a>
        </li>
      </ul>

      {/* Vertical Label */}
      <span
        aria-hidden="true"
        className="absolute bottom-16 left-1/2 -translate-x-1/2 rotate-180 font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted opacity-40 [writing-mode:vertical-lr]"
      >
        ARNAV.exe is RUNNING...
      </span>
    </aside>
  );
}
