import React, { useState } from 'react';
import { useAppContext } from '../store';
import { t } from '../i18n';
import { Globe, Lock, LogOut } from 'lucide-react';

export const Profile = () => {
  const { currentUser, language, setLanguage, logout, navigate } = useAppContext();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  if (!currentUser) return null;

  return (
    <div className="flex flex-col h-full p-6 bg-white overflow-y-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">{t('profile', language)}</h1>

      <div className="mb-8">
        <div className="text-3xl font-bold text-slate-900">{currentUser.firstName} {currentUser.lastName}</div>
        <div className="text-slate-500 font-medium">@{currentUser.username}</div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">{t('languageLabel', language)}</h3>
          <div className="flex gap-2">
            <button onClick={() => setLanguage('en')} className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-colors ${language === 'en' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'}`}>English</button>
            <button onClick={() => setLanguage('he')} className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-colors ${language === 'he' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'}`}>עברית</button>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">{t('privacy', language)}</h3>
          <button onClick={() => setShowPrivacyModal(true)} className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 p-4 rounded-xl active:bg-slate-100 transition-colors">
            <div className="flex items-center gap-3">
              {currentUser.isPrivate ? <Lock className="text-slate-500" size={18} /> : <Globe className="text-blue-600" size={18} />}
              <span className="font-bold text-slate-800 text-sm">{currentUser.isPrivate ? t('privateProfile', language) : t('publicProfile', language)}</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400">{t('change', language)}</span>
          </button>
        </div>
        
        <div>
          <button onClick={() => navigate('my-reports')} className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 p-4 rounded-xl active:bg-slate-100 transition-colors">
            <span className="font-bold text-slate-800 text-sm">{t('myReports', language)}</span>
            <span className="text-[10px] font-bold text-slate-400">{t('view', language)}</span>
          </button>
        </div>

        {currentUser.role === 'manager' && (
          <div className="pt-2">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-3">{t('managerTools', language)}</h3>
            <div className="space-y-2">
              <button className="w-full text-start bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold text-slate-800 text-sm active:bg-slate-100 transition-colors">
                {t('manageUsers', language)}
              </button>
              <button onClick={() => navigate('rebbe-report')} className="w-full text-start bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold text-slate-800 text-sm active:bg-slate-100 transition-colors">
                {t('rebbeReport', language)}
              </button>
              <button onClick={() => navigate('weekly-progress')} className="w-full text-start bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold text-slate-800 text-sm active:bg-slate-100 transition-colors">
                {t('weeklyProgressGraph', language)}
              </button>
            </div>
          </div>
        )}

        <div className="pt-4 pb-8">
          <button onClick={logout} className="flex items-center gap-2 text-rose-500 font-bold text-sm p-2 active:bg-rose-50 rounded-lg transition-colors -ms-2">
            <LogOut size={18} /> {t('logout', language)}
          </button>
        </div>
      </div>

      {showPrivacyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-3xl w-full max-w-sm shadow-xl">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Globe className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t('waitASecond', language)}</h3>
            <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">{t('privacyWarning', language)}</p>
            <div className="space-y-2">
              <button onClick={() => setShowPrivacyModal(false)} className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl">{t('stayPublic', language)}</button>
              <button onClick={() => setShowPrivacyModal(false)} className="w-full bg-white text-slate-500 font-bold py-3.5 rounded-xl border border-slate-200">{t('makePrivate', language)}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
