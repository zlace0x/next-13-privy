"use client";

import { useState } from "react";

import {
  PrivyProvider,
  useIdentityToken,
  useLogin,
  usePrivy,
  useWallets,
} from "@privy-io/react-auth";
import axios from "axios";

export function Dashboard() {
  const { user, logout, authenticated } = usePrivy();
  const { identityToken } = useIdentityToken();
  const [loading, setLoading] = useState(false);
  const [linked, setLinked] = useState(false);

  // Use the token in your API requests
  const linkAccounts = async () => {
    if (!identityToken) return;
    try {
      setLoading(true);
      const response = await axios.post<{ linked: boolean }>(
        "/api/app/privy/link",
        {
          id_token: identityToken,
        }
      );
      console.log(response);
      setLinked(response.data.linked);
    } catch (error) {
      console.error("Linking failed", error);
    } finally {
      setLoading(false);
    }
  };
  const { wallets } = useWallets();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!authenticated || !user) {
    return null;
  }

  const primaryWallet = wallets[0];
  const walletAddress = primaryWallet?.address;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                H
              </span>
            </div>
            <span className="font-semibold text-lg">HyperApp Dashboard</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Connected
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-destructive hover:bg-destructive/90 disabled:bg-destructive/50 text-destructive-foreground px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoggingOut ? (
                <>
                  <div className="w-4 h-4 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin" />
                  Disconnecting...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Disconnect
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
                <p className="text-muted-foreground">
                  You&apos;re successfully connected to HyperApp
                </p>
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* User Info Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Account Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Account Information
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    User ID
                  </label>
                  <p className="text-sm font-mono bg-muted rounded px-2 py-1 mt-1 break-all">
                    {user.id}
                  </p>
                </div>
                {user.email && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <p className="text-sm mt-1">{user.email.address}</p>
                  </div>
                )}
                {user.phone && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Phone
                    </label>
                    <p className="text-sm mt-1">{user.phone.number}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Created
                  </label>
                  <p className="text-sm mt-1">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
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
                Wallet Information
              </h2>
              <div className="space-y-3">
                {walletAddress ? (
                  <>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Address
                      </label>
                      <p className="text-sm font-mono bg-muted rounded px-2 py-1 mt-1 break-all">
                        {walletAddress}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Wallet Type
                      </label>
                      <p className="text-sm mt-1 capitalize">
                        {primaryWallet?.walletClientType || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Chain ID
                      </label>
                      <p className="text-sm mt-1">
                        {primaryWallet?.chainId || "Not connected"}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">No wallet connected</p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">View Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  Check your transaction history
                </p>
              </button>
              <button
                className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left"
                onClick={linkAccounts}
                disabled={loading}
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <div>Link</div>
                </div>
                <h3 className="font-medium">Link Accounts</h3>
                <p className="text-sm text-muted-foreground">
                  Link your accounts to your HyperApp
                </p>
              </button>

              <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your account preferences
                </p>
              </button>

              <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-medium">Help & Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get help with your account
                </p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
