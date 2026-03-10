import { useState } from 'react';
import { Coins } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function Shop() {
  const { coins, setCoins, addToBag } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [message, setMessage] = useState('');

  const shopItems = [
    { id: 1, name: 'Apple', icon: '🍎', price: 50, category: 'food' },
    { id: 2, name: 'Carrot', icon: '🥕', price: 30, category: 'food' },
    { id: 3, name: 'Cake', icon: '🍰', price: 100, category: 'food' },
    { id: 4, name: 'Hat', icon: '🎩', price: 200, category: 'accessory' },
    { id: 5, name: 'Bow Tie', icon: '👔', price: 150, category: 'accessory' },
    { id: 6, name: 'Glasses', icon: '👓', price: 180, category: 'accessory' },
    { id: 7, name: 'Ball', icon: '⚽', price: 120, category: 'toy' },
    { id: 8, name: 'Teddy Bear', icon: '🧸', price: 150, category: 'toy' },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'food', label: 'Food' },
    { id: 'accessory', label: 'Accessories' },
    { id: 'toy', label: 'Toys' },
  ];

  const showMessage = (msg: string, isError: boolean = false) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleBuy = (item: typeof shopItems[0]) => {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      addToBag({
        id: item.id,
        name: item.name,
        icon: item.icon,
        count: 0,
        category: item.category as 'food' | 'accessory' | 'toy',
        price: item.price,
      });
      showMessage(`Bought ${item.name}! 🎉`);
    } else {
      showMessage('Not enough coins! 💰', true);
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

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

      {/* Currency Display */}
      <div className="border-2 rounded-lg p-4 bg-white flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <span className="text-gray-600">My Coins</span>
        <div className="flex items-center gap-2">
          <Coins size={24} style={{ color: 'var(--brand-coral)' }} />
          <span className="text-2xl font-medium" style={{ color: 'var(--brand-charcoal)' }}>{coins.toLocaleString()}</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="px-3 py-2 border-2 rounded-lg text-sm hover:opacity-90 transition-opacity"
              style={
                selectedCategory === category.id
                  ? { borderColor: 'var(--brand-coral)', backgroundColor: 'var(--brand-coral)', color: 'white' }
                  : { borderColor: 'var(--border)', backgroundColor: 'white', color: 'var(--brand-charcoal)' }
              }
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Shop Items */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Shop Items</h3>
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="border-2 rounded-lg p-4 hover:shadow-md transition-shadow"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="text-4xl mb-2 text-center">{item.icon}</div>
              <div className="text-center">
                <div className="text-sm font-medium mb-2" style={{ color: 'var(--brand-charcoal)' }}>{item.name}</div>
                <div className="flex items-center justify-center gap-1 text-gray-600 mb-3">
                  <Coins size={16} style={{ color: 'var(--brand-coral)' }} />
                  <span className="text-sm">{item.price}</span>
                </div>
                <button 
                  onClick={() => handleBuy(item)}
                  disabled={coins < item.price}
                  className="w-full py-2 text-white text-sm rounded-lg transition-opacity"
                  style={{ 
                    backgroundColor: coins < item.price ? 'var(--muted)' : 'var(--brand-coral)',
                    opacity: coins < item.price ? 0.5 : 1,
                    cursor: coins < item.price ? 'not-allowed' : 'pointer'
                  }}
                >
                  {coins < item.price ? 'Not Enough' : 'Buy'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Special Offers</h3>
        <div className="border-2 border-dashed rounded-lg p-4 text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--brand-peach)' }}>
          <div className="text-2xl mb-2">🎉</div>
          <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No special offers available</div>
        </div>
      </div>
    </div>
  );
}