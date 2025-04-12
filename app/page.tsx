"use client";

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ClientLogos from "./client-logos";
import {
  ChevronRight,
  Github,
  Twitter,
  Menu,
  X,
  Zap,
  MessageSquare,
  Star,
  GitPullRequest,
  Bot,
  Search,
  Key,
  Lock,
  ArrowRight,
} from "lucide-react"
import { Suspense, useState, useEffect } from "react"

import logoPic from "@/app/logo.png";

// Keep fetchGitHubStars function (or move it to a utils file)
async function fetchGitHubStars() {
  try {
    // Use a longer revalidate time or remove if fetching client-side only
    const response = await fetch(
      'https://api.github.com/repos/presubmit/ai-reviewer',
      // { next: { revalidate: 3600 } } // Revalidate might not be needed for client-side fetch
      { cache: 'no-store' } // Or use cache control if appropriate
    );

    if (!response.ok) {
      console.error('Failed to fetch stars:', response.statusText);
      return null; // Return null on error
    }

    const data = await response.json();
    return data.stargazers_count;
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return null; // Return null on error
  }
}

// NEW: Synchronous component to display stars
function StarDisplay({ stars, isLoading }: { stars: number | string | null, isLoading: boolean }) {
  const formattedStars = isLoading
    ? '...'
    : typeof stars === 'number'
      ? stars < 1000
        ? stars.toString()
        : `${(stars / 1000).toFixed(1)}k`
      : 'N/A'; // Display N/A or fallback if stars is null/not number

  return (
    <div className="flex items-center gap-1 bg-muted px-2 py-0.5 rounded-full">
      <Star className="h-3 w-3 fill-current" />
      <span className="text-xs font-medium">{formattedStars}</span>
    </div>
  );
}

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // ADD State for stars and loading status
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const [isLoadingStars, setIsLoadingStars] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // ADD useEffect to fetch stars once on mount
  useEffect(() => {
    const getStars = async () => {
      setIsLoadingStars(true);
      const stars = await fetchGitHubStars();
      setGithubStars(stars ?? 85); // Use fallback if fetch fails
      setIsLoadingStars(false);
    };
    getStars();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background relative">
        <div className="container flex h-16 items-center justify-between max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <Image src={logoPic} alt="Presubmit" width={25} height={25} className="rounded-sm shadow-md" />
              <span className="ml-3 text-xl font-bold">Presubmit</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-3">
            <Link href="#features" className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-1">
              Features
            </Link>
            <Link href="#integration" className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-1">
              How It Works
            </Link>
            <Link href="#installation" className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-1">
              Installation
            </Link>
            <Link href="#faq" className="text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-1">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="https://github.com/presubmit/ai-reviewer" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex">
              <Button variant="outline" className="gap-2">
                <Github className="h-4 w-4" />
                <span>Star on GitHub</span>
                <StarDisplay stars={githubStars} isLoading={isLoadingStars} />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-background border-b md:hidden">
            <nav className="flex flex-col gap-1 px-4 py-4">
              <Link href="#features" className="text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2" onClick={toggleMobileMenu}>
                Features
              </Link>
              <Link href="#testimonials" className="text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2" onClick={toggleMobileMenu}>
                Testimonials
              </Link>
              <Link href="#installation" className="text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2" onClick={toggleMobileMenu}>
                Installation
              </Link>
              <Link href="#faq" className="text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md px-3 py-2" onClick={toggleMobileMenu}>
                FAQ
              </Link>
              <Link href="https://github.com/presubmit/ai-reviewer" target="_blank" rel="noopener noreferrer" className="mt-2">
                <Button variant="outline" className="w-full gap-2 justify-center">
                  <Github className="h-4 w-4" />
                  <span>Star on GitHub</span>
                  <StarDisplay stars={githubStars} isLoading={isLoadingStars} />
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24">
          <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl !leading-[1.15]">
                  Instant Review,
                  <span className="block text-gray-900">Better Code,</span>
                  Less Bugs.
                </h1>
                <div className="flex flex-row gap-3 mt-6 sm:justify-center lg:justify-start">
                  <div className="w-fit rounded-md bg-orange-500 px-3.5 py-1 text-xs font-semibold tracking-wider text-white shadow-sm">
                    OPEN SOURCE
                  </div>
                  <div className="w-fit rounded-md bg-green-700 px-3.5 py-1 text-xs font-semibold tracking-wider text-white shadow-sm">
                    BRING YOUR OWN KEY
                  </div>
                </div>
                <p className="mt-5 text-lg font-medium text-gray-700 sm:mt-7 sm:text-xl lg:text-lg xl:text-xl">
                  Get instant, actionable feedback on your pull requests with Presubmit's intelligent and context-aware AI reviewer.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row mt-8 sm:justify-center lg:justify-start">
                  <Link href="https://github.com/marketplace/actions/presubmit-ai-code-review-fixes" target="_blank" rel="noopener noreferrer" className="w-full min-[400px]:w-auto">  
                    <Button size="lg" className="gap-1 w-full">
                      Use GitHub Action for Free
                      <ArrowRight className="ml-4 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="https://github.com/presubmit/ai-reviewer" target="_blank" rel="noopener noreferrer" className="w-full min-[400px]:w-auto">
                    <Button size="lg" variant="outline" className="gap-2 w-full">
                      <Github className="h-4 w-4" />
                      View on GitHub
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center lg:justify-end">
                <Image
                  src="/images/review-example-3.png"
                  alt="AI-powered code review"
                  width={560}
                  height={400}
                  className="rounded-lg shadow-2xl h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gray-50">
          <div className=" max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-md font-semibold text-gray-400 tracking-wide uppercase mb-4 md:mb-6">
                Trusted by engineers from
              </h2>
            </div>
            <ClientLogos />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-background">
          <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Supercharge Your Code Reviews with AI</h2>
                <p className="max-w-[900px] text-muted-foreground text-base md:text-xl">
                  Let Presubmit review the code, and leave more time for your team to focus on business logic.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-2 rounded-lg border p-6 shadow-sm h-full">
                <div className="rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <span className="text-3xl">⚡️</span>
                </div>
                <h3 className="text-lg font-bold">Instant Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Catches bugs, security issues, and code optimization opportunities instantly.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 rounded-lg border p-6 shadow-sm h-full">
                <div className="rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-lg font-bold">Context-Aware</h3>
                <p className="text-sm text-muted-foreground">
                  Has overview context of the codebase and can make in-depth suggestions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 rounded-lg border p-6 shadow-sm h-full">
                <div className="rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <span className="text-3xl">⭐️</span>
                </div>
                <h3 className="text-lg font-bold">High-Precision</h3>
                <p className="text-sm text-muted-foreground">
                  Contrary to other AI code reviewers, Presubmit has a high-bar for actionable comments.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 rounded-lg border p-6 shadow-sm h-full">
                <div className="rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <span className="text-3xl">💡</span>
                </div>
                <h3 className="text-lg font-bold">Title & Description Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Save time by having the AI generate meaningful title and description for your PR.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 rounded-lg border p-6 shadow-sm h-full">
                <div className="rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <span className="text-3xl">💬</span>
                </div>
                <h3 className="text-lg font-bold">Smart & Actionable</h3>
                <p className="text-sm text-muted-foreground">
                  In-line comments, incremental reviews, and gives actionable code suggestions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 rounded-lg border p-6 shadow-sm h-full">
                <div className="rounded-full p-3 w-12 h-12 flex items-center justify-center">
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-lg font-bold">Interactive Review</h3>
                <p className="text-sm text-muted-foreground">
                  You can ask Presubmit questions or to provide code suggestions directly in your PR.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24" id="integration">
          <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Seamless Integration with GitHub</h2>
                <p className="max-w-[900px] text-muted-foreground text-base md:text-xl">
                  Presubmit integrates directly into your GitHub workflow, providing automated code reviews on every
                  pull request while you maintain total control over your code.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold">Install the GitHub Action</h3>
                <p className="text-sm text-muted-foreground">
                  Add the Presubmit GitHub Action to your repository in just a few clicks. Your code stays in your
                  environment.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold">Create a Pull Request</h3>
                <p className="text-sm text-muted-foreground">
                  When a PR is opened or updated, Presubmit automatically starts analyzing your code within your secure
                  environment.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold">Get Instant Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Receive detailed comments and suggestions directly in your PR, fixing bugs and improving code before
                  human reviews.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section id="installation" className="w-full py-12 md:py-24 bg-background">
          <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Installation
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Up and Running in 2 Minutes</h2>
                <p className="max-w-[900px] text-muted-foreground text-base md:text-xl">
                  Install Presubmit AI code review in your GitHub repository with a single file.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl rounded-lg border bg-card p-4 md:p-6 shadow-sm mt-12">
              <h3 className="text-lg font-bold mb-4">1. Create a workflow file</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a file at <code className="bg-muted px-1 py-0.5 rounded text-xs">.github/workflows/presubmit.yml</code>{" "}
                in your repository.
              </p>
              <div className="bg-muted p-4 rounded-md font-mono text-xs md:text-sm overflow-x-auto mb-8">
                <pre>{`name: Presubmit.ai

permissions:
  contents: read
  pull-requests: write
  issues: write

on:
  pull_request_target:
    types: [opened, synchronize]
  pull_request_review_comment:
    types: [created]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: presubmit/ai-reviewer@latest
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          LLM_API_KEY: \${{ secrets.LLM_API_KEY }}`}</pre>
              </div>

              <h3 className="text-lg font-bold mb-4">2. That's it!</h3>
              <p className="text-sm text-muted-foreground">
                Presubmit will now automatically review all new pull requests. It can generate title, description, and respond to comments if you mention it <code className="bg-muted px-1 py-0.5 rounded text-xs">@presubmit</code>.
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <Link
                href="https://github.com/presubmit/ai-reviewer?tab=readme-ov-file#step-1-add-llm_api_key-secret"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">View Full Installation Guide</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24">
          <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground text-base md:text-xl">
                  Common questions about Presubmit AI Code Reviewer.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              <div className="rounded-lg border p-4 md:p-6">
                <h3 className="text-base font-bold">Is Presubmit free to use?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Yes, Presubmit is an open source project and free to use. However, you'll need to bring your own LLM API key.
                </p>
              </div>
              <div className="rounded-lg border p-4 md:p-6">
                <h3 className="text-base font-bold">Does Presubmit work with private repositories?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Yes, Presubmit works with both public and private repositories on GitHub.
                </p>
              </div>
              <div className="rounded-lg border p-4 md:p-6">
                <h3 className="text-base font-bold">What LLM models does Presubmit use?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Presubmit currently supports a varienty of models from various LLM providers. Check <a href="https://github.com/presubmit/ai-reviewer/blob/main/src/ai.ts" target="_blank" rel="noopener noreferrer" className="text-primary underline">currently support models here</a>.
                </p>
              </div>
              <div className="rounded-lg border p-4 md:p-6">
                <h3 className="text-base font-bold">Who has access to my code?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  The code is never processed on Presubmit servers, but it will be sent to the LLM provider you choose. Please read that provider's privacy policy for how your code is handled.
                </p>
              </div>
              <div className="rounded-lg border p-4 md:p-6">
                <h3 className="text-base font-bold">What programming languages does Presubmit support?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Presubmit supports all major programming languages including JavaScript, TypeScript, Python, Java, Go,
                  Ruby, and many more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Transform Your Code Reviews Process?
                </h2>
                <p className="max-w-[600px] text-muted-foreground text-base md:text-xl">
                  Join thousands of developers already using Presubmit to improve code quality, save time, and ship faster. 🚀
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row !mt-6">
                <Link href="https://github.com/marketplace/actions/presubmit-ai-code-review-fixes" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-1">
                    Install GitHub Action
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://github.com/presubmit/ai-reviewer" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Github className="h-4 w-4" />
                    Star on GitHub
                    <StarDisplay stars={githubStars} isLoading={isLoadingStars} />
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-muted-foreground !mt-12">
                Presubmit is designed to complement human reviewers, not replace them. It helps catch issues early while
                making the human review process more efficient.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t">
        <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 py-6 md:h-24 md:flex-row md:py-0">
        <Link href="/" className="flex items-center">
              <Image src={logoPic} alt="Presubmit" width={20} height={20} className="rounded-sm shadow-md" />
              <span className="ml-3 text-lg font-bold">Presubmit</span>
            </Link>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-6">
            <Link href="https://github.com/presubmit/ai-reviewer/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-xs hover:underline underline-offset-4">
              Contribute
            </Link>
            <Link href="https://github.com/presubmit/ai-reviewer/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-xs hover:underline underline-offset-4">
              Readme
            </Link>
            <Link href="https://github.com/presubmit/ai-reviewer/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-xs hover:underline underline-offset-4">
              MIT License
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://x.com/presubmitai" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://github.com/presubmit/ai-reviewer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
