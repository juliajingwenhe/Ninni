import { Plus, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useGame } from '../context/GameContext';

export default function Journal() {
  const navigate = useNavigate();
  const { journalEntries } = useGame();

  const moodColors: Record<string, { border: string; bg: string }> = {
    happy: { border: 'var(--brand-coral)', bg: 'var(--brand-peach)' },
    excited: { border: '#FFD66B', bg: '#FFF9E6' },
    neutral: { border: 'var(--brand-sky)', bg: 'var(--brand-light-blue)' },
    tired: { border: 'var(--brand-lavender)', bg: '#F0E8F8' },
    sad: { border: '#A8A8A8', bg: '#F5F5F5' },
  };

  const moodEmojis: Record<string, string> = {
    happy: '😊',
    excited: '🤩',
    neutral: '😌',
    tired: '😴',
    sad: '😢',
  };

  return (
    <div className="p-4 space-y-4">
      {/* Add Entry Button */}
      <button 
        onClick={() => navigate('/journal/new')}
        className="w-full border-2 rounded-lg p-4 bg-white hover:opacity-90 flex items-center justify-center gap-2 transition-opacity" 
        style={{ borderColor: 'var(--brand-coral)', backgroundColor: 'var(--brand-peach)' }}
      >
        <Plus size={20} style={{ color: 'var(--brand-coral)' }} />
        <span style={{ color: 'var(--brand-charcoal)' }}>New Entry</span>
      </button>

      {/* Journal Entries */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>My Journal</h3>
        
        {journalEntries.length === 0 ? (
          <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
            <div className="text-4xl mb-2">✍️</div>
            <div className="text-sm font-medium mb-1" style={{ color: 'var(--brand-charcoal)' }}>No entries yet</div>
            <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Start writing your journey with Ninni!</div>
          </div>
        ) : (
          <div className="space-y-3">
            {journalEntries.map((entry) => {
              const colors = moodColors[entry.mood] || moodColors.neutral;
              return (
                <div 
                  key={entry.id}
                  className="border-2 rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
                  style={{ 
                    borderColor: colors.border,
                    backgroundColor: colors.bg
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl mt-1">{moodEmojis[entry.mood]}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium" style={{ color: 'var(--brand-charcoal)' }}>{entry.title}</h4>
                        <span className="text-xs text-gray-500">{entry.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{entry.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Memories Section */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Memories</h3>
        <div className="border-2 border-dashed rounded-lg p-6 text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
          <div className="text-2xl mb-2">📸</div>
          <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>No photos added yet</div>
        </div>
      </div>
    </div>
  );
}