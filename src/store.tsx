import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Report, ActivityEvent, Language } from './types';

// Mock Data
const MOCK_USERS: User[] = [
  { id: '1', username: 'yosefc', firstName: 'Yosef', lastName: 'Cohen', mothersName: 'Sarah', commitment: 400, isPrivate: false, role: 'participant', language: 'en' },
  { id: '2', username: 'menacheml', firstName: 'Menachem', lastName: 'Levi', mothersName: 'Rachel', commitment: 800, isPrivate: false, role: 'participant', language: 'en' },
  { id: '3', username: 'moshef', firstName: 'Moshe', lastName: 'Friedman', mothersName: 'Leah', commitment: 600, isPrivate: false, role: 'participant', language: 'en' },
  { id: '4', username: 'davidb', firstName: 'David', lastName: 'Baruch', mothersName: 'Rivka', commitment: 120, isPrivate: false, role: 'participant', language: 'en' },
  { id: '5', username: 'shneurr', firstName: 'Shneur Zalman', lastName: 'Rosenberg', mothersName: 'Chana', commitment: 2000, isPrivate: false, role: 'participant', language: 'en' },
  { id: '6', username: 'levig', firstName: 'Levi Yitzchak', lastName: 'Green', mothersName: 'Esther', commitment: 300, isPrivate: false, role: 'participant', language: 'en' },
  { id: '7', username: 'admin', firstName: 'Zalmen', lastName: 'Manager', mothersName: 'Chaya', commitment: 500, isPrivate: false, role: 'manager', language: 'en' },
  { id: '8', username: 'anon', firstName: 'Anonymous', lastName: 'User', mothersName: '', commitment: 200, isPrivate: true, role: 'participant', language: 'en' },
];

const MOCK_REPORTS: Report[] = [
  { id: 'r1', userId: '1', amount: 157, karkeftas: 3, date: new Date().toISOString(), hebrewDate: 'י״ב כסלו תשפ״ז', parasha: 'Vayeitzei' },
  { id: 'r2', userId: '2', amount: 930, karkeftas: 14, date: new Date().toISOString(), hebrewDate: 'י״ב כסלו תשפ״ז', parasha: 'Vayeitzei' },
  { id: 'r3', userId: '3', amount: 240, karkeftas: 6, date: new Date().toISOString(), hebrewDate: 'י״ב כסלו תשפ״ז', parasha: 'Vayeitzei' },
  { id: 'r4', userId: '4', amount: 85, karkeftas: 2, date: new Date().toISOString(), hebrewDate: 'י״ב כסלו תשפ״ז', parasha: 'Vayeitzei' },
  { id: 'r5', userId: '5', amount: 1140, karkeftas: 21, date: new Date().toISOString(), hebrewDate: 'י״ב כסלו תשפ״ז', parasha: 'Vayeitzei' },
  { id: 'r6', userId: '6', amount: 73, karkeftas: 1, date: new Date().toISOString(), hebrewDate: 'י״ב כסלו תשפ״ז', parasha: 'Vayeitzei' },
  { id: 'r7', userId: '8', amount: 4, karkeftas: 0, date: new Date().toISOString(), hebrewDate: 'י״ב כסלו תשפ״ז', parasha: 'Vayeitzei' },
];

