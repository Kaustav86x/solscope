import axios from 'axios';
import { supabase } from './supabase';

const CODEX_BASE = 'https://api.codex.io'; 
const headers = { 'X-API-KEY': process.env.NEXT_PUBLIC_CODEX_API_KEY };

// Helper to check if a date is older than 5 minutes
const isStale = (dateString: string) => {
  const cacheTime = new Date(dateString).getTime();
  const now = new Date().getTime();
  return (now - cacheTime) > 5 * 60 * 1000;
};

export async function getTrendingTokens(chain: 'solana' = 'solana') {
  try {
    // 1. Check Supabase cache first
    const { data: cachedTokens, error: cacheError } = await supabase
      .from('token_cache')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(20);

    // 2. If we have fresh cache, return it immediately
    if (cachedTokens && cachedTokens.length > 0 && !isStale(cachedTokens[0].updated_at)) {
      return cachedTokens;
    }

    // 3. Otherwise, fetch fresh data from Codex.io
    const response = await axios.get(`${CODEX_BASE}/tokens/trending?chain=${chain}`, { headers });
    const tokens = response.data.data; // Adjust based on exact Codex response structure

    // 4. Map to our Supabase schema
    const formattedTokens = tokens.map((t: any) => ({
      mint: t.address,
      symbol: t.symbol,
      name: t.name,
      image_url: t.image_url || '',
      price: t.price,
      market_cap: t.market_cap,
      volume_24h: t.volume_24h,
      change_24h: t.price_change_24h,
      updated_at: new Date().toISOString()
    }));

    // 5. Upsert to Supabase asynchronously (fire and forget to not block UI)
    supabase.from('token_cache').upsert(formattedTokens).then();

    return formattedTokens;
  } catch (error) {
    console.error('Error fetching trending tokens:', error);
    return [];
  }
}

export async function getTokenInfo(mint: string) {
  const response = await axios.get(`${CODEX_BASE}/tokens/${mint}`, { headers });
  return response.data;
}

export async function getOHLCV(mint: string, resolution: string) {
  const response = await axios.get(`${CODEX_BASE}/tokens/${mint}/ohlcv?resolution=${resolution}`, { headers });
  return response.data;
}

export async function getRecentTrades(mint: string) {
  const response = await axios.get(`${CODEX_BASE}/tokens/${mint}/trades`, { headers });
  return response.data;
}