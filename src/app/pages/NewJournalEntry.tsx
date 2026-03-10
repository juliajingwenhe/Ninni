import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Save } from 'lucide-react';
import { useGame } from '../context/GameContext';

export default function NewJournalEntry() {
  const navigate = useNavigate();
  const { addJournalEntry } = useGame();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | 'excited' | 'tired'>('happy');

  const moods = [
    { value: 'happy' as const, emoji: '😊', label: 'Happy', color: 'var(--brand-coral)' },
    { value: 'excited' as const, emoji: '🤩', label: 'Excited', color: '#FFD66B' },
    { value: 'neutral' as const, emoji: '😌', label: 'Calm', color: 'var(--brand-sky)' },
    { value: 'tired' as const, emoji: '😴', label: 'Tired', color: 'var(--brand-lavender)' },
    { value: 'sad' as const, emoji: '😢', label: 'Sad', color: '#A8A8A8' },
  ];

  const handleSave = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Please fill in both title and content!');
      return;
    }

    addJournalEntry({
      title: title.trim(),
      content: content.trim(),
      mood: selectedMood,
    });

    navigate('/journal');
  };

  return (
    <div className="p-4 space-y-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 border-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{ borderColor: 'var(--border)' }}
          >
            <ArrowLeft size={20} style={{ color: 'var(--brand-charcoal)' }} />
          </button>
          <h1 style={{ color: 'var(--brand-charcoal)' }}>New Journal Entry</h1>
        </div>
        
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg text-white flex items-center gap-2 transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--brand-coral)' }}
        >
          <Save size={18} />
          Save
        </button>
      </div>

      {/* Mood Selection */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <label className="block text-sm font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>
          How are you feeling?
        </label>
        <div className="grid grid-cols-5 gap-2">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className="p-3 border-2 rounded-lg transition-all duration-300 flex flex-col items-center gap-1"
              style={{
                borderColor: selectedMood === mood.value ? mood.color : 'var(--border)',
                backgroundColor: selectedMood === mood.value ? `${mood.color}20` : 'white',
              }}
            >
              <div className="text-2xl">{mood.emoji}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--brand-charcoal)' }}>
                {mood.label}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Title Input */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--brand-charcoal)' }}>
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your entry a title..."
          maxLength={50}
          className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--input-background)',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--brand-coral)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        />
        <p className="text-xs text-gray-500 mt-1">{title.length}/50 characters</p>
      </div>

      {/* Content Input */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--brand-charcoal)' }}>
          What's on your mind?
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write about your day with Ninni, your feelings, or anything else..."
          rows={12}
          maxLength={1000}
          className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none transition-colors resize-none"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--input-background)',
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--brand-coral)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        />
        <p className="text-xs text-gray-500 mt-1">{content.length}/1000 characters</p>
      </div>

      {/* Tips */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--brand-charcoal)' }}>💡 Journal Tips</p>
        <ul className="text-sm text-gray-600 space-y-1 ml-4">
          <li>• Write about special moments with your Ninni</li>
          <li>• Record milestones and achievements</li>
          <li>• Express your thoughts and feelings freely</li>
          <li>• Look back on memories anytime!</li>
        </ul>
      </div>
    </div>
  );
}