const MOCK_ACTIVITIES: ActivityEvent[] = [
  { id: 'a1', userId: '3', type: 'report', messageEn: 'Moshe Cohen recorded 5 Tefillin', messageHe: 'משה כהן דיווח על 5 תפילין', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), likes: 2, hasLiked: false },
  { id: 'a2', userId: '1', type: 'milestone', messageEn: 'Yosef Levi reached 50% of his commitment', messageHe: 'יוסף לוי הגיע ל-50% מההתחייבות שלו', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), likes: 5, hasLiked: true },
  { id: 'a3', userId: '2', type: 'milestone', messageEn: 'Menachem Baruch completed his commitment', messageHe: 'מנחם ברוך השלים את ההתחייבות שלו', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), likes: 12, hasLiked: false },
  { id: 'a4', userId: '4', type: 'karkefta', messageEn: 'David Friedman recorded a Karkefta 💎', messageHe: 'דוד פרידמן דיווח על קרקפתא 💎', timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString(), likes: 8, hasLiked: false },
  { id: 'a5', userId: '8', type: 'report', messageEn: 'A private participant recorded 3 Tefillin', messageHe: 'משתתף פרטי דיווח על 3 תפילין', timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(), likes: 0, hasLiked: false },
];

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentUser: User | null;
  login: (username: string) => void;
  logout: () => void;
  users: User[];
  reports: Report[];
  activities: ActivityEvent[];
  addReport: (amount: number, karkeftas: number, date?: string) => void;
  toggleLike: (activityId: string) => void;
  currentView: string;
  navigate: (view: string) => void;
  signup: (userData: Partial<User>) => void;
  campaignStats: { target: number; completed: number; karkeftas: number; activeParticipants: number };
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [activities, setActivities] = useState<ActivityEvent[]>(MOCK_ACTIVITIES);
  const [currentView, setCurrentView] = useState<string>('home');

  const campaignStats = {
    target: 80000,
    completed: 21735 + reports.reduce((acc, r) => acc + (currentUser && r.userId === currentUser.id && r.id.startsWith('new_') ? r.amount : 0), 0), // Base + new
    karkeftas: 164 + reports.reduce((acc, r) => acc + (currentUser && r.userId === currentUser.id && r.id.startsWith('new_') ? r.karkeftas : 0), 0),
    activeParticipants: 47,
  };

  const login = (username: string) => {
    const user = users.find((u) => u.username === username);
    if (user) {
      setCurrentUser(user);
      setCurrentView('home');
    } else {
      // Just log in as first user if not found for demo purposes
      setCurrentUser(users[0]);
      setCurrentView('home');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const signup = (userData: Partial<User>) => {
    const newUser: User = {
      id: `u_${Date.now()}`,
      username: userData.username || `user_${Date.now()}`,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      mothersName: userData.mothersName || '',
      commitment: userData.commitment || 100,
      isPrivate: userData.isPrivate || false,
      role: 'participant',
      language: userData.language || language
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setCurrentView('home');
  };

  const addReport = (amount: number, karkeftas: number, date?: string) => {
    if (!currentUser) return;
    const newReport: Report = {
      id: `new_${Date.now()}`,
      userId: currentUser.id,
      amount,
      karkeftas,
      date: date || new Date().toISOString(),
      hebrewDate: 'י״ב כסלו תשפ״ז',
      parasha: 'Vayeitzei',
    };
    setReports([newReport, ...reports]);
    
    // Add activity
    const newActivity: ActivityEvent = {
      id: `act_${Date.now()}`,
      userId: currentUser.id,
      type: karkeftas > 0 ? 'karkefta' : 'report',
      messageEn: currentUser.isPrivate ? `A private participant recorded ${amount} Tefillin` : `${currentUser.firstName} ${currentUser.lastName} recorded ${karkeftas > 0 ? 'a Karkefta 💎' : `${amount} Tefillin`}`,
      messageHe: currentUser.isPrivate ? `משתתף פרטי דיווח על ${amount} תפילין` : `${currentUser.firstName} ${currentUser.lastName} דיווח על ${karkeftas > 0 ? 'קרקפתא 💎' : `${amount} תפילין`}`,
      timestamp: new Date().toISOString(),
      likes: 0,
      hasLiked: false
    };
    setActivities([newActivity, ...activities]);
  };

  const toggleLike = (activityId: string) => {
    setActivities(activities.map(act => {
      if (act.id === activityId) {
        return {
          ...act,
          likes: act.hasLiked ? act.likes - 1 : act.likes + 1,
          hasLiked: !act.hasLiked
        };
      }
      return act;
    }));
  };

  const navigate = (view: string) => setCurrentView(view);

  return (
    <AppContext.Provider value={{
      language, setLanguage, currentUser, login, logout, users, reports, activities,
      addReport, toggleLike, currentView, navigate, signup, campaignStats
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
