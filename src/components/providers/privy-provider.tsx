"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { ReactNode } from "react";

interface PrivyAuthProviderProps {
  children: ReactNode;
}

// Component to show when Privy App ID is not configured
function PrivyConfigurationError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-md text-center p-8 bg-card border border-border rounded-xl">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-4">Privy Configuration Required</h2>
        <p className="text-muted-foreground mb-6">
          To use wallet authentication, please set up your Privy App ID in the
          environment variables.
        </p>
        <div className="bg-muted rounded-lg p-4 text-left text-sm font-mono mb-6">
          <p className="text-muted-foreground mb-2">1. Get your App ID from:</p>
          <a
            href="https://dashboard.privy.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            https://dashboard.privy.io
          </a>
          <p className="text-muted-foreground mt-4 mb-2">
            2. Add to .env.local:
          </p>
          <code className="text-foreground">
            NEXT_PUBLIC_PRIVY_APP_ID=your_app_id_here
          </code>
        </div>
        <p className="text-sm text-muted-foreground">
          After configuration, restart your development server.
        </p>
      </div>
    </div>
  );
}

export function PrivyAuthProvider({ children }: PrivyAuthProviderProps) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  // Check if App ID is missing or invalid
  if (!appId || appId === "your_privy_app_id_here" || appId.length < 10) {
    return <PrivyConfigurationError />;
  }

  try {
    return (
      <PrivyProvider
        appId={appId}
        config={{
          // Appearance customization
          appearance: {
            theme: "dark",
            accentColor: "#0969da",
            logo: "https://your-logo-url.com/logo.png",
          },
          // Login methods configuration
          loginMethods: ["wallet", "email", "sms"],
          // Wallet configuration
          embeddedWallets: {
            createOnLogin: "users-without-wallets",
          },
          // Supported wallet connectors
          supportedChains: [
            {
              id: 1, // Ethereum mainnet
              name: "Ethereum",
              rpcUrls: {
                default: {
                  http: ["https://eth.llamarpc.com"],
                },
              },
              blockExplorers: {
                default: {
                  name: "Etherscan",
                  url: "https://etherscan.io",
                },
              },
              nativeCurrency: {
                decimals: 18,
                name: "Ether",
                symbol: "ETH",
              },
            },
            {
              id: 11155111, // Sepolia testnet
              name: "Sepolia",
              rpcUrls: {
                default: {
                  http: ["https://rpc.sepolia.org"],
                },
              },
              blockExplorers: {
                default: {
                  name: "Etherscan",
                  url: "https://sepolia.etherscan.io",
                },
              },
              nativeCurrency: {
                decimals: 18,
                name: "Ether",
                symbol: "ETH",
              },
            },
          ],
          defaultChain: {
            id: 11155111, // Default to Sepolia testnet for development
            name: "Sepolia",
            rpcUrls: {
              default: {
                http: ["https://rpc.sepolia.org"],
              },
            },
            blockExplorers: {
              default: {
                name: "Etherscan",
                url: "https://sepolia.etherscan.io",
              },
            },
            nativeCurrency: {
              decimals: 18,
              name: "Ether",
              symbol: "ETH",
            },
          },
        }}
      >
        {children}
      </PrivyProvider>
    );
  } catch (error) {
    console.error("Error initializing Privy:", error);
    return <PrivyConfigurationError />;
  }
}
