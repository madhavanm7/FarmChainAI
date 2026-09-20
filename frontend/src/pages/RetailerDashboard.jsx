import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import BatchCard from '../components/BatchCard';

export default function RetailerDashboard({ currentUser, onShowQR }) {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBatches = async () => {
    const list = await api.getBatches();
    setBatches(list || []);
  };

  useEffect(() => {
    loadBatches();
  }, []);

  const handleMarkReceived = async (batch) => {
    setLoading(true);
    await api.transferOwnership(batch.batchId, currentUser?.userId || 3, currentUser?.name || 'Sri Stores', 'RECEIVED');
    setLoading(false);
    loadBatches();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-900/40 via-blue-900/40 to-slate-900 border border-cyan-500/30 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div>
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <span>🏬 Retailer Logistics Portal</span>
          </div>
          <h1 className="text-3xl font-black text-white">
            Retail Inventory & Batch Receiving
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Receive produce from Wholesalers, record custody transfer on-chain, and display QR for consumers.
          </p>
        </div>
      </div>

      {/* Batches Grid */}
      <div>
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          📦 Incoming Produce Shipments ({batches.length})
        </h2>

        {batches.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-700/50 text-slate-400 font-semibold">
            No incoming produce batches found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((b) => (
              <BatchCard
                key={b.batchId}
                batch={b}
                onShowQR={onShowQR}
                onAction={(batch) => handleMarkReceived(batch)}
                actionLabel={b.status === 'RECEIVED' ? 'Received ✓' : 'Mark as Received 📦'}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
