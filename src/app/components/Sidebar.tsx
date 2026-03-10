import { X, User, BookOpen, Settings } from 'lucide-react';
import { Link } from 'react-router';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform" style={{ borderLeft: '2px solid var(--border)' }}>
        <div className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b-2" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-xl font-medium" style={{ color: 'var(--brand-coral)' }}>Menu</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} style={{ color: 'var(--brand-charcoal)' }} />
            </button>
          </div>

          {/* User Profile */}
          <div className="mb-6 p-4 border-2 rounded-lg" style={{ borderColor: 'var(--brand-coral)', backgroundColor: 'var(--brand-peach)' }}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 bg-white flex items-center justify-center" style={{ borderColor: 'var(--brand-coral)' }}>
                <span className="text-xl">👤</span>
              </div>
              <div>
                <div className="font-medium" style={{ color: 'var(--brand-charcoal)' }}>Guest User</div>
                <div className="text-sm text-gray-500">Level 5</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-4">
            <Link 
              to="/home/profile" 
              className="flex items-center gap-4 p-4 border-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ borderColor: 'var(--brand-coral)', backgroundColor: 'var(--brand-peach)' }}
              onClick={onClose}
            >
              <User size={24} style={{ color: 'var(--brand-coral)' }} />
              <span className="text-lg" style={{ color: 'var(--brand-charcoal)' }}>Profile</span>
            </Link>
            
            <Link 
              to="/home/journal" 
              className="flex items-center gap-4 p-4 border-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ borderColor: 'var(--brand-sky)', backgroundColor: 'var(--brand-light-blue)' }}
              onClick={onClose}
            >
              <BookOpen size={24} style={{ color: 'var(--brand-sky)' }} />
              <span className="text-lg" style={{ color: 'var(--brand-charcoal)' }}>Journal</span>
            </Link>
            
            <Link 
              to="/home/settings" 
              className="flex items-center gap-4 p-4 border-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ borderColor: 'var(--brand-lavender)', backgroundColor: '#F0E8F8' }}
              onClick={onClose}
            >
              <Settings size={24} style={{ color: 'var(--brand-lavender)' }} />
              <span className="text-lg" style={{ color: 'var(--brand-charcoal)' }}>Settings</span>
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t-2" style={{ borderColor: 'var(--border)' }}>
            <div className="text-xs text-center text-gray-500">
              <p>Nearness v1.0</p>
              <p className="mt-1">Your virtual pet companion</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}