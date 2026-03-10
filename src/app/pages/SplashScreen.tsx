import { useEffect, useState } from 'react';
import imgSplash1 from "figma:asset/f8045d96e84235dbd0bb853c701414114d47af5a.png";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Auto transition after 2.5 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onFinish();
      }, 500); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleGetStarted = () => {
    setFadeOut(true);
    setTimeout(() => {
      onFinish();
    }, 500);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ backgroundColor: 'white' }}
    >
      <div className="relative w-full max-w-md h-full flex flex-col items-center justify-center px-8">
        {/* Logo */}
        <div className="relative w-full max-w-[400px] h-[500px] mb-8 flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
            <img 
              alt="Nearness Logo" 
              className="w-full h-auto object-contain animate-pulse" 
              style={{ animationDuration: '2s' }}
              src={imgSplash1} 
            />
          </div>
        </div>

        {/* Get Started Button */}
        <button
          onClick={handleGetStarted}
          className="px-8 py-3 text-white rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
          style={{ 
            background: 'linear-gradient(135deg, var(--brand-coral) 0%, var(--brand-sky) 100%)',
            animationDelay: '1s',
            animationFillMode: 'both'
          }}
        >
          Get Started
        </button>

        {/* Subtitle */}
        <p 
          className="text-gray-500 text-sm mt-6 animate-fade-in"
          style={{ 
            animationDelay: '1.2s',
            animationFillMode: 'both'
          }}
        >
          Your companion is waiting for you
        </p>
      </div>
    </div>
  );
}
