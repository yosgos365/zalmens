import React, { useState } from 'react';
import { useAppContext } from '../store';
import { t } from '../i18n';
import { ArrowLeft } from 'lucide-react';
import { TefillinLogo } from '../components/TefillinLogo';

export const Login = () => {
  const { language, navigate, login } = useAppContext();
  const [username, setUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(username || 'yosefc');
  };

  return (
    <div className="flex flex-col h-full p-6 bg-white overflow-y-auto">
      <div className="flex items-center mb-8 mt-4">
        <button onClick={() => navigate('home')} className="p-2 -ms-2 text-zinc-400 active:text-zinc-600">
          <ArrowLeft size={24} className={language === 'he' ? 'rotate-180' : ''} />
        </button>
      </div>

      <div className="flex-1">
        <div className="mb-6">
          <TefillinLogo className="w-20 h-20" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{t('login', language)}</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('username', language)}</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
              placeholder="e.g. yosefc"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">{t('password', language)}</label>
            <input 
              type="password" 
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
            />
          </div>
          
          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold text-lg py-4 rounded-xl active:bg-blue-700 transition-colors">
              {t('login', language)}
            </button>
          </div>
        </form>

        <div className="mt-8 space-y-4">
          <button onClick={handleLogin} className="w-full bg-white border border-zinc-200 text-slate-700 font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-3 active:bg-zinc-50 transition-colors">
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            {t('continueGoogle', language)}
          </button>
          
          <button onClick={() => navigate('signup')} className="w-full text-center text-slate-500 font-semibold py-4 active:text-slate-800">
            {t('dontHaveAccount', language)} <span className="text-blue-600">{t('signUp', language)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
