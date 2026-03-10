import { useState } from 'react';
import { CheckCircle2, Circle, Coins, Gift } from 'lucide-react';
import { useGame } from '../context/GameContext';

interface Task {
  id: number;
  title: string;
  reward: number;
  completed: boolean;
  progress?: number;
  total?: number;
}

export default function Tasks() {
  const { coins, setCoins } = useGame();
  const [message, setMessage] = useState('');
  
  const [dailyTasks, setDailyTasks] = useState<Task[]>([
    { id: 1, title: 'Feed your Ninni 3 times', reward: 50, completed: false, progress: 0, total: 3 },
    { id: 2, title: 'Play with your Ninni', reward: 30, completed: false },
    { id: 3, title: 'Clean your Ninni', reward: 20, completed: false },
    { id: 4, title: 'Visit 5 friends', reward: 100, completed: false, progress: 0, total: 5 },
    { id: 5, title: 'Buy 2 items from shop', reward: 40, completed: false, progress: 0, total: 2 },
  ]);

  const [weeklyTasks, setWeeklyTasks] = useState<Task[]>([
    { id: 6, title: 'Complete 10 daily tasks', reward: 200, completed: false, progress: 2, total: 10 },
    { id: 7, title: 'Reach Ninni level 5', reward: 300, completed: false, progress: 1, total: 5 },
    { id: 8, title: 'Make 10 friends', reward: 150, completed: false, progress: 3, total: 10 },
  ]);

  const [achievements, setAchievements] = useState([
    { id: 9, title: 'First Steps', description: 'Complete your first task', reward: 100, unlocked: false },
    { id: 10, title: 'Ninni Lover', description: 'Feed your Ninni 50 times', reward: 500, unlocked: false },
    { id: 11, title: 'Social Butterfly', description: 'Add 20 friends', reward: 300, unlocked: false },
  ]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  const completeTask = (taskId: number, isDaily: boolean = true) => {
    const tasks = isDaily ? dailyTasks : weeklyTasks;
    const setTasks = isDaily ? setDailyTasks : setWeeklyTasks;
    
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    // Complete the task
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: true } : t
    ));

    // Award coins
    setCoins(coins + task.reward);
    showMessage(`+${task.reward} coins! 🎉`);
  };

  const completedDailyCount = dailyTasks.filter(t => t.completed).length;
  const totalDailyCount = dailyTasks.length;

  return (
    <div className="p-4 space-y-4">
      {/* Message Toast */}
      {message && (
        <div 
          className="fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce"
          style={{ backgroundColor: 'var(--brand-coral)', color: 'white' }}
        >
          {message}
        </div>
      )}

      {/* Daily Tasks */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Daily Tasks</h3>
        <div className="space-y-3">
          {dailyTasks.map((task) => (
            <div 
              key={task.id}
              className="border-2 rounded-lg p-3 hover:bg-gray-50"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle2 size={20} style={{ color: 'var(--brand-coral)' }} />
                  ) : (
                    <Circle className="text-gray-400" size={20} />
                  )}
                  <div>
                    <div className={`text-sm ${task.completed ? 'text-gray-400 line-through' : ''}`} style={!task.completed ? { color: 'var(--brand-charcoal)' } : {}}>
                      {task.title}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Coins size={12} style={{ color: 'var(--brand-coral)' }} />
                      <span>+{task.reward}</span>
                    </div>
                  </div>
                </div>
                {!task.completed && (
                  <button 
                    onClick={() => completeTask(task.id, true)}
                    className="px-3 py-1 text-white text-xs rounded-lg hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: 'var(--brand-coral)' }}
                  >
                    Complete
                  </button>
                )}
              </div>
              {task.progress !== undefined && (
                <div className="flex items-center gap-2 mt-2 ml-8">
                  <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
                    <div 
                      className="h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(task.progress / task.total!) * 100}%`, backgroundColor: 'var(--brand-coral)' }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {task.progress}/{task.total}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Tasks */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Weekly Tasks</h3>
        <div className="space-y-3">
          {weeklyTasks.map((task) => (
            <div 
              key={task.id}
              className="border-2 rounded-lg p-3"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm" style={{ color: 'var(--brand-charcoal)' }}>{task.title}</div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Coins size={12} style={{ color: 'var(--brand-sky)' }} />
                  <span>+{task.reward}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
                  <div 
                    className="h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${(task.progress! / task.total!) * 100}%`, backgroundColor: 'var(--brand-sky)' }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {task.progress}/{task.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--brand-charcoal)' }}>Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className="border-2 rounded-lg p-3"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg`} style={achievement.unlocked ? { backgroundColor: 'var(--brand-lavender)' } : { backgroundColor: 'var(--muted)' }}>
                    <Gift className={achievement.unlocked ? 'text-white' : 'text-gray-400'} size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium" style={{ color: 'var(--brand-charcoal)' }}>{achievement.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{achievement.description}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                      <Coins size={12} style={{ color: 'var(--brand-lavender)' }} />
                      <span>+{achievement.reward}</span>
                    </div>
                  </div>
                </div>
                {achievement.unlocked && (
                  <CheckCircle2 size={20} style={{ color: 'var(--brand-lavender)' }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Summary */}
      <div className="border-2 rounded-lg p-4 bg-white" style={{ borderColor: 'var(--border)' }}>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Daily Progress</span>
          <span className="font-medium" style={{ color: 'var(--brand-charcoal)' }}>{completedDailyCount} / {totalDailyCount}</span>
        </div>
        <div className="mt-2 h-2 rounded-full" style={{ backgroundColor: 'var(--muted)' }}>
          <div 
            className="h-2 rounded-full transition-all duration-300" 
            style={{ 
              width: `${(completedDailyCount / totalDailyCount) * 100}%`, 
              background: 'linear-gradient(90deg, var(--brand-coral) 0%, var(--brand-sky) 100%)' 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}