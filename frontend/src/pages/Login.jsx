import React, { useState } from 'react';
import { api } from '../services/api';

export default function Login({ onLoginSuccess }) {
  const [phone, setPhone] = useState('9876543210');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);

  const demoAccounts = [
    { name: 'Ravi', role: 'FARMER', phone: '9876543210', userCode: 'FR001', icon: '👩‍🌾', location: 'Trichy, TN' },
    { name: 'Kumar Traders', role: 'WHOLESALER', phone: '9876543211', userCode: 'WH001', icon: '🏪', location: 'Madurai, TN' },
    { name: 'Sri Stores', role: 'RETAILER', phone: '9876543212', userCode: 'RT001', icon: '🏬', location: 'Chennai, TN' },
    { name: 'Anand', role: 'CONSUMER', phone: '9876543213', userCode: 'CS001', icon: '🔍', location: 'Chennai, TN' }
  ];

  const handleSelectDemo = async (account) => {
    setLoading(true);
    const res = await api.login(account.phone, 'password');
    setLoading(false);
    if (res && res.success) {
      onLoginSuccess(res);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await api.login(phone, password);
    setLoading(false);
    if (res && res.success) {
      onLoginSuccess(res);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-3xl mx-auto mb-4 shadow-xl shadow-emerald-500/20">
          🌾
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight mb-2">
          Welcome to FarmChain AI
        </h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Agricultural supply-chain prototype with EVM blockchain audit ledger & AI price intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Quick Demo Role Selector */}
        <div className="bg-slate-800/60 p-6 rounded-3xl border border-slate-700/60 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
            ⚡ One-Click Role Selector
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Instantly log in as any supply chain participant:
          </p>

          <div className="space-y-3">
            {demoAccounts.map((acc) => (
              <button
                key={acc.phone}
                onClick={() => handleSelectDemo(acc)}
                className="w-full p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center justify-between group text-left"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl p-2 rounded-xl bg-slate-800 group-hover:scale-110 transition">{acc.icon}</span>
                  <div>
                    <div className="font-bold text-slate-200 group-hover:text-emerald-400 transition">{acc.name}</div>
                    <div className="text-xs text-slate-400 font-mono">{acc.userCode} ({acc.role}) • {acc.location}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                  Select →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Credentials Form */}
        <div className="bg-slate-800/60 p-6 rounded-3xl border border-slate-700/60 shadow-xl backdrop-blur-md">
          <h2 className="text-lg font-bold text-white mb-4">
            Sign In with Phone Number
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 font-mono text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 font-bold text-white shadow-lg shadow-emerald-500/25 hover:brightness-110 transition text-sm flex items-center justify-center gap-2"
            >
              {loading ? 'Logging in...' : 'Sign In to Portal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
