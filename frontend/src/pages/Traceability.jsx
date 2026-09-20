import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Traceability({ initialBatchId = 'TOM-2026-001' }) {
  const [batchIdInput, setBatchIdInput] = useState(initialBatchId);
  const [traceData, setTraceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTrace = async (bId) => {
    setLoading(true);
    const res = await api.getTraceabilityHistory(bId);
    setTraceData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrace(initialBatchId);
  }, [initialBatchId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (batchIdInput) {
      fetchTrace(batchIdInput);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Search Header */}
      <div className="bg-slate-800/60 p-6 rounded-3xl border border-slate-700/60 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
              🔍 Public Consumer Provenance Verification
            </span>
            <h1 className="text-2xl font-black text-white">
              Scan or Enter Batch ID
            </h1>
          </div>

          <form onSubmit={handleSearch} className="flex items-center space-x-2 w-full md:w-auto">
            <input
              type="text"
              value={batchIdInput}
              onChange={(e) => setBatchIdInput(e.target.value)}
              placeholder="e.g. TOM-2026-001"
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-bold text-sm w-full md:w-48 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-white text-sm hover:brightness-110 transition shadow-lg shadow-emerald-500/20"
            >
              Verify
            </button>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 font-semibold animate-pulse">
          Fetching blockchain ledger events & running AI analysis...
        </div>
      ) : traceData ? (
        <div className="space-y-8">
          
          {/* Crop Overview Card */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-sm font-mono font-bold px-3 py-1 rounded-lg bg-slate-950 text-emerald-400 border border-slate-700">
                    {traceData.batch.batchId}
                  </span>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Verified On EVM Blockchain
                  </span>
                </div>

                <h2 className="text-3xl font-black text-white flex items-center gap-2">
                  🌱 {traceData.batch.crop}
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Origin: <strong className="text-slate-200">{traceData.batch.location || 'Trichy, Tamil Nadu'}</strong>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 text-sm">
                <div>
                  <span className="text-slate-400 text-xs block">Harvest Date</span>
                  <span className="font-bold text-slate-200">{traceData.batch.harvestDate || '20-09-2026'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Quality Grade</span>
                  <span className="font-bold text-teal-300">{traceData.batch.quality || 'Grade A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Quantity</span>
                  <span className="font-bold text-slate-200">{traceData.batch.quantity} {traceData.batch.unit || 'KG'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs block">Farmer</span>
                  <span className="font-bold text-emerald-400">{traceData.batch.farmerName || 'Ravi'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Supply Chain Journey Timeline */}
          <div className="bg-slate-800/60 rounded-3xl p-8 border border-slate-700/60 shadow-xl backdrop-blur-md">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
              ⛓️ Verified Supply Chain Timeline
            </h3>

            <div className="relative pl-6 border-l-2 border-emerald-500/40 space-y-8">
              {traceData.supplyChainJourney?.map((step, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-900 shadow-md"></div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/60 hover:border-emerald-500/40 transition">
                    <div className="font-bold text-slate-200 text-base flex items-center justify-between">
                      <span>{step}</span>
                      <span className="text-xs text-emerald-400 font-mono font-medium bg-emerald-500/10 px-2 py-0.5 rounded">
                        Step {idx + 1} ✓
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain & AI Intelligence Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Blockchain Audit Box */}
            <div className="bg-slate-800/60 rounded-3xl p-6 border border-slate-700/60 shadow-xl backdrop-blur-md">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm mb-3">
                <span className="text-lg">📦</span>
                <span>EVM Smart Contract Event Record</span>
              </div>

              <div className="space-y-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-700/50 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Blockchain Transaction Hash</span>
                  <span className="font-mono text-indigo-300 break-all bg-slate-950 p-2 rounded block border border-slate-800">
                    {traceData.latestBlockHash}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-400">Consensus Status:</span>
                  <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {traceData.blockchainStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* AI Price Intelligence Box */}
            {traceData.priceInsight && (
              <div className="bg-slate-800/60 rounded-3xl p-6 border border-slate-700/60 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 text-teal-400 font-bold text-sm">
                    <span className="text-lg">🤖</span>
                    <span>AI Price Intelligence Engine</span>
                  </div>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                    traceData.priceInsight.status === 'NORMAL'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                    {traceData.priceInsight.status}
                  </span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/50 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Observed Price:</span>
                    <span className="font-bold text-white text-sm">₹{traceData.priceInsight.observedPrice} / kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Market Benchmark Range:</span>
                    <span className="font-bold text-teal-300">{traceData.priceInsight.referenceRange}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800">
                    <span className="text-slate-400 block mb-1">AI Analytical Insight:</span>
                    <p className="text-slate-200 italic bg-slate-950 p-2.5 rounded border border-slate-800">
                      "{traceData.priceInsight.insight}"
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      ) : (
        <div className="text-center py-16 text-rose-400 font-semibold bg-slate-800/40 rounded-3xl">
          Batch ID not found.
        </div>
      )}

    </div>
  );
}
