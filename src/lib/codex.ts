import axios from 'axios';
import { supabase } from './supabase';

const CODEX_GRAPHQL_URL = 'https://graph.codex.io/graphql'; 
const headers = { 
  'X-API-KEY': process.env.NEXT_PUBLIC_CODEX_API_KEY,
  'Content-Type': 'application/json'
};

// Helper to check if a date is older than 5 minutes
const isStale = (dateString: string) => {
  const cacheTime = new Date(dateString).getTime();
  const now = new Date().getTime();
  return (now - cacheTime) > 5 * 60 * 1000;
};

// Get Trending Tokens
export async function getTrendingTokens(chain: 'solana' = 'solana') {
  try {
    // Check Supabase cache first
    const { data: cachedTokens, error: cacheError } = await supabase
      .from('token_cache')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(20);

    if (cachedTokens && cachedTokens.length > 0 && !isStale(cachedTokens[0].updated_at)) {
      return cachedTokens;
    }

    // Fetch from Codex GraphQL
    const query = `
      query TrendingTokens {
    filterTokens(
    filters: {
      network: [1399811149]
    }
    rankings: [
      {
        attribute: trendingScore24
        direction: DESC
      }
    ]
    limit: 20
    ) {
    results {
      token {
        address
        symbol
        name
      }
      priceUSD
      marketCap
      volume24
      change24
    }
  }
}
    `;

    const response = await axios.post(
    CODEX_GRAPHQL_URL,
    { query },
    { headers }
    );

    // console.log(response.data); // Debugging : Log the entire response for debugging
    const results = response.data?.data?.filterTokens?.results || [];

    // Map to our Supabase schema by digging into the nested 'token' object
    const formattedTokens = results.map((item: any) => {
      const t = item.token;
      return {
        mint: t.address,
        symbol: t.symbol,
        name: t.name,
        price: Number(item.priceUSD),
        market_cap: Number(item.marketCap),
        volume_24h: Number(item.volume24),
        change_24h: Number(item.change24),
        updated_at: new Date().toISOString()
      };
    });

    // Upsert to Supabase asynchronously
    if (formattedTokens.length > 0) {
      supabase.from('token_cache').upsert(formattedTokens).then();
    }

    return formattedTokens;
  } catch (error: any) {
    if (error.response && error.response.data) {
      console.error('GraphQL Codex Error:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Network/Axios Error:', error.message);
    }
    return [];
  }
}

// Get Single Token Info
export async function getTokenInfo(mint: string) {
  try {
    const query = `
    query GetToken($address: String!) {
    filterTokens(
    filters: {
      network: [1399811149]
    }
    tokens: [$address]
    limit: 1
  ) {
    results {
      token {
        address
        symbol
        name
      }
      priceUSD
      marketCap
      volume24
      change24
      liquidity
    }
  }
}
    `;

    const response = await axios.post(CODEX_GRAPHQL_URL, { 
      query, 
      variables: { address: mint } 
    }, { headers });

    // console.log(response.data); // Debugging : Log the entire response for debugging
    const t = response.data?.data?.filterTokens?.results[0];
    if (!t) return null;

    return {
      mint: t.token.address,
      symbol: t.token.symbol,
      name: t.token.name,

      price: Number(t.priceUSD),
      market_cap: Number(t.marketCap),
      volume_24h: Number(t.volume24),
      change_24h: Number(t.change24),
      liquidity: Number(t.liquidity),
      updated_at: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error fetching token info:', error);
    return null;
  }
}

// Get Chart Data (OHLCV)
export async function getOHLCV(
  mint: string,
  resolution: string = "1"
) {
  const now = Math.floor(Date.now() / 1000);

  // 7 days of history
  const from = now - (7 * 24 * 60 * 60);

  const query = `
    query GetTokenBars(
      $symbol: String!
      $from: Int!
      $to: Int!
      $resolution: String!
    ) {
      getTokenBars(
        symbol: $symbol
        from: $from
        to: $to
        resolution: $resolution
        countback: 500
        removeEmptyBars: true
      ) {
        t
        o
        h
        l
        c
        volume
      }
    }
  `;

  const response = await axios.post(
    CODEX_GRAPHQL_URL,
    {
      query,
      variables: {
        symbol: `${mint}:1399811149`,
        from,
        to: now,
        resolution,
      },
    },
    { headers }
  );

  return response.data.data.getTokenBars;
}

// Get Recent Trades (Events)
export async function getRecentTrades(mint: string) {
  const query = `
    query GetRecentTrades($address: String!) {
      getTokenEvents(
        limit: 50
        direction: DESC
        query: {
          address: $address
          networkId: 1399811149
        }
      ) {
        items {
          transactionHash
          timestamp
          maker
          eventDisplayType
          token0SwapValueUsd
          token1SwapValueUsd
          token0PoolValueUsd
          token1PoolValueUsd
          data
        }
        cursor
      }
    }
  `;

  const response = await axios.post(
    CODEX_GRAPHQL_URL,
    {
      query,
      variables: {
        address: mint,
      },
    },
    { headers }
  );

  return response.data.data.getTokenEvents.items;
}