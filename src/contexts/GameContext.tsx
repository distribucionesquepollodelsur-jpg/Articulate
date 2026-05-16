import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  User as FirebaseUser,
  signOut
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  onSnapshot, 
  serverTimestamp,
  collection,
  query,
  limit,
  orderBy,
  getDocs
} from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../lib/firestore-utils';

interface Recommendation {
  type: 'lab' | 'lesson' | 'game' | 'explore';
  activityId: string;
  recommendation: string;
  targetSound?: string;
}

interface GameState {
  xp: number;
  level: number;
  streak: number;
  achievements: string[];
  completedLessons: string[];
  recommendation: Recommendation | null;
}

interface GameContextType extends GameState {
  user: FirebaseUser | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  addXP: (amount: number, type: 'lesson' | 'game' | 'lab' | 'studio' | 'explore', activityId: string) => Promise<void>;
  completeAchievement: (id: string) => Promise<void>;
  completeLesson: (id: string) => Promise<void>;
  fetchRecommendation: () => Promise<void>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<GameState>({
    xp: 0,
    level: 1,
    streak: 0,
    achievements: [],
    completedLessons: [],
    recommendation: null,
  });

  const fetchRecommendation = async () => {
    if (!user) return;
    try {
      const response = await fetch('/api/adaptive/next', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userProgress: state,
          recentActivity: [] // Could fetch from Firestore if needed
        })
      });
      const data = await response.json();
      setState(s => ({ ...s, recommendation: data }));
    } catch (err) {
      console.error("Failed to fetch recommendation:", err);
    }
  };

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (!authUser) {
        setLoading(false);
        setState({
          xp: 0,
          level: 1,
          streak: 0,
          achievements: [],
          completedLessons: [],
          recommendation: null
        });
      }
    });
    return unsubscribe;
  }, []);

  // Firestore Sync Listener
  useEffect(() => {
    if (!user) return;

    const progressDoc = doc(db, 'users', user.uid, 'progress', 'data');
    
    const unsubscribe = onSnapshot(progressDoc, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setState(s => ({
          ...s,
          xp: data.xp || 0,
          level: data.level || 1,
          streak: data.streak || 0,
          achievements: data.achievements || [],
          completedLessons: data.completedLessons || []
        }));
        setLoading(false);
      } else {
        // Initialize new user
        const initialData = {
          xp: 0,
          level: 1,
          streak: 0,
          achievements: [],
          completedLessons: [],
          lastActivityAt: serverTimestamp()
        };
        
        setDoc(progressDoc, initialData).catch(err => {
          handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/progress/data`);
        });

        // Initialize Profile
        setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName,
          email: user.email,
          avatarUrl: user.photoURL,
          createdAt: serverTimestamp(),
          role: 'student'
        }).catch(err => {
          handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
        });

        setLoading(false);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, `users/${user.uid}/progress/data`);
    });

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (user && !loading && !state.recommendation) {
      fetchRecommendation();
    }
  }, [user, loading]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const addXP = async (amount: number, type: 'lesson' | 'game' | 'lab' | 'studio' | 'explore', activityId: string) => {
    if (!user) return;

    const newXP = state.xp + amount;
    const newLevel = Math.floor(newXP / 1000) + 1;
    
    try {
      // 1. Log static activity
      const activityRef = doc(collection(db, 'users', user.uid, 'activities'));
      await setDoc(activityRef, {
        type,
        activityId,
        xpGained: amount,
        timestamp: serverTimestamp()
      });

      // 2. Update Progress
      const progressDoc = doc(db, 'users', user.uid, 'progress', 'data');
      
      // Calculate streak logic (simplified: if last activity was yesterday, streak++, if today, no change, if older, reset)
      // For now, simple increment if not today
      let newStreak = state.streak;
      const now = new Date();
      // Only increment streak once per day normally, but here we just ensure it's at least 1 if active
      if (newStreak === 0) newStreak = 1;

      const updateData = {
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        lastActivityAt: serverTimestamp()
      };

      await setDoc(progressDoc, updateData, { merge: true });

      // 3. Update public leaderboard entry
      await setDoc(doc(db, 'leaderboard', 'global', 'entries', user.uid), {
        ...state,
        ...updateData,
        displayName: user.displayName,
        avatarUrl: user.photoURL
      }, { merge: true });

    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/progress/data`);
    }
  };

  const completeAchievement = async (id: string) => {
    if (!user || state.achievements.includes(id)) return;
    
    try {
      const progressDoc = doc(db, 'users', user.uid, 'progress', 'data');
      await setDoc(progressDoc, {
        achievements: [...state.achievements, id]
      }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/progress/data`);
    }
  };

  const completeLesson = async (id: string) => {
    if (!user || state.completedLessons.includes(id)) return;
    
    try {
      const progressDoc = doc(db, 'users', user.uid, 'progress', 'data');
      await setDoc(progressDoc, {
        completedLessons: [...state.completedLessons, id]
      }, { merge: true });
      await addXP(50, 'lesson', id);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}/progress/data`);
    }
  };

  return (
    <GameContext.Provider value={{ 
      ...state, 
      user, 
      loading, 
      login, 
      logout, 
      addXP, 
      completeAchievement, 
      completeLesson,
      fetchRecommendation
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};
