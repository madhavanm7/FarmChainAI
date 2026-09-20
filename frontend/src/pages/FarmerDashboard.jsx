import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import BatchCard from '../components/BatchCard';

export default function FarmerDashboard({ currentUser, onShowQR }) {
  const [batches, setBatches] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const [crop, setCrop] = useState('Tomato');
  const [quantity, setQuantity] = useState(500);
  const [expectedPrice, setExpectedPrice] = useState(30);
  const [harvestDate, setHarvestDate] = useState('20-09-2026');
  const [quality, setQuality] = useState('Grade A');
  const [location, setLocation] = useState('Trichy, Tamil Nadu');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    const bList = await api.getBatches(currentUser?.userId);
    setBatches(bList || []);
    const oList = await api.getOrders();
    setOrders(oList || []);
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleCreateBatch = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const newBatch = await api.createBatch({
      crop,
      quantity: Number(quantity),
      unit: 'KG',
      expectedPrice: Number(expectedPrice),
      harvestDate,
      quality,
      location,
      farmerId: currentUser?.userId || 1
    });
    setSubmitting(false);
    setShowCreateModal(false);
    loadData();
    if (newBatch) {
      onShowQR(newBatch);
    }
  };

  const handleAcceptOrder = async (orderId) => {
    await api.confirmOrder(orderId);
    loadData();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/40 to-slate-900 border border-emerald-500/30 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div>
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold mb-3">
            <span>👩‍🌾 Farmer Operations Portal</span>
          </div>
          <h1 className="text-3xl font-black text-white">
            Welcome, {currentUser?.name || 'Ravi'}!
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Create produce harvest batches, generate QR codes, and approve buyer order offers.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/30 hover:brightness-110 transition transform active:scale-95 flex items-center gap-2 self-start md:self-auto"
        >
          ➕ Create Produce Batch
        </button>
      </div>

      {/* Orders pending acceptance */}
      {orders.filter(o => o.status === 'PENDING').length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 shadow-xl">
          <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2 mb-4">
            📩 Pending Buyer Offers ({orders.filter(o => o.status === 'PENDING').length})
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {orders.filter(o => o.status === 'PENDING').map((ord) => (
              <div key={ord.orderId} className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 block mb-1">{ord.orderId} • Batch {ord.batchId}</span>
                  <div className="font-bold text-white text-base">Buyer: {ord.buyerName}</div>
                  <div className="text-xs text-slate-300 mt-1">
                    Offered Price: <span className="font-bold text-emerald-400 text-sm">₹{ord.offeredPrice}/kg</span> ({ord.quantity} KG)
                  </div>
                </div>

                <button
                  onClick={() => handleAcceptOrder(ord.orderId)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition"
                >
                  Accept Offer ✓
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Batches List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            🌱 My Harvest Batches ({batches.length})
          </h2>
        </div>

        {batches.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/40 rounded-3xl border border-slate-700/50">
            <div className="text-4xl mb-3">🌾</div>
            <p className="text-slate-400 font-semibold">No produce batches created yet.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
            >
              Create First Batch
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((b) => (
              <BatchCard
                key={b.batchId}
                batch={b}
                onShowQR={onShowQR}
                onAction={(batch) => onShowQR(batch)}
                actionLabel="View QR Code 📱"
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal: Create Batch */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800"
            >
              ✕
            </button>

            <h2 className="text-2xl font-black text-white mb-1">Create Produce Batch</h2>
            <p className="text-xs text-slate-400 mb-6">Enter harvest details to mint a batch ID and QR code.</p>

            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Crop Name</label>
                <input
                  type="text"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Quantity (KG)</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Expected Price (₹/kg)</label>
                  <input
                    type="number"
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Quality Grade</label>
                  <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm"
                  >
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Harvest Date</label>
                  <input
                    type="text"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 font-bold text-white shadow-lg shadow-emerald-500/25 hover:brightness-110 transition text-sm mt-4"
              >
                {submitting ? 'Generating Batch & QR...' : 'Mint Batch & QR Code 🚀'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
