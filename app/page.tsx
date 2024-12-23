'use client';

import { useState } from 'react';
import ConnectWallet from '@/components/ConnectWallet';
import CreditScore from '@/components/CreditScore';
import Analysis from '@/components/Analysis';

export default function Home() {
  const [address, setAddress] = useState<string>('');

  const handleConnect = (walletAddress: string) => {
    setAddress(walletAddress);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Mode Credit Score AI Agent</h1>
      
      <div className="max-w-4xl mx-auto">
        <ConnectWallet onConnect={handleConnect} />
        
        {address && (
          <div className="mt-8 space-y-8">
            <CreditScore address={address} />
            <Analysis address={address} />
          </div>
        )}
      </div>
    </main>
  );
}