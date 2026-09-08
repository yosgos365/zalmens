import React, { useState } from 'react';
import { useAppContext } from '../store';
import { t } from '../i18n';
import { TefillinLogo } from '../components/TefillinLogo';
import { Check, X, Share2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Home = () => {
  const { currentUser, language, setLanguage, reports, addReport, campaignStats, navigate } = useAppContext();
  const [showFeedback, setShowFeedback] = useState<'tefillin' | 'karkefta' | null>(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [bulkAmount, setBulkAmount] = useState('');

  const toggleLanguage = () => setLanguage(language === 'en' ? 'he' : 'en');
  const progressPercent = Math.min(100, Math.round((campaignStats.completed / campaignStats.target) * 100));

  const handleReport = (type: 'tefillin' | 'karkefta') => {
    if (type === 'tefillin') addReport(1, 0);
    else addReport(1, 1);
    setShowFeedback(type);
    setTimeout(() => setShowFeedback(null), 2000);
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(bulkAmount, 10);
    if (amount && !isNaN(amount) && amount > 0) {
      addReport(amount, 0);
      setShowBulkModal(false);
      setBulkAmount('');
      setShowFeedback('tefillin');
      setTimeout(() => setShowFeedback(null), 2000);
    }
  };

  const userReports = currentUser ? reports.filter(r => r.userId === currentUser.id) : [];
  const totalCompleted = userReports.reduce((sum, r) => sum + r.amount, 0);
  const totalKarkeftas = userReports.reduce((sum, r) => sum + r.karkeftas, 0);
  const todayCompleted = userReports.filter(r => r.id.startsWith('new_')).reduce((sum, r) => sum + r.amount, 0) + (currentUser ? 5 : 0);
  
  const pPercent = currentUser ? Math.min(100, Math.round((totalCompleted / currentUser.commitment) * 100)) : 0;
  const pRemaining = currentUser ? Math.max(0, currentUser.commitment - totalCompleted) : 0;
  const isOver = currentUser ? totalCompleted > currentUser.commitment : false;

  return (
    <div className="p-4 flex flex-col h-full relative overflow-y-auto">
      <AnimatePresence>
        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 ${
              showFeedback === 'karkefta' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
            }`}
          >
            {showFeedback === 'tefillin' ? <><Check size={20} /> {t('tefillinRecorded', language)}</> : <>{t('karkeftaRecorded', language)}</>}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <TefillinLogo className="w-12 h-12" />
          <div className="font-bold text-lg leading-tight">
            <div>Zalmen's</div>
            <div className="-mt-1 text-slate-500">Tefillin</div>
          </div>
        </div>
        <button onClick={toggleLanguage} className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full active:bg-slate-200">
          {language === 'en' ? 'עברית' : 'English'}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4 shrink-0">
        <div className="flex justify-between items-end mb-2">
          <div>
            <div className="text-3xl font-black text-blue-600 leading-none">{campaignStats.completed.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t('campaignTarget', language)}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-slate-800">{campaignStats.karkeftas.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase">{t('karkeftas', language)} 💎</div>
          </div>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
          <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="text-[10px] text-slate-400 font-semibold text-center">{campaignStats.activeParticipants} {t('activeParticipants', language)} • {t('weekOf', language)} Vayeitzei</div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        {!currentUser ? (
          <div className="text-center px-4 w-full">
            <p className="text-slate-500 font-medium mb-6">{t('slogan', language)}</p>
            <button 
              onClick={() => navigate('profile')}
              className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl active:bg-blue-700 transition-colors"
            >
              {t('loginToReport', language)}
            </button>
          </div>
        ) : (
          <div className="w-full max-w-xs mx-auto">
            <div className="text-center mb-6 relative">
              <button onClick={() => setShowShareModal(true)} className="absolute top-2 right-0 p-2 text-slate-400 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 rounded-full transition-colors">
                <Share2 size={20} />
              </button>
              <div className="text-5xl font-black text-slate-900 tracking-tight">{totalCompleted.toLocaleString()}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                {t('of', language)} {currentUser.commitment.toLocaleString()}
              </div>
              
              <div className="flex justify-center gap-3 text-xs font-semibold">
                <div className="bg-slate-100 px-3 py-1.5 rounded-full text-slate-600">
                  <span className="font-bold text-slate-900">{todayCompleted}</span> {t('today', language)}
                </div>
                {totalKarkeftas > 0 && (
                  <div className="bg-amber-50 px-3 py-1.5 rounded-full text-amber-700">
                    <span className="font-bold">{totalKarkeftas}</span> {t('karkeftas', language)} 💎
                  </div>
                )}
              </div>
            </div>

            <div className="w-full mb-6">
              <div className="flex justify-between text-[11px] font-bold mb-1.5 px-1">
                <span className="text-blue-600">{pPercent}%</span>
                <span className="text-slate-400">
                  {isOver 
                    ? <span className="text-emerald-500">{totalCompleted - currentUser.commitment} {t('aboveCommitment', language)}</span>
                    : <>{pRemaining.toLocaleString()} {t('remaining', language)}</>
                  }
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className={`h-full rounded-full transition-all ${isOver ? 'bg-emerald-500' : 'bg-blue-600'}`} style={{ width: `${pPercent}%` }} />
              </div>
            </div>

            <div className="flex gap-3 mb-3">
              <button onClick={() => handleReport('tefillin')} className="flex-1 bg-blue-600 text-white font-bold py-5 rounded-2xl active:bg-blue-700 active:scale-95 transition-all">
                {t('addTefillin', language)}
              </button>
              <button onClick={() => handleReport('karkefta')} className="flex-1 bg-amber-50 text-amber-700 font-bold py-5 rounded-2xl border border-amber-100 active:bg-amber-100 active:scale-95 transition-all">
                {t('addKarkefta', language)}
              </button>
            </div>
            
            <div className="text-center">
              <button onClick={() => setShowBulkModal(true)} className="text-slate-400 font-semibold text-xs py-2 active:text-slate-600">
                {t('reportBulk', language)}
              </button>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showBulkModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white p-6 rounded-3xl w-full max-w-sm shadow-xl"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">{t('reportBulk', language)}</h3>
                <button onClick={() => setShowBulkModal(false)} className="p-2 -m-2 text-slate-400 active:bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleBulkSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    {language === 'he' ? 'כמות הנחות' : 'Amount'}
                  </label>
                  <input
                    type="number"
                    value={bulkAmount}
                    onChange={(e) => setBulkAmount(e.target.value)}
                    placeholder="e.g. 5"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                    autoFocus
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={!bulkAmount}
                  className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:bg-slate-300"
                >
                  {language === 'he' ? 'שמור דיווח' : 'Save Report'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showShareModal && currentUser && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white p-6 rounded-3xl w-full max-w-sm shadow-xl"
              dir={language === 'he' ? 'rtl' : 'ltr'}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">{t('shareProgress', language)}</h3>
                <button onClick={() => setShowShareModal(false)} className="p-2 -m-2 text-slate-400 active:bg-slate-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              {/* The "Card" to be shared */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl p-6 text-white mb-6 relative overflow-hidden shadow-lg">
                <div className="absolute -right-4 -bottom-4 opacity-15 pointer-events-none">
                  <TefillinLogo className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <TefillinLogo className="w-10 h-10" />
                    <div className="font-bold leading-tight">
                      <div>Zalmen's</div>
                      <div className="-mt-1 text-blue-200">Tefillin</div>
                    </div>
                  </div>
                  
                  <div className="text-sm font-medium text-blue-200 mb-1">
                    {language === 'he' ? 'ההתקדמות של' : 'Progress for'} {currentUser.firstName}
                  </div>
                  <div className="text-5xl font-black mb-2">{totalCompleted.toLocaleString()}</div>
                  <div className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-6">
                    {t('of', language)} {currentUser.commitment.toLocaleString()} {t('complete', language)}
                  </div>

                  <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                    <div className="bg-white h-full rounded-full" style={{ width: `${pPercent}%` }} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => {
                    const text = language === 'he' 
                      ? `הנחתי ${totalCompleted} תפילין מתוך יעד של ${currentUser.commitment} במסגרת מבצע Zalmen's Tefillin! 💎`
                      : `I've put on Tefillin ${totalCompleted} times out of my goal of ${currentUser.commitment} in the Zalmen's Tefillin campaign! 💎`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
                  }}
                  className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:bg-[#128C7E] transition-colors"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  {t('shareWhatsApp', language)}
                </button>
                <button onClick={() => setShowShareModal(false)} className="w-full bg-white text-slate-700 border border-slate-200 font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 active:bg-slate-50 transition-colors">
                  <Download size={20} />
                  {t('downloadImage', language)}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
