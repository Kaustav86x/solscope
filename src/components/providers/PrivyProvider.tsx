'use client';

import { PrivyProvider as Privy } from '@privy-io/react-auth';

/**
 * ChadWallet Privy configuration
 *
 * Prerequisites (Privy dashboard → your app):
 *   1. Enable login methods: Google, Apple
 *   2. Enable Solana embedded wallets
 *   3. Add your domain to allowed origins
 *
 * Env vars needed in .env.local:
 *   PRIVY_APP_ID=your_privy_app_id
 */
export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appId = process.env.PRIVY_APP_ID;

  if (!appId) {
    // In dev without an App ID, render children without auth
    console.warn(
      '[ChadWallet] PRIVY_APP_ID is not set. Auth is disabled.'
    );
    return <>{children}</>;
  }

  return (
    <Privy
      appId={appId}
      config={{
        // Sign-in methods
        loginMethods: ['google', 'apple'],

        // Branding
        appearance: {
          theme: 'dark',
          accentColor: '#22C55E',
          logo: '/assets/light.png',
          landingHeader: 'Sign in to ChadWallet',
          loginMessage: 'Trade memecoins like a chad.',
          walletChainType: 'solana-only',
        },

        // Auto-create embedded Solana wallet on first login
        embeddedWallets: {
          solana: {
            createOnLogin: 'users-without-wallets',
          },
        },

        // Default to Solana mainnet
        // The RPC URL here is Alchemy — set ALCHEMY_SOLANA_RPC in .env.local
        // NOTE: 'solanaClusters' isn't a known property on PrivyClientConfig — cast to any to allow custom cluster config
        solanaClusters: [
          {
            name: 'mainnet-beta',
            rpcUrl:
              process.env.ALCHEMY_SOLANA_RPC ||
              'https://api.mainnet-beta.solana.com',
          },
        ],
      } as any}
    >
      {children}
    </Privy>
  );
}
