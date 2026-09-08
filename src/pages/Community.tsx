import React, { useState } from 'react';
import { useAppContext } from '../store';
import { t } from '../i18n';
import { Heart } from 'lucide-react';
import { formatDistanceToNow } from '../utils/date';

export const Community = () => {
  const { language, activities, users, reports, currentUser, toggleLike } = useAppContext();
  const [tab, setTab] = useState<'activity' | 'ranking'>('activity');
  const [sortBy, setSortBy] = useState<'total' | 'percent'>('total');

  const publicUsers = users.filter(u => !u.isPrivate);
  const userStats = publicUsers.map(user => {
    const userReports = reports.filter(r => r.userId === user.id);
    const total = userReports.reduce((sum, r) => sum + r.amount, 0);
    const karkeftas = userReports.reduce((sum, r) => sum + r.karkeftas, 0);
    const percent = Math.min(100, Math.round((total / user.commitment) * 100));
    return { ...user, total, karkeftas, percent };
  });

  const sortedUsers = [...userStats].sort((a, b) => sortBy === 'total' ? b.total - a.total : b.percent - a.percent);

  return (
    <div className="flex flex-col h-full bg-zinc-50">
      <div className="p-4 border-b border-slate-100 bg-white z-10 sticky top-0 shrink-0">
        <h1 className="text-xl font-bold text-slate-900 mb-4">{t('community', language)}</h1>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button onClick={() => setTab('activity')} className={`flex-1 py-1.5 text-sm font-bold rounded-lg ${tab === 'activity' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>
            {t('activity', language)}
          </button>
          <button onClick={() => setTab('ranking')} className={`flex-1 py-1.5 text-sm font-bold rounded-lg ${tab === 'ranking' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}>
            {t('ranking', language)}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'activity' && (
          <div className="space-y-3">
            {activities.map(act => (
              <div key={act.id} className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex items-start gap-3">
                <div className="text-xl mt-0.5">{act.type === 'karkefta' ? '💎' : act.type === 'milestone' ? '🎉' : '💪'}</div>
                <div className="flex-1">
                  <p className="text-slate-800 font-medium text-sm leading-snug">{language === 'he' ? act.messageHe : act.messageEn}</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{formatDistanceToNow(new Date(act.timestamp), language)}</p>
                </div>
                <button onClick={() => toggleLike(act.id)} className="p-2 -me-2 flex flex-col items-center gap-1">
                  <Heart size={18} className={act.hasLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-300'} />
                  {act.likes > 0 && <span className={`text-[9px] font-bold ${act.hasLiked ? 'text-rose-500' : 'text-slate-400'}`}>{act.likes}</span>}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === 'ranking' && (
          <>
            <div className="flex gap-2 mb-4">
              <button onClick={() => setSortBy('total')} className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-colors ${sortBy === 'total' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}>
                {t('total', language)}
              </button>
              <button onClick={() => setSortBy('percent')} className={`px-4 py-1.5 text-xs font-bold rounded-full border transition-colors ${sortBy === 'percent' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}>
                % {t('complete', language)}
              </button>
            </div>
            <div className="space-y-2">
              {sortedUsers.map((user, idx) => (
                <div key={user.id} className={`flex items-center gap-3 p-3 rounded-xl ${user.id === currentUser?.id ? 'bg-blue-50 border border-blue-100' : 'bg-white border border-slate-100'}`}>
                  <div className={`w-6 text-center font-bold text-sm ${idx < 3 ? 'text-amber-500' : 'text-slate-400'}`}>{idx + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 text-sm truncate">{user.firstName} {user.lastName}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${user.percent}%` }} />
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold whitespace-nowrap leading-none">{user.percent}%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-lg text-slate-900 leading-none">{user.total}</div>
                    {user.karkeftas > 0 && <div className="text-[9px] font-bold text-amber-600 mt-1 uppercase">{user.karkeftas} {t('karkeftas', language)}</div>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
