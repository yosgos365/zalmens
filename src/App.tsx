import React from 'react';
import { useAppContext } from './store';
import { Home } from './pages/Home';
import { Community } from './pages/Community';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';
import { MyReports } from './pages/MyReports';
import { WeeklyProgress } from './pages/WeeklyProgress';
import { RebbeReport } from './pages/RebbeReport';
import { Navigation } from './components/Navigation';

export default function App() {
  const { currentView, language, currentUser } = useAppContext();

  const isRtl = language === 'he';

  const renderView = () => {
    // Navigate to Login if clicking Profile while logged out
    if (currentView === 'profile' && !currentUser) return <Login />;

    switch (currentView) {
      case 'home': return <Home />;
      case 'community': return <Community />;
      case 'login': return <Login />;
      case 'signup': return <Signup />;
      case 'profile': return <Profile />;
      case 'my-reports': return <MyReports />;
      case 'weekly-progress': return <WeeklyProgress />;
      case 'rebbe-report': return <RebbeReport />;
      default: return <Home />;
    }
  };

  const isLoginView = currentView === 'login' || currentView === 'signup' || (currentView === 'profile' && !currentUser);
  const showNav = ['home', 'community', 'profile'].includes(currentView) && !isLoginView;

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen bg-zinc-50 text-slate-900 font-sans flex justify-center h-[100dvh] overflow-hidden">
      <div className="w-full max-w-md bg-white h-full relative shadow-sm flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          {renderView()}
        </div>
        {showNav && <Navigation />}
      </div>
    </div>
  );
}
