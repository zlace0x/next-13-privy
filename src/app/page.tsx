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
              <Link
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
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
                  v15
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Connect Your Wallet & Explore
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the power of Web3 with Next.js 15, React 19, and
              Tailwind CSS v4. Connect your wallet to access your personalized
              dashboard.
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
              <button className="border border-border hover:bg-accent text-foreground px-8 py-3 rounded-lg font-medium transition-all hover:scale-105">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Modern Web3 Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Leveraging the latest technologies to deliver exceptional Web3
              experiences with wallet integration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">🔗</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Wallet Integration</h3>
              <p className="text-muted-foreground">
                Seamless wallet connection with Privy.io supporting MetaMask,
                WalletConnect, and more.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Next.js 15</h3>
              <p className="text-muted-foreground">
                Latest Next.js with App Router, Server Components, and improved
                performance with Turbopack.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">⚛️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">React 19</h3>
              <p className="text-muted-foreground">
                Enhanced React with new hooks, improved Server Components, and
                better concurrent features.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tailwind CSS v4</h3>
              <p className="text-muted-foreground">
                Modern styling with CSS-based configuration, improved
                performance, and enhanced design tokens.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Secure Authentication
              </h3>
              <p className="text-muted-foreground">
                Enterprise-grade security with Privy&apos;s authentication
                infrastructure and wallet management.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-primary font-bold text-xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-muted-foreground">
                Mobile-first approach with modern responsive patterns optimized
                for all devices.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect your wallet now to explore the full potential of our
              Web3-enabled application.
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-all hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Connect Your Wallet
            </button>
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

            <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
              <p>
                &copy; 2025 HyperApp. Built with ❤️ using Next.js 15, React 19,
                Tailwind CSS v4, and Privy.io.
              </p>
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
