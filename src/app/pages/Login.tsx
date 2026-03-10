import image_a07c2d1ea6196b72eae87ec6d25b0dd06ac30e49 from 'figma:asset/a07c2d1ea6196b72eae87ec6d25b0dd06ac30e49.png'
import image_7f7fbccd4e22b8296b9df068deb52329baef6233 from 'figma:asset/7f7fbccd4e22b8296b9df068deb52329baef6233.png'
import image_7ee82aaf025f4421aca2c0031ca11907ddca7f26 from 'figma:asset/7ee82aaf025f4421aca2c0031ca11907ddca7f26.png'
import image_347f84b452252265801cd4ca4715fac1c2cc7434 from 'figma:asset/347f84b452252265801cd4ca4715fac1c2cc7434.png'
import image_087b8af5bc7217d6969772884e7efa42a82b56c6 from 'figma:asset/087b8af5bc7217d6969772884e7efa42a82b56c6.png'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, Lock, Mail } from 'lucide-react';
import logoColor from 'figma:asset/abe347da1561f7ce576a2afbeb1746a5572a1b32.png';
import { useGame } from '../context/GameContext';

export default function Login() {
  const navigate = useNavigate();
  const { hasCompletedOnboarding } = useGame();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Existing users go directly to home
    navigate('/home');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // New users go to onboarding
    navigate('/onboarding');
  };

  const handleGuestLogin = () => {
    // Check if onboarding completed
    if (hasCompletedOnboarding) {
      navigate('/home');
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 pt-12">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Title */}
        <div className="text-center">
          <img src={image_a07c2d1ea6196b72eae87ec6d25b0dd06ac30e49} alt="Nearness Logo" className="w-32 h-32 mx-auto mb-2" />
          <h1 className="text-3xl font-medium mb-2" style={{ color: 'var(--brand-charcoal)' }}>Nearness</h1>
          <p className="text-gray-500">Your virtual Ninni companion</p>
        </div>

        {/* Login/Sign Up Form */}
        <div className="border-2 border-gray-300 rounded-lg p-6 bg-white">
          <div className="flex border-2 border-gray-300 rounded-lg mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-sm font-medium transition-colors rounded-l-md ${
                !isSignUp 
                  ? 'text-white' 
                  : 'bg-white hover:bg-gray-50'
              }`}
              style={!isSignUp ? { backgroundColor: 'var(--brand-coral)' } : { color: 'var(--muted-foreground)' }}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-sm font-medium transition-colors rounded-r-md ${
                isSignUp 
                  ? 'text-white' 
                  : 'bg-white hover:bg-gray-50'
              }`}
              style={isSignUp ? { backgroundColor: 'var(--brand-coral)' } : { color: 'var(--muted-foreground)' }}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Choose a username"
                    className="w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                    style={{ 
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--input-background)'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--brand-coral)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{ 
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--input-background)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--brand-coral)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                  style={{ 
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--input-background)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = 'var(--brand-coral)'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                  required
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:outline-none transition-colors"
                    style={{ 
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--input-background)'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--brand-coral)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                    required
                  />
                </div>
              </div>
            )}

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded" 
                    style={{ accentColor: 'var(--brand-coral)' }}
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button 
                  type="button" 
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--brand-coral)' }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: 'var(--brand-coral)' }}
            >
              {isSignUp ? 'Create Account' : 'Login'}
            </button>
          </form>
        </div>

        {/* Guest Login */}
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
          <button
            onClick={handleGuestLogin}
            className="w-full py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 font-medium"
          >
            Continue as Guest
          </button>
        </div>

        {/* Features Preview */}
        <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Features</h3>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-2xl mb-1">🎨</div>
              <div className="text-xs text-gray-600">Customize Ninni</div>
            </div>
            <div>
              <div className="text-2xl mb-1">👥</div>
              <div className="text-xs text-gray-600">Make Friends</div>
            </div>
            <div>
              <div className="text-2xl mb-1">📖</div>
              <div className="text-xs text-gray-600">Keep Journal</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}