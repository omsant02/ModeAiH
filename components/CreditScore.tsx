'use client';

import { useEffect, useState } from 'react';
import { calculateCreditScore } from '@/lib/scoring';

interface CreditScoreProps {
  address: string;
}

export default function CreditScore({ address }: CreditScoreProps) {
  const [score, setScore] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getScore() {
      try {
        const result = await calculateCreditScore(address);
        setScore(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getScore();
  }, [address]);

  if (loading) return <div>Calculating score...</div>;

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Credit Score: {score?.total}</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <ScoreItem title="Transaction Score" value={score?.transactionScore} />
        <ScoreItem title="Balance Score" value={score?.balanceScore} />
        <ScoreItem title="DeFi Activity" value={score?.defiScore} />
        <ScoreItem title="Account Age" value={score?.ageScore} />
      </div>
    </div>
  );
}

function ScoreItem({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-xl">{Math.round(value * 100)}%</p>
    </div>
  );
}