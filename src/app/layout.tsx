import ThemeProvider from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title:"Arnav Anand Portfolio ",
  description:
    "Portfolio of Arnav Anand — a Computer Science student specializing in AI & ML at IILM University. Showcasing projects in C, C++, Python, Java, Linux, and full-stack web development.",
  keywords: [
    "Arnav Anand",
    "Portfolio",
    "B.Tech CSE",
    "AI ML",
    "IILM University",
    "Web Developer",
    "Full Stack",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Arnav Anand" }],
  creator: "Arnav Anand",
  openGraph: {
    title: "Arnav Anand — B.Tech CSE (AI & ML) Student",
    description:
      "Computer Science student specializing in AI & ML at IILM University. Portfolio showcasing projects, skills, and learning journey.",
    type: "website",
    locale: "en_US",
    siteName: "Arnav Anand Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arnav Anand — B.Tech CSE (AI & ML) Student",
    description:
      "Computer Science student specializing in AI & ML at IILM University.",
    creator: "@arnavdev404",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text-primary">
  <ThemeProvider>
    {children}
  </ThemeProvider>
      </body>
    </html>
  );
}
