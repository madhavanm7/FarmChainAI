import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import BatchCard from '../components/BatchCard';

export default function Marketplace({ currentUser, onShowQR }) {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [offeredPrice, setOfferedPrice] = useState(28);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const loadBatches = async () => {
    const list = await api.getBatches();
    setBatches(list || []);
  };

  useEffect(() => {
    loadBatches();
  }, []);

  const handleOpenOrderModal = (batch) => {
    setSelectedBatch(batch);
    setOfferedPrice(batch.expectedPrice ? batch.expectedPrice - 2 : 28);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!selectedBatch) return;

    setLoading(true);
    const orderRes = await api.createOrder({
      batchId: selectedBatch.batchId,
      buyerId: currentUser?.userId || 2,
      quantity: selectedBatch.quantity,
      offeredPrice: Number(offeredPrice)
    });

    setLoading(false);
    setSelectedBatch(null);
    setSuccessMsg(`Order proposal submitted for ${selectedBatch.batchId} at ₹${offeredPrice}/kg! Waiting for Farmer acceptance.`);
    loadBatches();

    setTimeout(() => setSuccessMsg(''), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900/40 via-cyan-900/40 to-slate-900 border border-teal-500/30 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div>
          <div className="inline-flex items-center space-x-2 bg-teal-500/10 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <span>🏪 Wholesaler Marketplace</span>
          </div>
          <h1 className="text-3xl font-black text-white">
            Available Farm Produce Listings
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Browse verified farmer batches, make price offers, and confirm transactions on-chain.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-emerald-300 font-semibold text-sm flex items-center gap-2">
          <span>✅ {successMsg}</span>
        </div>
      )}

      {/* Produce Grid */}
      <div>
        <h2 className="text-xl font-black text-white mb-6 flex items-center gap-2">
          🛒 Active Marketplace Listings ({batches.length})
        </h2>

        {batches.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-700/50 text-slate-400 font-semibold">
            No produce listed on marketplace right now.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((b) => (
              <BatchCard
                key={b.batchId}
                batch={b}
                onShowQR={onShowQR}
                onAction={handleOpenOrderModal}
                actionLabel={b.status === 'ORDER_PENDING' ? 'Offer Submitted ⏳' : 'Place Price Offer 🤝'}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal: Place Offer */}
      {selectedBatch && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedBatch(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-3 text-2xl border border-teal-500/20">
              🤝
            </div>

            <h2 className="text-2xl font-black text-white mb-1">Negotiate / Place Offer</h2>
            <p className="text-xs text-slate-400 mb-6 font-mono">{selectedBatch.batchId} • {selectedBatch.crop}</p>

            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 mb-4 text-sm space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Farmer Expected Price:</span>
                <span className="font-bold text-emerald-400">₹{selectedBatch.expectedPrice} / kg</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Batch Total Quantity:</span>
                <span className="font-bold text-white">{selectedBatch.quantity} {selectedBatch.unit || 'KG'}</span>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Price Offer (₹/kg)</label>
                <input
                  type="number"
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-extrabold text-lg focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 font-bold text-white shadow-lg shadow-teal-500/25 hover:brightness-110 transition text-sm mt-2"
              >
                {loading ? 'Submitting Offer...' : 'Submit Price Offer to Farmer 🚀'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
