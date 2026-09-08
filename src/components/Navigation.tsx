import React from 'react';
import { Home, Users, User } from 'lucide-react';
import { useAppContext } from '../store';
import { t } from '../i18n';

export const Navigation = () => {
  const { currentView, navigate, language } = useAppContext();

  const navItems = [
    { id: 'home', icon: Home, label: t('home', language) },
    { id: 'community', icon: Users, label: t('community', language) },
    { id: 'profile', icon: User, label: t('profile', language) },
  ];

  return (
    <div className="border-t border-zinc-100 bg-white flex justify-around px-2 py-2 shrink-0 z-50 pb-safe" dir="ltr">
      {navItems.map((item) => {
        const isActive = currentView === item.id || (item.id === 'profile' && currentView === 'login');
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex flex-col items-center justify-center p-2 min-w-[72px] transition-colors ${
              isActive ? 'text-blue-600' : 'text-zinc-400'
            }`}
          >
            <item.icon size={24} className={isActive ? 'fill-blue-50/50' : ''} />
            <span className="text-[11px] mt-1 font-semibold">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
