import './globals.css';
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

export const metadata: Metadata = {
  title: "Presubmit - Open Source AI Code Reviewer",
  description: "Supercharge your code reviews with AI. Get instant, actionable feedback on your pull requests with Presubmit's intelligent and context-aware AI reviewer.",
  keywords: ["LLM", "code review", "AI code review", "GitHub code reviewer", "automated code review", "pull request review", "code quality", "developer tools", "open source", "open-source", "oss"],
  authors: [{ name: "Presubmit" }],
  creator: "Presubmit",
  publisher: "Presubmit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://presubmit.ai",
    title: "Presubmit - Open Source AI Code Reviewer",
    description: "Instant, actionable feedback on your pull requests with Presubmit's intelligent and context-aware AI reviewer.",
    siteName: "Presubmit",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Presubmit AI Code Reviewer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Presubmit - Open Source AI Code Reviewer",
    description: "Instant, actionable feedback on your pull requests with Presubmit's intelligent and context-aware AI reviewer.",
    creator: "@presubmitai",
    images: ["/images/twitter-image.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  maximumScale: 1,
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" }
  ]
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        {children}
      </body>
    </html>
  );
}
