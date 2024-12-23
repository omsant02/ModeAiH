"use client";

import { useWallet } from "@crossmint/client-sdk-react-ui";

interface ConnectWalletProps {
  onConnect: (address: string) => void;
}

export default function ConnectWallet({ onConnect }: ConnectWalletProps) {
  const { getOrCreateWallet, status, wallet } = useWallet();

  const handleConnect = async () => {
    try {
      if (wallet?.address) {
        onConnect(wallet.address);
      } else {
        const createWalletResult = await getOrCreateWallet();
        if (createWalletResult.startedCreation) {
          console.log("Started wallet creation");
          // Wait for wallet to be ready
          const checkWallet = setInterval(() => {
            if (wallet?.address) {
              onConnect(wallet.address);
              clearInterval(checkWallet);
            }
          }, 1000);
        }
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
      <button
        onClick={handleConnect}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        disabled={status === "in-progress"}
      >
        {status === "loaded" ? "Connected" : 
         status === "in-progress" ? "Connecting..." : 
         "Connect Wallet"}
      </button>
    </div>
  );
}