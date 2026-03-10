import { User, Award, Calendar } from 'lucide-react';
import { useGame } from '../context/GameContext';
import Ninni from '../components/Ninni';

export default function Profile() {
  const { userNickname, petStats, ninniSettings } = useGame();

  const displayName = userNickname || 'Guest Player';
  const genderEmoji = ninniSettings.gender === 'boy' ? '🧑' : ninniSettings.gender === 'girl' ? '👧' : '✨';

  return (
    <div className="p-4 space-y-4">
      {/* Profile Header */}
      <div className="border-2 rounded-lg p-6 bg-white" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full border-4 bg-white flex items-center justify-center mb-4 shadow-lg" style={{ borderColor: 'var(--brand-coral)' }}>
            <User size={48} style={{ color: 'var(--brand-coral)' }} />
          </div>
          <h2 className="text-xl font-medium mb-1" style={{ color: 'var(--brand-charcoal)' }}>{displayName}</h2>
          <p className="text-sm text-gray-500">ID: 123456</p>
        </div>
      </div>

      {/* Stats */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Statistics</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award size={20} style={{ color: 'var(--brand-coral)' }} />
              <span className="text-sm text-gray-600">Player Level</span>
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>Level {petStats.level}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={20} style={{ color: 'var(--brand-sky)' }} />
              <span className="text-sm text-gray-600">Days Active</span>
            </div>
            <span className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>1 Day</span>
          </div>
        </div>
      </div>

      {/* My Ninni */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>My Ninni</h3>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <Ninni size={80} />
          </div>
          <div>
            <div className="font-medium mb-1" style={{ color: 'var(--brand-charcoal)' }}>
              {displayName}'s Ninni {genderEmoji}
            </div>
            <div className="text-sm text-gray-500 mb-1">Level {petStats.level}</div>
            <div className="text-xs" style={{ color: 'var(--brand-coral)' }}>
              {ninniSettings.gender === 'boy' ? 'Boy' : ninniSettings.gender === 'girl' ? 'Girl' : 'Other'}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Edit Profile</h3>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Username</label>
            <input 
              type="text"
              placeholder="Enter username"
              value={displayName}
              className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors"
              style={{ 
                borderColor: 'var(--border)',
                backgroundColor: 'var(--input-background)'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--brand-coral)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              readOnly
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Ninni Gender</label>
            <input 
              type="text"
              value={ninniSettings.gender === 'boy' ? 'Boy' : ninniSettings.gender === 'girl' ? 'Girl' : 'Other'}
              className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors"
              style={{ 
                borderColor: 'var(--border)',
                backgroundColor: 'var(--input-background)'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--brand-coral)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}