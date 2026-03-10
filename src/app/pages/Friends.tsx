import { UserPlus, Eye } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';

export default function Friends() {
  const [friends] = useState([
    { id: 1, name: 'Alex', ninni: '🟣', ninniName: 'Buddy', level: 5, nearness: 65 },
    { id: 2, name: 'Sarah', ninni: '🔵', ninniName: 'Whiskers', level: 8, nearness: 82 },
    { id: 3, name: 'Mike', ninni: '🟡', ninniName: 'Fluffy', level: 3, nearness: 45 },
  ]);

  return (
    <div className="p-4 space-y-4">
      {/* Add Friend Section */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Add Friend</h3>
        <div className="flex gap-2">
          <input 
            type="text"
            placeholder="Enter friend ID or name"
            className="flex-1 px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors"
            style={{ 
              borderColor: 'var(--border)',
              backgroundColor: 'var(--input-background)'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = 'var(--brand-coral)'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
          />
          <button className="px-4 py-2 text-white rounded-lg hover:opacity-90 flex items-center gap-2 transition-opacity" style={{ backgroundColor: 'var(--brand-coral)' }}>
            <UserPlus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Friends List */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Friends List</h3>
        <div className="space-y-3">
          {friends.map((friend) => (
            <div 
              key={friend.id}
              className="border-2 rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-2 bg-white flex items-center justify-center shadow-sm" style={{ borderColor: 'var(--brand-sky)' }}>
                  <span className="text-xl">{friend.ninni}</span>
                </div>
                <div>
                  <div className="font-medium" style={{ color: 'var(--brand-charcoal)' }}>{friend.name}</div>
                  <div className="text-sm text-gray-500">Level {friend.level}</div>
                </div>
              </div>
              <Link 
                to={`/friends/${friend.id}`}
                className="p-2 border-2 rounded-lg hover:opacity-80 transition-opacity"
                style={{ borderColor: 'var(--brand-coral)', backgroundColor: 'var(--brand-peach)' }}
              >
                <Eye size={20} style={{ color: 'var(--brand-coral)' }} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Interaction Area */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Interactions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="border-2 rounded-lg p-3 hover:opacity-80 transition-opacity" style={{ borderColor: 'var(--brand-coral)', backgroundColor: 'var(--brand-peach)' }}>
            <div className="text-2xl mb-1">👋</div>
            <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>Wave</div>
          </button>
          <button className="border-2 rounded-lg p-3 hover:opacity-80 transition-opacity" style={{ borderColor: 'var(--brand-sky)', backgroundColor: 'var(--brand-light-blue)' }}>
            <div className="text-2xl mb-1">🎁</div>
            <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>Send Gift</div>
          </button>
          <button className="border-2 rounded-lg p-3 hover:opacity-80 transition-opacity" style={{ borderColor: 'var(--brand-lavender)', backgroundColor: '#F0E8F8' }}>
            <div className="text-2xl mb-1">🏃</div>
            <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>Play Together</div>
          </button>
          <button className="border-2 rounded-lg p-3 hover:opacity-80 transition-opacity" style={{ borderColor: 'var(--brand-coral)', backgroundColor: 'var(--brand-peach)' }}>
            <div className="text-2xl mb-1">💬</div>
            <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>Chat</div>
          </button>
        </div>
      </div>
    </div>
  );
}