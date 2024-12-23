import { ethers } from 'ethers';

export async function calculateCreditScore(address: string) {
  const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_PROVIDER_URL);

  // Get basic account info
  const [balance, txCount] = await Promise.all([
    provider.getBalance(address),
    provider.getTransactionCount(address)
  ]);

  // Calculate scores
  const balanceScore = calculateBalanceScore(balance);
  const transactionScore = calculateTransactionScore(txCount);
  const defiScore = 0.5; // Placeholder
  const ageScore = 0.7; // Placeholder

  // Calculate total score (weighted)
  const total = Math.round(
    (balanceScore * 0.3) +
    (transactionScore * 0.3) +
    (defiScore * 0.2) +
    (ageScore * 0.2)
  * 100);

  return {
    total,
    balanceScore,
    transactionScore,
    defiScore,
    ageScore
  };
}

function calculateBalanceScore(balance: bigint): number {
  const balanceInEther = Number(ethers.formatEther(balance));
  return Math.min(balanceInEther / 10, 1); // Max score at 10 ETH
}

function calculateTransactionScore(txCount: number): number {
  return Math.min(txCount / 50, 1); // Max score at 50 transactions
}