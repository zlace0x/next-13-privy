"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { LoginModal } from "@/components/auth/login-modal";
import { Dashboard } from "@/components/auth/dashboard";

export default function Home() {
  const { authenticated, ready } = usePrivy();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Show loading state while Privy is initializing
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  // Show dashboard if authenticated
  if (authenticated) {
    return <Dashboard />;
  }

  // Show landing page with login option
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Header */}
        <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-40">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  H
                </span>
              </div>
              <span className="font-semibold text-lg">HyperApp</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Connect Wallet
              </button>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Image
                  className="dark:invert"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={200}
                  height={50}
                  priority
                />
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                  v13
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Connect Your Wallet
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Minimal wallet connection with Privy.io
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Connect Wallet
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">
                      H
                    </span>
                  </div>
                  <span className="font-semibold text-lg">HyperApp</span>
                </div>
                <p className="text-muted-foreground max-w-md">
                  A modern Web3 application built with the latest technologies.
                  Connect your wallet to unlock the full experience.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link
                      href="https://nextjs.org"
                      className="hover:text-foreground transition-colors"
                    >
                      Next.js Docs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://tailwindcss.com"
                      className="hover:text-foreground transition-colors"
                    >
                      Tailwind CSS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://privy.io"
                      className="hover:text-foreground transition-colors"
                    >
                      Privy.io
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Deploy</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <Link
                      href="https://vercel.com"
                      className="hover:text-foreground transition-colors"
                    >
                      Vercel
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://netlify.com"
                      className="hover:text-foreground transition-colors"
                    >
                      Netlify
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://railway.app"
                      className="hover:text-foreground transition-colors"
                    >
                      Railway
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
