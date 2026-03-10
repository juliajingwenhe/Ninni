import { useGame } from '../context/GameContext';

interface NinniProps {
  size?: number;
  customColor?: string;
}

export default function Ninni({ size = 120, customColor }: NinniProps) {
  const { petStats, ninniSettings } = useGame();

  // Use custom color if provided, otherwise use settings
  const baseColor = customColor || ninniSettings.color;

  // Color to gradient mapping
  const colorGradients: Record<string, string> = {
    'var(--brand-coral)': 'linear-gradient(135deg, var(--brand-coral) 0%, #F49F9Fdd 100%)',
    'var(--brand-sky)': 'linear-gradient(135deg, var(--brand-sky) 0%, #8FB3D9dd 100%)',
    'var(--brand-lavender)': 'linear-gradient(135deg, var(--brand-lavender) 0%, #C8ACD6dd 100%)',
    '#7ED6C2': 'linear-gradient(135deg, #7ED6C2 0%, #7ED6C2dd 100%)',
    '#FFD66B': 'linear-gradient(135deg, #FFD66B 0%, #FFD66Bdd 100%)',
    '#FFBF9B': 'linear-gradient(135deg, #FFBF9B 0%, #FFBF9Bdd 100%)',
  };

  // Get the gradient for the base color
  const getColorGradient = (color: string) => {
    return colorGradients[color] || `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;
  };

  // Determine Ninni's mood based on stats
  const getMood = () => {
    if (petStats.happiness > 70 && petStats.hunger > 60 && petStats.cleanliness > 70) {
      return 'happy';
    } else if (petStats.hunger < 30) {
      return 'hungry';
    } else if (petStats.cleanliness < 30) {
      return 'dirty';
    } else if (petStats.happiness < 30) {
      return 'sad';
    }
    return 'neutral';
  };

  const mood = getMood();

  // Ninni's expressions
  const expressions = {
    happy: { eyes: '^_^', mouth: '‿', color: baseColor },
    neutral: { eyes: '•_•', mouth: '—', color: baseColor },
    hungry: { eyes: 'o_o', mouth: '○', color: 'var(--brand-lavender)' },
    sad: { eyes: 'T_T', mouth: '︵', color: '#A8A8A8' },
    dirty: { eyes: '@_@', mouth: '~', color: '#B8B8B8' },
  };

  const { eyes, mouth, color } = expressions[mood];

  return (
    <div 
      className="relative rounded-full shadow-xl transition-all duration-500 flex items-center justify-center"
      style={{ 
        width: size, 
        height: size,
        background: getColorGradient(color),
        animation: mood === 'happy' ? 'bounce 1s ease-in-out infinite' : 'float 3s ease-in-out infinite'
      }}
    >
      {/* Shine effect */}
      <div 
        className="absolute rounded-full"
        style={{
          top: '15%',
          left: '20%',
          width: '30%',
          height: '30%',
          background: 'rgba(255, 255, 255, 0.4)',
          filter: 'blur(10px)',
        }}
      />

      {/* Face */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2">
        {/* Eyes */}
        <div 
          className="text-2xl font-bold transition-all duration-300"
          style={{ 
            color: 'rgba(0, 0, 0, 0.7)',
            fontFamily: 'monospace',
            letterSpacing: '0.1em'
          }}
        >
          {eyes}
        </div>

        {/* Mouth */}
        <div 
          className="text-xl transition-all duration-300"
          style={{ 
            color: 'rgba(0, 0, 0, 0.6)',
            marginTop: '-4px'
          }}
        >
          {mouth}
        </div>
      </div>

      {/* Cheeks (only when happy) */}
      {mood === 'happy' && (
        <>
          <div 
            className="absolute rounded-full"
            style={{
              width: '20%',
              height: '15%',
              background: 'rgba(255, 182, 193, 0.5)',
              left: '10%',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
          <div 
            className="absolute rounded-full"
            style={{
              width: '20%',
              height: '15%',
              background: 'rgba(255, 182, 193, 0.5)',
              right: '10%',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        </>
      )}

      {/* Dirt spots (when dirty) */}
      {mood === 'dirty' && (
        <>
          <div className="absolute w-2 h-2 rounded-full bg-gray-600 opacity-50" style={{ top: '30%', left: '25%' }} />
          <div className="absolute w-3 h-3 rounded-full bg-gray-600 opacity-50" style={{ bottom: '25%', right: '30%' }} />
          <div className="absolute w-2 h-2 rounded-full bg-gray-600 opacity-50" style={{ top: '60%', left: '70%' }} />
        </>
      )}
    </div>
  );
}