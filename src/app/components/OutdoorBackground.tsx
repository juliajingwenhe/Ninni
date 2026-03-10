import { ReactNode } from 'react';

interface OutdoorBackgroundProps {
  children: ReactNode;
}

export default function OutdoorBackground({ children }: OutdoorBackgroundProps) {
  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
      {/* Sky Background */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'linear-gradient(to bottom, var(--brand-light-blue) 0%, var(--brand-peach) 100%)'
        }}
      />

      {/* Sun */}
      <div 
        className="absolute rounded-full shadow-lg"
        style={{
          width: '60px',
          height: '60px',
          background: 'linear-gradient(135deg, #FFD66B 0%, #FFC947 100%)',
          top: '15%',
          right: '10%',
        }}
      >
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-yellow-300 rounded-full"
            style={{
              width: '4px',
              height: '12px',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-32px)`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Clouds */}
      <div className="absolute" style={{ top: '12%', left: '8%' }}>
        <Cloud size="small" />
      </div>
      <div className="absolute" style={{ top: '25%', right: '15%' }}>
        <Cloud size="medium" />
      </div>
      <div className="absolute" style={{ top: '18%', left: '60%' }}>
        <Cloud size="small" />
      </div>

      {/* Grass Ground */}
      <div 
        className="absolute bottom-0 left-0 right-0"
        style={{ 
          height: '35%',
          background: 'linear-gradient(to bottom, #7ED6C2 0%, #6BC4B0 100%)',
        }}
      >
        {/* Grass blades decoration */}
        <div className="relative w-full h-full">
          {/* Small grass tufts */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0"
              style={{
                left: `${(i * 8.5) + 2}%`,
                width: '8px',
                height: '12px',
                background: '#5AB5A3',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>

      {/* Flowers */}
      <div className="absolute" style={{ bottom: '32%', left: '12%' }}>
        <Flower color="var(--brand-coral)" />
      </div>
      <div className="absolute" style={{ bottom: '35%', right: '18%' }}>
        <Flower color="var(--brand-lavender)" />
      </div>
      <div className="absolute" style={{ bottom: '30%', left: '75%' }}>
        <Flower color="#FFD66B" />
      </div>

      {/* Children (Ninni) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>

      {/* Optional decorative stars */}
      <div className="absolute" style={{ top: '8%', left: '15%' }}>
        <Star />
      </div>
      <div className="absolute" style={{ top: '35%', left: '8%' }}>
        <Star />
      </div>
    </div>
  );
}

// Cloud Component
function Cloud({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizes = {
    small: { width: 40, height: 24 },
    medium: { width: 55, height: 32 },
    large: { width: 70, height: 40 },
  };

  const { width, height } = sizes[size];

  return (
    <div className="relative" style={{ width, height }}>
      {/* Main cloud body */}
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: width * 0.6,
          height: height * 0.7,
          left: '20%',
          top: '30%',
          opacity: 0.9,
        }}
      />
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: width * 0.5,
          height: height * 0.6,
          left: '0%',
          top: '40%',
          opacity: 0.85,
        }}
      />
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: width * 0.5,
          height: height * 0.65,
          right: '0%',
          top: '35%',
          opacity: 0.87,
        }}
      />
    </div>
  );
}

// Flower Component
function Flower({ color }: { color: string }) {
  return (
    <div className="relative" style={{ width: 24, height: 32 }}>
      {/* Stem */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 rounded-full"
        style={{
          width: '3px',
          height: '18px',
          background: '#5AB5A3',
        }}
      />
      {/* Flower petals */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: '8px',
              height: '8px',
              background: color,
              transform: `rotate(${i * 72}deg) translateY(-6px)`,
              left: '50%',
              top: '50%',
              marginLeft: '-4px',
              marginTop: '-4px',
            }}
          />
        ))}
        {/* Center */}
        <div
          className="absolute rounded-full"
          style={{
            width: '6px',
            height: '6px',
            background: '#FFD66B',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    </div>
  );
}

// Star Component
function Star() {
  return (
    <div className="relative" style={{ width: 12, height: 12 }}>
      <div
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          background: 'white',
          opacity: 0.8,
        }}
      />
    </div>
  );
}
