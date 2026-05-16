import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameState {
  xp: number;
  level: number;
  streak: number;
  achievements: string[];
}

interface GameContextType extends GameState {
  addXP: (amount: number) => void;
  completeAchievement: (id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(() => {
    const saved = localStorage.getItem('articulate_game_state');
    return saved ? JSON.parse(saved) : {
      xp: 0,
      level: 1,
      streak: 14,
      achievements: []
    };
  });

  useEffect(() => {
    localStorage.setItem('articulate_game_state', JSON.stringify(state));
  }, [state]);

  const addXP = (amount: number) => {
    setState(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const completeAchievement = (id: string) => {
    setState(prev => {
      if (prev.achievements.includes(id)) return prev;
      return { ...prev, achievements: [...prev.achievements, id] };
    });
  };

  return (
    <GameContext.Provider value={{ ...state, addXP, completeAchievement }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
