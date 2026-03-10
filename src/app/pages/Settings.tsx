import { Bell, Volume2, Globe, Moon, Info, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Navigate back to login page
    navigate('/');
  };

  return (
    <div className="p-4 space-y-4">
      {/* App Settings */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>App Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border-2 rounded-lg" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <Bell size={20} style={{ color: 'var(--brand-coral)' }} />
              <span className="text-sm" style={{ color: 'var(--brand-charcoal)' }}>Notifications</span>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-12 h-6 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ backgroundColor: 'var(--brand-coral)' }}></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border-2 rounded-lg" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <Volume2 size={20} style={{ color: 'var(--brand-sky)' }} />
              <span className="text-sm" style={{ color: 'var(--brand-charcoal)' }}>Sound Effects</span>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-12 h-6 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ backgroundColor: 'var(--brand-sky)' }}></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 border-2 rounded-lg" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-3">
              <Moon size={20} style={{ color: 'var(--brand-lavender)' }} />
              <span className="text-sm" style={{ color: 'var(--brand-charcoal)' }}>Dark Mode</span>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-12 h-6 rounded-full peer peer-checked:after:translate-x-6 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ backgroundColor: 'var(--muted)' }}></div>
            </label>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Language</h3>
        <div className="flex items-center gap-3 p-3 border-2 rounded-lg" style={{ borderColor: 'var(--border)' }}>
          <Globe size={20} style={{ color: 'var(--brand-coral)' }} />
          <select className="flex-1 bg-transparent focus:outline-none" style={{ color: 'var(--brand-charcoal)' }}>
            <option>English</option>
            <option>中文</option>
            <option>日本語</option>
            <option>한국어</option>
          </select>
        </div>
      </div>

      {/* About */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>About</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info size={16} style={{ color: 'var(--brand-sky)' }} />
              <span className="text-sm text-gray-600">Version</span>
            </div>
            <span className="text-sm" style={{ color: 'var(--brand-charcoal)' }}>1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Terms of Service</span>
            <button className="text-sm hover:opacity-80" style={{ color: 'var(--brand-coral)' }}>View</button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Privacy Policy</span>
            <button className="text-sm hover:opacity-80" style={{ color: 'var(--brand-coral)' }}>View</button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="w-full py-3 border-2 rounded-lg hover:opacity-90 flex items-center justify-center gap-2 transition-opacity"
        style={{ borderColor: 'var(--brand-coral)', backgroundColor: 'var(--brand-peach)', color: 'var(--brand-coral)' }}
      >
        <LogOut size={20} />
        <span className="font-medium">Logout</span>
      </button>
    </div>
  );
}