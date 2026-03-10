import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Heart, Sparkles } from 'lucide-react';
import Ninni from '../components/Ninni';

export default function FriendDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock friend data - using Ninni instead of pet emojis
  const friends: Record<string, any> = {
    '1': { id: 1, name: 'Alex', ninniName: 'Buddy', level: 5, nearness: 65, happiness: 75, hunger: 80, cleanliness: 90 },
    '2': { id: 2, name: 'Sarah', ninniName: 'Whiskers', level: 8, nearness: 82, happiness: 90, hunger: 70, cleanliness: 85 },
    '3': { id: 3, name: 'Mike', ninniName: 'Fluffy', level: 3, nearness: 45, happiness: 60, hunger: 50, cleanliness: 65 },
  };

  const friend = friends[id || '1'];
  const [nearness, setNearness] = useState(friend?.nearness || 0);
  const [petCount, setPetCount] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [todayVisited, setTodayVisited] = useState(false);

  const handlePetAction = () => {
    if (petCount < 3) {
      setNearness(prev => Math.min(prev + 5, 100));
      setPetCount(prev => prev + 1);
      setShowAnimation(true);
      
      if (!todayVisited) {
        setTodayVisited(true);
      }
      
      setTimeout(() => setShowAnimation(false), 1000);
    }
  };

  if (!friend) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-500">Friend not found</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 border-2 rounded-lg hover:opacity-80 transition-opacity"
          style={{ borderColor: 'var(--border)' }}
        >
          <ArrowLeft size={20} style={{ color: 'var(--brand-charcoal)' }} />
        </button>
        <h1 style={{ color: 'var(--brand-charcoal)' }}>{friend.name}'s Ninni</h1>
      </div>

      {/* Ninni Display */}
      <div className="border-2 rounded-lg p-6 bg-white" style={{ borderColor: 'var(--border)' }}>
        <div className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center relative" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
          {showAnimation && (
            <div className="absolute inset-0 flex items-center justify-center z-10 animate-ping">
              <Heart size={40} style={{ color: 'var(--brand-coral)' }} />
            </div>
          )}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Ninni size={120} />
            </div>
            <p className="font-medium" style={{ color: 'var(--brand-charcoal)' }}>{friend.ninniName}</p>
            <p className="text-sm text-gray-500 mt-1">Level {friend.level}</p>
          </div>
        </div>
      </div>

      {/* Pet Button */}
      <button
        onClick={handlePetAction}
        disabled={petCount >= 3}
        className="w-full py-4 border-2 rounded-lg text-white text-lg transition-all duration-300"
        style={{
          borderColor: petCount >= 3 ? 'var(--muted)' : 'var(--brand-coral)',
          backgroundColor: petCount >= 3 ? 'var(--muted)' : 'var(--brand-coral)',
          opacity: petCount >= 3 ? 0.5 : 1,
          cursor: petCount >= 3 ? 'not-allowed' : 'pointer',
          transform: showAnimation ? 'scale(0.95)' : 'scale(1)',
        }}
      >
        {petCount >= 3 ? `Come back tomorrow (${petCount}/3)` : `Pet ${friend.ninniName} (${petCount}/3)`}
      </button>

      {/* Nearness Progress */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Heart size={20} style={{ color: 'var(--brand-coral)' }} />
            <span className="font-medium" style={{ color: 'var(--brand-charcoal)' }}>Nearness</span>
          </div>
          <span className="text-sm text-gray-500">{nearness}/100</span>
        </div>
        <div className="h-3 rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
          <div 
            className="h-3 rounded-full transition-all duration-500"
            style={{ 
              width: `${nearness}%`,
              background: 'linear-gradient(90deg, var(--brand-coral) 0%, var(--brand-sky) 100%)'
            }}
          ></div>
        </div>
      </div>

      {/* Ninni Info */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>{friend.ninniName}'s Status</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--brand-peach)' }}>
            <div className="text-2xl mb-1">😊</div>
            <div className="text-xs text-gray-600">Happiness</div>
            <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>{friend.happiness}%</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--brand-light-blue)' }}>
            <div className="text-2xl mb-1">🍽️</div>
            <div className="text-xs text-gray-600">Hunger</div>
            <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>{friend.hunger}%</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#F0E8F8' }}>
            <div className="text-2xl mb-1">✨</div>
            <div className="text-xs text-gray-600">Clean</div>
            <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>{friend.cleanliness}%</div>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Recent Activity</h3>
        <div className="space-y-2">
          {todayVisited && (
            <div className="flex items-center gap-2 text-sm text-gray-600 p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
              <Sparkles size={16} style={{ color: 'var(--brand-coral)' }} />
              <span>You visited today!</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600 p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
            <span className="text-lg">🎮</span>
            <span>Played with a toy - 2 hours ago</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 p-2 rounded" style={{ backgroundColor: 'var(--muted)' }}>
            <span className="text-lg">🍎</span>
            <span>Had a snack - 5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}