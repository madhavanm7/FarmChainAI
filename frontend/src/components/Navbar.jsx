import React from 'react';

export default function Navbar({ currentUser, activeTab, setActiveTab, onLogout }) {
  return (
    <nav className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('TRACEABILITY')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/20">
              🌾
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                FarmChain AI
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Blockchain + AI MVP
              </span>
            </div>
          </div>

          {/* Role Navigation Tabs */}
          {currentUser && (
            <div className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-700/50">
              {currentUser.role === 'FARMER' && (
                <button
                  onClick={() => setActiveTab('FARMER')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    activeTab === 'FARMER'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  👩‍🌾 Farmer Dashboard
                </button>
              )}

              {currentUser.role === 'WHOLESALER' && (
                <button
                  onClick={() => setActiveTab('MARKETPLACE')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    activeTab === 'MARKETPLACE'
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  🏪 Marketplace
                </button>
              )}

              {currentUser.role === 'RETAILER' && (
                <button
                  onClick={() => setActiveTab('RETAILER')}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    activeTab === 'RETAILER'
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  🏬 Retailer Portal
                </button>
              )}

              <button
                onClick={() => setActiveTab('TRACEABILITY')}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  activeTab === 'TRACEABILITY'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                🔍 Consumer Traceability
              </button>
            </div>
          )}

          {/* User Profile / Logout */}
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-bold text-slate-200">{currentUser.name}</div>
                  <div className="text-xs text-emerald-400 font-mono font-medium">{currentUser.userCode} ({currentUser.role})</div>
                </div>
                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 transition"
                >
                  Switch Role
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('LOGIN')}
                className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:brightness-110 transition"
              >
                Sign In / Switch Role
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
