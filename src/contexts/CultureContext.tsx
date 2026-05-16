import React, { createContext, useContext, useState, useEffect } from 'react';

export type MonarchyState = 'normal' | 'mourning' | 'celebration';

interface Monarch {
  name: string;
  title: string;
  reignStart: string;
  portraitUrl: string;
}

interface CultureContextType {
  monarchyState: MonarchyState;
  currentMonarch: Monarch;
  showRoyalHeritage: boolean;
  setShowRoyalHeritage: (show: boolean) => void;
}

const CURRENT_MONARCH: Monarch = {
  name: 'Charles III',
  title: 'By the Grace of God, of the United Kingdom of Great Britain and Northern Ireland and of His other Realms and Territories King, Head of the Commonwealth, Defender of the Faith',
  reignStart: '2022-09-08',
  portraitUrl: 'https://www.royal.uk/sites/default/files/images/monarch/king_charles_iii_official_portrait.jpg' // High quality official link style
};

const CultureContext = createContext<CultureContextType | undefined>(undefined);

export const CultureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [monarchyState, setMonarchyState] = useState<MonarchyState>('normal');
  const [showRoyalHeritage, setShowRoyalHeritage] = useState(true);

  // Simulation of a "Live Update System"
  useEffect(() => {
    const checkMonarchyEvents = async () => {
      try {
        const response = await fetch('/api/culture/monarchy-state');
        if (response.ok) {
          const data = await response.json();
          setMonarchyState(data.state);
        }
      } catch (err) {
        // Fallback to normal
        setMonarchyState('normal');
      }
    };

    checkMonarchyEvents();
  }, []);

  return (
    <CultureContext.Provider value={{ 
      monarchyState, 
      currentMonarch: CURRENT_MONARCH,
      showRoyalHeritage,
      setShowRoyalHeritage
    }}>
      <div className={monarchyState === 'mourning' ? 'grayscale-[0.5] transition-all duration-1000' : ''}>
        {children}
      </div>
    </CultureContext.Provider>
  );
};

export const useCulture = () => {
  const context = useContext(CultureContext);
  if (!context) throw new Error('useCulture must be used within CultureProvider');
  return context;
};
