import React, { useState } from 'react';
import Navbar from './components/Navbar';
import QRDisplay from './components/QRDisplay';
import Login from './pages/Login';
import FarmerDashboard from './pages/FarmerDashboard';
import Marketplace from './pages/Marketplace';
import RetailerDashboard from './pages/RetailerDashboard';
import Traceability from './pages/Traceability';

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    userId: 1,
    userCode: 'FR001',
    name: 'Ravi',
    role: 'FARMER',
    phone: '9876543210',
    city: 'Trichy',
    state: 'Tamil Nadu'
  });

  const [activeTab, setActiveTab] = useState('FARMER'); // FARMER, MARKETPLACE, RETAILER, TRACEABILITY, LOGIN
  const [selectedQRBatch, setSelectedQRBatch] = useState(null);
  const [traceBatchId, setTraceBatchId] = useState('TOM-2026-001');

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    if (userData.role === 'FARMER') setActiveTab('FARMER');
    else if (userData.role === 'WHOLESALER') setActiveTab('MARKETPLACE');
    else if (userData.role === 'RETAILER') setActiveTab('RETAILER');
    else setActiveTab('TRACEABILITY');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('LOGIN');
  };

  const handleNavigateTrace = (batchId) => {
    setTraceBatchId(batchId);
    setActiveTab('TRACEABILITY');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'LOGIN' && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}

        {activeTab === 'FARMER' && (
          <FarmerDashboard
            currentUser={currentUser}
            onShowQR={(batch) => setSelectedQRBatch(batch)}
          />
        )}

        {activeTab === 'MARKETPLACE' && (
          <Marketplace
            currentUser={currentUser}
            onShowQR={(batch) => setSelectedQRBatch(batch)}
          />
        )}

        {activeTab === 'RETAILER' && (
          <RetailerDashboard
            currentUser={currentUser}
            onShowQR={(batch) => setSelectedQRBatch(batch)}
          />
        )}

        {activeTab === 'TRACEABILITY' && (
          <Traceability initialBatchId={traceBatchId} />
        )}
      </main>

      {/* QR Code Modal */}
      {selectedQRBatch && (
        <QRDisplay
          batch={selectedQRBatch}
          onClose={() => setSelectedQRBatch(null)}
          onNavigateTrace={handleNavigateTrace}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>FarmChain AI — Prototype built according to working_principle.pdf</p>
        <p className="mt-1 font-mono text-slate-600">Spring Boot Backend • EVM Smart Contract • FastAPI AI • React UI</p>
      </footer>
    </div>
  );
}
