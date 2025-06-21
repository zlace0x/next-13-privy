"use client";

import { useState } from "react";

import {
  useIdentityToken,
  usePrivy,
  User,
  useWallets,
} from "@privy-io/react-auth";
import axios from "axios";

export function Dashboard() {
  const { user, logout, authenticated } = usePrivy();
  const { identityToken } = useIdentityToken();
  const [loading, setLoading] = useState(false);
  const [linked, setLinked] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use the token in your API requests
  const linkAccounts = async () => {
    if (!identityToken) return;
    try {
      setLoading(true);
      const response = await axios.post<{ user: User }>("/api/app/privy/link", {
        id_token: identityToken,
      });
      console.log(response.data);
      setLinked(!!response.data.user);
      setUserInfo(response.data.user);
    } catch (error) {
      console.error("Get user info failed", error);
      setError("Get user info failed:" + error);
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
            <div className="flex flex-col gap-4">
              <button
                className="p-4 border border-border rounded-lg hover:bg-accent transition-colors text-left"
                onClick={linkAccounts}
                disabled={loading}
              >
                <div className="bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <div>{linked ? "Linked" : "Link"}</div>
                </div>
                <h3 className="font-medium">Link Accounts</h3>
                <p className="text-sm text-muted-foreground">
                  Test get user info with ID token
                </p>
              </button>
              {error && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">Error</h2>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              )}
              {userInfo && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="text-xl font-semibold mb-4">User Info</h2>
                  <pre className="text-sm font-mono bg-muted rounded px-2 py-1 mt-1 break-all">
                    {JSON.stringify(userInfo, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
