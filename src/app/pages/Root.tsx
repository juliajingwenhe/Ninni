import { useState } from 'react';
import { Outlet } from 'react-router';
import { Menu } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import Sidebar from '../components/Sidebar';

export default function Root() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <header className="fixed top-0 left-0 right-0 bg-white border-b-2 z-30" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-md mx-auto flex justify-between items-center px-4 h-14">
          <h1 className="text-xl font-medium" style={{ color: 'var(--brand-coral)' }}>Nearness</h1>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} style={{ color: 'var(--brand-charcoal)' }} />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto pt-14 pb-20">
        <Outlet />
      </main>

      <BottomNav />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}