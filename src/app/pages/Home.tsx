import { useState } from 'react';
import { Heart, Utensils, Sparkles, ChevronDown, MapPin } from 'lucide-react';
import { useGame } from '../context/GameContext';
import Ninni from '../components/Ninni';
import Playground from '../components/Playground';
import IndoorBackground from '../components/IndoorBackground';
import OutdoorBackground from '../components/OutdoorBackground';

export default function Home() {
  const { coins, petStats, feedPet, playWithPet, cleanPet, bagItems } = useGame();
  const [showFoodMenu, setShowFoodMenu] = useState(false);
  const [message, setMessage] = useState('');
  const [isOutdoor, setIsOutdoor] = useState(false);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleFeed = (itemId: number) => {
    const success = feedPet(itemId);
    if (success) {
      showMessage('Yummy! Ninni loved it! 🍎');
    } else {
      showMessage('No food available!');
    }
    setShowFoodMenu(false);
  };

  const handlePlay = () => {
    playWithPet();
    showMessage('Had so much fun playing! 🎮');
  };

  const handleClean = () => {
    cleanPet();
    showMessage('Feeling fresh and clean! 🛁');
  };

  const toggleLocation = () => {
    setIsOutdoor(!isOutdoor);
    showMessage(isOutdoor ? 'Welcome home! 🏠' : 'Going outside! 🌳');
  };

  const foodItems = bagItems.filter(item => item.category === 'food');

  return (
    <div className="p-4 space-y-4">
      {/* Message Toast */}
      {message && (
        <div 
          className="fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce"
          style={{ backgroundColor: 'var(--brand-coral)', color: 'white' }}
        >
          {message}
        </div>
      )}

      {/* Ninni Display Area */}
      <div className="rounded-lg overflow-hidden">
        {isOutdoor ? (
          <OutdoorBackground>
            <div className="text-center">
              <Ninni size={140} />
            </div>
          </OutdoorBackground>
        ) : (
          <IndoorBackground>
            <div className="text-center">
              <Ninni size={140} />
            </div>
          </IndoorBackground>
        )}
        
        {/* Info below playground */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex-1 text-center">
            <p className="text-gray-600 font-medium">{isOutdoor ? 'Outside Adventure' : 'Cozy Home'}</p>
            <p className="text-sm mt-1" style={{ color: 'var(--brand-coral)' }}>Level {petStats.level}</p>
          </div>
          
          {/* Location Toggle Button */}
          <button
            onClick={toggleLocation}
            className="border-2 rounded-lg px-4 py-2 hover:opacity-80 transition-opacity flex items-center gap-2"
            style={{ 
              borderColor: isOutdoor ? 'var(--brand-sky)' : 'var(--brand-coral)',
              backgroundColor: isOutdoor ? 'var(--brand-light-blue)' : 'var(--brand-peach)'
            }}
          >
            <MapPin size={16} />
            <span className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>
              {isOutdoor ? 'Go Home' : 'Go Out'}
            </span>
          </button>
        </div>
      </div>

      {/* Ninni Stats */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-sm font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Ninni Status</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Heart size={20} style={{ color: 'var(--brand-coral)' }} />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Happiness</span>
                <span className="text-sm text-gray-500">{petStats.happiness}/100</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
                <div className="h-2 rounded-full transition-all duration-300" style={{ width: `${petStats.happiness}%`, backgroundColor: 'var(--brand-coral)' }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Utensils size={20} style={{ color: 'var(--brand-sky)' }} />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Hunger</span>
                <span className="text-sm text-gray-500">{petStats.hunger}/100</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
                <div className="h-2 rounded-full transition-all duration-300" style={{ width: `${petStats.hunger}%`, backgroundColor: 'var(--brand-sky)' }}></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Sparkles size={20} style={{ color: 'var(--brand-lavender)' }} />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Cleanliness</span>
                <span className="text-sm text-gray-500">{petStats.cleanliness}/100</span>
              </div>
              <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
                <div className="h-2 rounded-full transition-all duration-300" style={{ width: `${petStats.cleanliness}%`, backgroundColor: 'var(--brand-lavender)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <div className="relative">
          <button 
            onClick={() => setShowFoodMenu(!showFoodMenu)}
            className="w-full border-2 rounded-lg p-4 bg-white hover:opacity-80 transition-opacity"
            style={{ borderColor: 'var(--brand-coral)', backgroundColor: 'var(--brand-peach)' }}
          >
            <div className="text-2xl mb-2">🍎</div>
            <div className="text-sm font-medium flex items-center justify-center gap-1" style={{ color: 'var(--brand-charcoal)' }}>
              Feed
              <ChevronDown size={14} />
            </div>
          </button>
          
          {/* Food Menu Dropdown */}
          {showFoodMenu && (
            <div className="absolute top-full left-0 right-0 mt-2 border-2 rounded-lg bg-white shadow-lg z-10 overflow-hidden" style={{ borderColor: 'var(--brand-coral)' }}>
              {foodItems.length > 0 ? (
                foodItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleFeed(item.id)}
                    className="w-full p-3 hover:bg-gray-50 flex items-center justify-between border-b last:border-b-0"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">x{item.count}</span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-sm text-gray-500">
                  No food available
                </div>
              )}
            </div>
          )}
        </div>

        <button 
          onClick={handlePlay}
          className="border-2 rounded-lg p-4 bg-white hover:opacity-80 transition-opacity"
          style={{ borderColor: 'var(--brand-sky)', backgroundColor: 'var(--brand-light-blue)' }}
        >
          <div className="text-2xl mb-2">🎮</div>
          <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>Play</div>
        </button>

        <button 
          onClick={handleClean}
          className="border-2 rounded-lg p-4 bg-white hover:opacity-80 transition-opacity"
          style={{ borderColor: 'var(--brand-lavender)', backgroundColor: '#F0E8F8' }}
        >
          <div className="text-2xl mb-2">🛁</div>
          <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>Clean</div>
        </button>
      </div>

      {/* Virtual Currency Display */}
      <div className="border-2 rounded-lg p-4 bg-white flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <span className="text-gray-600">Coins</span>
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <span className="text-xl font-medium" style={{ color: 'var(--brand-charcoal)' }}>{coins.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}