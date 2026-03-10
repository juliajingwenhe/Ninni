import { ReactNode } from 'react';

interface IndoorBackgroundProps {
  children: ReactNode;
}

export default function IndoorBackground({ children }: IndoorBackgroundProps) {
  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
      {/* Wall Background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(to bottom, #F5E6D3 0%, #E8D4C0 100%)'
        }}
      />

      {/* Window */}
      <div 
        className="absolute border-4 rounded-lg overflow-hidden"
        style={{
          width: '120px',
          height: '100px',
          top: '15%',
          right: '10%',
          borderColor: '#8B6F47',
          backgroundColor: '#B8E6F5',
        }}
      >
        {/* Window panes */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1" style={{ backgroundColor: '#8B6F47' }} />
        <div className="absolute top-1/2 left-0 right-0 h-1" style={{ backgroundColor: '#8B6F47' }} />
        
        {/* Sun through window */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '24px',
            height: '24px',
            background: '#FFD66B',
            top: '15%',
            right: '15%',
            boxShadow: '0 0 20px rgba(255, 214, 107, 0.5)',
          }}
        />
        
        {/* Clouds through window */}
        <div className="absolute top-1/3 left-1/4 w-8 h-4 bg-white rounded-full opacity-70" />
      </div>

      {/* Picture frame on wall */}
      <div 
        className="absolute border-3 rounded"
        style={{
          width: '60px',
          height: '50px',
          top: '20%',
          left: '12%',
          borderWidth: '3px',
          borderColor: '#8B6F47',
          backgroundColor: '#D4A574',
        }}
      >
        {/* Simple art - heart */}
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          💗
        </div>
      </div>

      {/* Floor */}
      <div 
        className="absolute bottom-0 left-0 right-0"
        style={{ 
          height: '35%',
          background: 'linear-gradient(to bottom, #C9A57B 0%, #B89968 100%)',
        }}
      >
        {/* Floor planks */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0"
            style={{
              top: `${i * 20}%`,
              height: '2px',
              background: '#A68555',
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Rug on floor */}
      <div 
        className="absolute rounded-lg"
        style={{
          width: '60%',
          height: '20%',
          bottom: '10%',
          left: '20%',
          background: 'linear-gradient(135deg, var(--brand-coral) 0%, var(--brand-lavender) 100%)',
          opacity: 0.6,
        }}
      >
        {/* Rug pattern */}
        <div className="absolute inset-2 border-2 border-white opacity-40 rounded" />
      </div>

      {/* Plant pot */}
      <div className="absolute" style={{ bottom: '32%', left: '15%' }}>
        <Plant />
      </div>

      {/* Toy on floor */}
      <div className="absolute" style={{ bottom: '35%', right: '20%' }}>
        <div className="text-3xl">🎾</div>
      </div>

      {/* Food bowl */}
      <div className="absolute" style={{ bottom: '32%', left: '75%' }}>
        <div className="text-2xl">🥣</div>
      </div>

      {/* Children (Ninni) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// Plant Component
function Plant() {
  return (
    <div className="relative" style={{ width: 32, height: 40 }}>
      {/* Pot */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{
          width: '24px',
          height: '16px',
          background: '#D4754F',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
        }}
      />
      
      {/* Leaves */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: '16px',
              height: '20px',
              background: '#6BC4B0',
              borderRadius: '50% 0 50% 0',
              transform: `rotate(${i * 120 - 60}deg)`,
              transformOrigin: 'bottom center',
              left: '50%',
              marginLeft: '-8px',
            }}
          />
        ))}
      </div>
    </div>
  );
}
