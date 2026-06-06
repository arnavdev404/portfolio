export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-jetbrains)] text-sm font-bold tracking-tighter">
            <span className="gradient-text"></span>
            <span className="text-text-muted"></span>
          </span>
          <span className="font-[family-name:var(--font-jetbrains)] text-xs text-text-muted">
            © {new Date().getFullYear()} Arnav Anand. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/arnavdev404"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/arnav-anand-neverstop/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
          <a
            href="mailto:devwitharnav@gmail.com"
            className="font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.15em] text-text-secondary transition-colors hover:text-accent"
          >
            Email
          </a>
        </div>
      </div>

      {/* Built with love */}
      <div className="mx-auto mt-6 max-w-7xl text-center">
        <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.2em] text-text-muted">
          ┈━═☆❣️POWERED BY CURIOSITY & LATE NIGHTS❣️☆═━┈
        </p>
      </div>
    </footer>
  );
}
