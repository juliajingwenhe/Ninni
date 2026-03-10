import { useGame } from '../context/GameContext';

export default function Bag() {
  const { bagItems } = useGame();

  const foodItems = bagItems.filter(item => item.category === 'food');
  const accessoryItems = bagItems.filter(item => item.category === 'accessory');
  const toyItems = bagItems.filter(item => item.category === 'toy');

  const totalItems = bagItems.reduce((sum, item) => sum + item.count, 0);
  const maxCapacity = 50;

  return (
    <div className="p-4 space-y-4">
      {/* Food Section */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Food</h3>
        {foodItems.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {foodItems.map((item) => (
              <div 
                key={item.id}
                className="border-2 rounded-lg p-3 relative hover:shadow-md transition-shadow"
                style={{ borderColor: 'var(--brand-coral)', backgroundColor: 'var(--brand-peach)' }}
              >
                <div className="absolute top-1 right-1 text-white text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--brand-coral)' }}>
                  x{item.count}
                </div>
                <div className="text-3xl mb-2 text-center">{item.icon}</div>
                <div className="text-xs text-center" style={{ color: 'var(--brand-charcoal)' }}>{item.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
            <div className="text-2xl mb-2">🍎</div>
            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No food items</div>
          </div>
        )}
      </div>

      {/* Accessories Section */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Accessories</h3>
        {accessoryItems.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {accessoryItems.map((item) => (
              <div 
                key={item.id}
                className="border-2 rounded-lg p-3 relative hover:shadow-md transition-shadow"
                style={{ borderColor: 'var(--brand-sky)', backgroundColor: 'var(--brand-light-blue)' }}
              >
                <div className="absolute top-1 right-1 text-white text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--brand-sky)' }}>
                  x{item.count}
                </div>
                <div className="text-3xl mb-2 text-center">{item.icon}</div>
                <div className="text-xs text-center" style={{ color: 'var(--brand-charcoal)' }}>{item.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
            <div className="text-2xl mb-2">👔</div>
            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No accessories</div>
          </div>
        )}
      </div>

      {/* Toys Section */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Toys</h3>
        {toyItems.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {toyItems.map((item) => (
              <div 
                key={item.id}
                className="border-2 rounded-lg p-3 relative hover:shadow-md transition-shadow"
                style={{ borderColor: 'var(--brand-lavender)', backgroundColor: '#F0E8F8' }}
              >
                <div className="absolute top-1 right-1 text-white text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--brand-lavender)' }}>
                  x{item.count}
                </div>
                <div className="text-3xl mb-2 text-center">{item.icon}</div>
                <div className="text-xs text-center" style={{ color: 'var(--brand-charcoal)' }}>{item.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
            <div className="text-2xl mb-2">🧸</div>
            <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No toys</div>
          </div>
        )}
      </div>

      {/* Bag Stats */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Bag Capacity</span>
          <span className="font-medium" style={{ color: 'var(--brand-charcoal)' }}>{totalItems} / {maxCapacity}</span>
        </div>
        <div className="mt-2 h-2 rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
          <div 
            className="h-2 rounded-full transition-all duration-300" 
            style={{ 
              width: `${(totalItems / maxCapacity) * 100}%`, 
              backgroundColor: totalItems > maxCapacity * 0.8 ? 'var(--brand-coral)' : 'var(--brand-sky)' 
            }}
          ></div>
        </div>
      </div>

      {/* Empty State Example */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Special Items</h3>
        <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
          <div className="text-2xl mb-2">📦</div>
          <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No special items</div>
        </div>
      </div>
    </div>
  );
}