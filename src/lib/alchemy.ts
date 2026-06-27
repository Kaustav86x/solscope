import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection(process.env.ALCHEMY_SOLANA_RPC!);

export async function getSolBalance(walletAddress: string): Promise<number> {
  try {
    const pubKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(pubKey);
    return balance / 1e9; // lamports to SOL
  } catch (error) {
    console.error('Error fetching SOL balance:', error);
    return 0;
  }
}

export async function getTokenBalance(walletAddress: string, mintAddress: string): Promise<number> {
  try {
    const pubKey = new PublicKey(walletAddress);
    const mintKey = new PublicKey(mintAddress);
    const response = await connection.getParsedTokenAccountsByOwner(pubKey, { mint: mintKey });
    
    if (response.value.length === 0) return 0;
    
    const amount = response.value[0].account.data.parsed.info.tokenAmount.uiAmount;
    return amount || 0;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return 0;
  }
}