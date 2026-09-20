import React from 'react';

export default function QRDisplay({ batch, onClose, onNavigateTrace }) {
  if (!batch) return null;

  const traceUrl = `/trace/${batch.batchId}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800"
        >
          ✕
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
          📱
        </div>

        <h3 className="text-xl font-bold text-white mb-1">Batch QR Code</h3>
        <p className="text-xs text-slate-400 font-mono mb-4">{batch.batchId}</p>

        <div className="bg-white p-4 rounded-2xl inline-block shadow-lg mb-4">
          <img src={batch.qrData} alt={`QR for ${batch.batchId}`} className="w-48 h-48 mx-auto" />
        </div>

        <p className="text-xs text-slate-400 mb-6 px-2">
          Scanned by consumers to view end-to-end provenance, EVM blockchain tx verification, and AI price intelligence.
        </p>

        <div className="space-y-2">
          <button
            onClick={() => {
              onClose();
              onNavigateTrace(batch.batchId);
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 transition text-sm"
          >
            Open Consumer Traceability Page 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
