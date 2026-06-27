'use client';

import { useState, useEffect } from 'react';
import { getTrendingTokens } from '@/lib/codex';

export interface BannerToken {
  mint: string;
  symbol: string;
  price: number;
  change_24h: number;
}

export function useTokenBanner() {
  const [tokens, setTokens] = useState<BannerToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const data = await getTrendingTokens('solana');
        if (data && data.length > 0) {
          setTokens(data);
        }
      } catch (error) {
        console.error("Failed to load banner tokens", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
    // Refresh interval: 60 seconds as requested
    const interval = setInterval(fetchTokens, 60000);
    return () => clearInterval(interval);
  }, []);

  return { tokens, loading };
}