'use client';

import { useState, useEffect } from 'react';
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export default function Analysis({ address }: { address: string }) {
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyzeWallet();
  }, [address]);

  const analyzeWallet = async () => {
    try {
      const result = await generateText({
        model: openai("gpt-4o-mini"),
        maxSteps: 5,
        prompt: `Analyze wallet ${address} on Mode Network and provide credit score insights.`
      });
      setAnalysis(result.text);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysis('Unable to generate analysis at this time.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Generating analysis...</div>;

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
      <div className="prose">
        {analysis}
      </div>
    </div>
  );
}