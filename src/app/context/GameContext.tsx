import { createContext, useContext, useState, ReactNode } from 'react';

interface BagItem {
  id: number;
  name: string;
  icon: string;
  count: number;
  category: 'food' | 'accessory' | 'toy';
  price: number;
}

interface PetStats {
  happiness: number;
  hunger: number;
  cleanliness: number;
  level: number;
  experience: number;
}

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad' | 'excited' | 'tired';
  date: string;
}

interface NinniSettings {
  gender: 'boy' | 'girl' | 'other';
  color: string;
}

interface GameContextType {
  coins: number;
  setCoins: (coins: number) => void;
  bagItems: BagItem[];
  addToBag: (item: BagItem) => void;
  removeFromBag: (itemId: number, amount?: number) => void;
  petStats: PetStats;
  updatePetStats: (stats: Partial<PetStats>) => void;
  feedPet: (itemId: number) => boolean;
  playWithPet: () => void;
  cleanPet: () => void;
  userNickname: string;
  setUserNickname: (name: string) => void;
  ninniSettings: NinniSettings;
  setNinniSettings: (settings: NinniSettings) => void;
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [coins, setCoins] = useState(500); // Starting coins
  const [userNickname, setUserNickname] = useState('');
  const [ninniSettings, setNinniSettings] = useState<NinniSettings>({
    gender: 'other',
    color: 'var(--brand-coral)',
  });
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  
  // Initial bag with starter food items
  const [bagItems, setBagItems] = useState<BagItem[]>([
    { id: 1, name: 'Apple', icon: '🍎', count: 3, category: 'food', price: 50 },
    { id: 2, name: 'Carrot', icon: '🥕', count: 5, category: 'food', price: 30 },
  ]);

  const [petStats, setPetStats] = useState<PetStats>({
    happiness: 80,
    hunger: 60,
    cleanliness: 90,
    level: 1,
    experience: 0,
  });

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
    };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  const addToBag = (item: BagItem) => {
    setBagItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, count: i.count + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, count: 1 }];
      }
    });
  };

  const removeFromBag = (itemId: number, amount: number = 1) => {
    setBagItems(prevItems => {
      return prevItems
        .map(item =>
          item.id === itemId
            ? { ...item, count: item.count - amount }
            : item
        )
        .filter(item => item.count > 0);
    });
  };

  const updatePetStats = (stats: Partial<PetStats>) => {
    setPetStats(prev => {
      const newStats = { ...prev, ...stats };
      
      // Cap stats at 100
      newStats.happiness = Math.min(100, Math.max(0, newStats.happiness));
      newStats.hunger = Math.min(100, Math.max(0, newStats.hunger));
      newStats.cleanliness = Math.min(100, Math.max(0, newStats.cleanliness));
      
      // Check for level up
      if (newStats.experience >= 100) {
        newStats.level += 1;
        newStats.experience = newStats.experience - 100;
      }
      
      return newStats;
    });
  };

  const feedPet = (itemId: number): boolean => {
    const item = bagItems.find(i => i.id === itemId);
    if (!item || item.count <= 0) return false;

    removeFromBag(itemId, 1);
    
    // Different foods have different effects
    let hungerIncrease = 15;
    let happinessIncrease = 5;
    let expGain = 10;
    
    if (item.price >= 100) { // Premium food
      hungerIncrease = 30;
      happinessIncrease = 10;
      expGain = 20;
    } else if (item.price >= 50) { // Regular food
      hungerIncrease = 20;
      happinessIncrease = 8;
      expGain = 15;
    }

    updatePetStats({
      hunger: petStats.hunger + hungerIncrease,
      happiness: petStats.happiness + happinessIncrease,
      experience: petStats.experience + expGain,
    });

    return true;
  };

  const playWithPet = () => {
    updatePetStats({
      happiness: petStats.happiness + 15,
      hunger: petStats.hunger - 10, // Playing makes pet hungry
      experience: petStats.experience + 15,
    });
  };

  const cleanPet = () => {
    updatePetStats({
      cleanliness: petStats.cleanliness + 20,
      happiness: petStats.happiness + 5,
      experience: petStats.experience + 10,
    });
  };

  return (
    <GameContext.Provider
      value={{
        coins,
        setCoins,
        bagItems,
        addToBag,
        removeFromBag,
        petStats,
        updatePetStats,
        feedPet,
        playWithPet,
        cleanPet,
        userNickname,
        setUserNickname,
        ninniSettings,
        setNinniSettings,
        journalEntries,
        addJournalEntry,
        hasCompletedOnboarding,
        completeOnboarding,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}