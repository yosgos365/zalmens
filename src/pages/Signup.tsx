import React, { useState } from 'react';
import { useAppContext } from '../store';
import { t } from '../i18n';
import { ArrowLeft, Globe, Lock } from 'lucide-react';
import { TefillinLogo } from '../components/TefillinLogo';
import { Language } from '../types';

export const Signup = () => {
  const { language, setLanguage, navigate, signup } = useAppContext();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    commitment: 100,
    hebrewName: '',
    mothersName: '',
    username: '',
    password: '',
    isPrivate: false,
    language: language
  });

  const [isGoogleAuth, setIsGoogleAuth] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      ...formData,
      commitment: Number(formData.commitment) || 100,
      language: formData.language as Language,
    });
  };

  const handleGoogleSignup = () => {
    setIsGoogleAuth(true);
    // Simulate auto-filling some data
    setFormData(prev => ({ ...prev, firstName: 'Google', lastName: 'User' }));
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      <div className="flex items-center p-6 pb-2 sticky top-0 bg-white/90 backdrop-blur-sm z-10">
        <button onClick={() => navigate('login')} className="p-2 -ms-2 text-zinc-400 active:text-zinc-600">
          <ArrowLeft size={24} className={language === 'he' ? 'rotate-180' : ''} />
        </button>
      </div>

      <div className="px-6 pb-12 flex-1">
        <TefillinLogo className="w-18 h-18 mb-4" />
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{t('createAccount', language)}</h1>

        {!isGoogleAuth && (
          <div className="mb-8">
            <button onClick={handleGoogleSignup} className="w-full bg-white border border-zinc-200 text-slate-700 font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-3 active:bg-zinc-50 transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              {t('signUpWithGoogle', language)}
            </button>
            <div className="flex items-center gap-4 mt-6 mb-2">
              <div className="flex-1 h-px bg-zinc-100"></div>
              <div className="text-zinc-400 text-sm font-bold uppercase tracking-widest">OR</div>
              <div className="flex-1 h-px bg-zinc-100"></div>
            </div>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-700 mb-1">{t('firstName', language)}</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-bold text-slate-700 mb-1">{t('lastName', language)}</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">{t('goal', language)}</label>
            <input type="number" name="commitment" value={formData.commitment} onChange={handleChange} required className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" />
          </div>

          <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 space-y-4">
            <div>
              <label className="block text-sm font-bold text-amber-900 mb-1">{t('hebrewName', language)}</label>
              <input type="text" name="hebrewName" value={formData.hebrewName} onChange={handleChange} className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600" />
            </div>
            <div>
              <label className="block text-sm font-bold text-amber-900 mb-1">{t('mothersName', language)}</label>
              <input type="text" name="mothersName" value={formData.mothersName} onChange={handleChange} className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-600/20 focus:border-amber-600" />
            </div>
          </div>

          {!isGoogleAuth && (
            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">{t('username', language)}</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">{t('password', language)}</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" />
              </div>
            </div>
          )}

          <div className="pt-2">
            <label className="block text-sm font-bold text-slate-700 mb-3">{t('preferredLanguage', language)}</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setFormData({...formData, language: 'en'})} className={`flex-1 py-3 text-sm font-bold rounded-xl border transition-colors ${formData.language === 'en' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'}`}>English</button>
              <button type="button" onClick={() => setFormData({...formData, language: 'he'})} className={`flex-1 py-3 text-sm font-bold rounded-xl border transition-colors ${formData.language === 'he' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'}`}>עברית</button>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-bold text-slate-700 mb-3">{t('accountType', language)}</label>
            <div className="space-y-3">
              <button type="button" onClick={() => setFormData({...formData, isPrivate: false})} className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-colors ${!formData.isPrivate ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!formData.isPrivate ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Globe size={20} />
                </div>
                <div className="text-start">
                  <div className={`font-bold ${!formData.isPrivate ? 'text-blue-900' : 'text-slate-700'}`}>{t('publicProfile', language)}</div>
                  <div className={`text-xs mt-0.5 ${!formData.isPrivate ? 'text-blue-700' : 'text-slate-500'}`}>{t('publicAccountDesc', language)}</div>
                </div>
              </button>

              <button type="button" onClick={() => setFormData({...formData, isPrivate: true})} className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-colors ${formData.isPrivate ? 'bg-slate-800 border-slate-800 text-white' : 'bg-white border-slate-200'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formData.isPrivate ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <Lock size={20} />
                </div>
                <div className="text-start">
                  <div className={`font-bold ${formData.isPrivate ? 'text-white' : 'text-slate-700'}`}>{t('privateProfile', language)}</div>
                  <div className={`text-xs mt-0.5 ${formData.isPrivate ? 'text-slate-400' : 'text-slate-500'}`}>{t('privateAccountDesc', language)}</div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="pt-6">
            <button type="submit" className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl active:bg-blue-700 transition-colors">
              {t('signUp', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
