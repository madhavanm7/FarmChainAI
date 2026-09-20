import React from 'react';

export default function BatchCard({ batch, onAction, actionLabel, onShowQR }) {
  const statusColors = {
    CREATED: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    LISTED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    ORDER_PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    SOLD: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    TRANSFERRED: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    RECEIVED: 'bg-teal-500/10 text-teal-400 border-teal-500/30'
  };

  return (
    <div className="bg-slate-800/60 rounded-2xl p-6 border border-slate-700/60 hover:border-emerald-500/40 transition-all shadow-xl backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-slate-900/80 text-emerald-400 border border-slate-700">
              {batch.batchId}
            </span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusColors[batch.status] || statusColors.LISTED}`}>
              {batch.status}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mt-2 flex items-center gap-2">
            🌱 {batch.crop}
          </h3>
        </div>

        {batch.qrData && (
          <button
            onClick={() => onShowQR(batch)}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-emerald-500/50 transition group-hover:scale-105"
            title="View Batch QR Code"
          >
            <img src={batch.qrData} alt="QR Code" className="w-12 h-12 rounded" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-6 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
        <div>
          <span className="text-slate-400 block text-xs">Quantity</span>
          <span className="font-semibold text-slate-200">{batch.quantity} {batch.unit || 'KG'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-xs">Expected Price</span>
          <span className="font-bold text-emerald-400">₹{batch.expectedPrice} / kg</span>
        </div>
        <div>
          <span className="text-slate-400 block text-xs">Quality Grade</span>
          <span className="font-semibold text-teal-300">{batch.quality || 'Grade A'}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-xs">Origin Location</span>
          <span className="font-semibold text-slate-300 truncate block">{batch.location || 'Trichy, TN'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-700/40 text-xs text-slate-400">
        <div>
          <span>Farmer: </span>
          <span className="text-slate-200 font-medium">{batch.farmerName || 'Ravi'}</span>
        </div>

        {onAction && (
          <button
            onClick={() => onAction(batch)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/20 transition transform active:scale-95"
          >
            {actionLabel || 'Select'}
          </button>
        )}
      </div>
    </div>
  );
}
