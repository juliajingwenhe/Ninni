import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGame } from '../context/GameContext';
import { Sparkles } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const { setUserNickname, setNinniSettings, completeOnboarding } = useGame();
  
  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<'boy' | 'girl' | 'other'>('other');
  const [selectedColor, setSelectedColor] = useState('var(--brand-coral)');

  const colors = [
    { name: 'Coral Pink', value: 'var(--brand-coral)', gradient: 'linear-gradient(135deg, var(--brand-coral) 0%, #F49F9Fdd 100%)' },
    { name: 'Sky Blue', value: 'var(--brand-sky)', gradient: 'linear-gradient(135deg, var(--brand-sky) 0%, #8FB3D9dd 100%)' },
    { name: 'Lavender', value: 'var(--brand-lavender)', gradient: 'linear-gradient(135deg, var(--brand-lavender) 0%, #C8ACD6dd 100%)' },
    { name: 'Mint Green', value: '#7ED6C2', gradient: 'linear-gradient(135deg, #7ED6C2 0%, #7ED6C2dd 100%)' },
    { name: 'Sunny Yellow', value: '#FFD66B', gradient: 'linear-gradient(135deg, #FFD66B 0%, #FFD66Bdd 100%)' },
    { name: 'Peach', value: '#FFBF9B', gradient: 'linear-gradient(135deg, #FFBF9B 0%, #FFBF9Bdd 100%)' },
  ];

  const handleComplete = () => {
    if (nickname.trim() === '') {
      alert('Please enter a nickname!');
      return;
    }
    
    setUserNickname(nickname);
    setNinniSettings({ gender, color: selectedColor });
    completeOnboarding();
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, var(--brand-peach) 0%, var(--brand-light-blue) 100%)' }}>
      <div className="w-full max-w-md">
        {/* Welcome Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Sparkles size={48} style={{ color: 'var(--brand-coral)' }} />
            </div>
            <h1 className="text-2xl mb-2" style={{ color: 'var(--brand-charcoal)' }}>Welcome to Nearness!</h1>
            <p className="text-sm text-gray-500">Let's set up your profile and meet your Ninni</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="h-2 w-12 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: step >= s ? 'var(--brand-coral)' : 'var(--muted)',
                }}
              />
            ))}
          </div>

          {/* Step 1: Nickname */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--brand-charcoal)' }}>
                  Choose Your Nickname
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Enter your nickname"
                  maxLength={20}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--input-background)',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--brand-coral)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                />
                <p className="text-xs text-gray-500 mt-1">This is how friends will see you</p>
              </div>
              
              <button
                onClick={() => nickname.trim() && setStep(2)}
                disabled={!nickname.trim()}
                className="w-full py-3 rounded-lg text-white font-medium transition-opacity"
                style={{
                  backgroundColor: 'var(--brand-coral)',
                  opacity: nickname.trim() ? 1 : 0.5,
                  cursor: nickname.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Gender */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>
                  Choose Your Ninni's Gender
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'boy' as const, icon: '🧑', label: 'Boy' },
                    { value: 'girl' as const, icon: '👧', label: 'Girl' },
                    { value: 'other' as const, icon: '✨', label: 'Other' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setGender(option.value)}
                      className="p-4 border-2 rounded-lg transition-all duration-300"
                      style={{
                        borderColor: gender === option.value ? 'var(--brand-coral)' : 'var(--border)',
                        backgroundColor: gender === option.value ? 'var(--brand-peach)' : 'white',
                      }}
                    >
                      <div className="text-3xl mb-1">{option.icon}</div>
                      <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 border-2 rounded-lg font-medium transition-opacity hover:opacity-80"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--brand-charcoal)',
                  }}
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: 'var(--brand-coral)' }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Color */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>
                  Choose Your Ninni's Color
                </label>
                
                {/* Preview Ninni */}
                <div className="flex justify-center mb-4">
                  <div
                    className="rounded-full shadow-xl transition-all duration-500 flex items-center justify-center"
                    style={{
                      width: 100,
                      height: 100,
                      background: colors.find(c => c.value === selectedColor)?.gradient,
                    }}
                  >
                    <div className="text-2xl">^_^</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className="p-3 border-2 rounded-lg transition-all duration-300"
                      style={{
                        borderColor: selectedColor === color.value ? 'var(--brand-coral)' : 'var(--border)',
                        backgroundColor: selectedColor === color.value ? 'var(--brand-peach)' : 'white',
                      }}
                    >
                      <div
                        className="w-full h-12 rounded-lg mb-2"
                        style={{ background: color.gradient }}
                      />
                      <div className="text-xs font-medium text-center" style={{ color: 'var(--brand-charcoal)' }}>
                        {color.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-3 border-2 rounded-lg font-medium transition-opacity hover:opacity-80"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--brand-charcoal)',
                  }}
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90 flex items-center justify-center gap-2"
                  style={{ backgroundColor: 'var(--brand-coral)' }}
                >
                  <Sparkles size={20} />
                  Start Journey!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}