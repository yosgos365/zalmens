import React, { useState } from 'react';
import { useAppContext } from '../store';
import { ArrowLeft, Printer } from 'lucide-react';

export const RebbeReport = () => {
  const { navigate, users, reports, language } = useAppContext();
  const [selectedWeek, setSelectedWeek] = useState('Vayeitzei');

  // In the real app, this would filter reports by the selected week's date range.
  // For the demo, we just aggregate all mock reports.
  const activeUserStats = users.map(user => {
    const userReports = reports.filter(r => r.userId === user.id);
    const amount = userReports.reduce((sum, r) => sum + r.amount, 0);
    const karkeftas = userReports.reduce((sum, r) => sum + r.karkeftas, 0);
    return { ...user, amount, karkeftas };
  }).filter(u => u.amount > 0).sort((a, b) => b.amount - a.amount);

  const totalTefillin = activeUserStats.reduce((sum, u) => sum + u.amount, 0);
  const totalKarkeftas = activeUserStats.reduce((sum, u) => sum + u.karkeftas, 0);

  return (
    <div className="flex flex-col h-full bg-zinc-50 pb-20 overflow-y-auto">
      <div className="flex items-center p-6 bg-white border-b border-zinc-100">
        <button onClick={() => navigate('profile')} className="p-2 -ms-2 text-zinc-400 active:text-zinc-600">
          <ArrowLeft size={24} className={language === 'he' ? 'rotate-180' : ''} />
        </button>
        <h1 className="text-xl font-bold text-slate-900 ms-4">דוח לרבי</h1>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6" dir="rtl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-1">דוח שבועי</h2>
              <p className="text-zinc-500 font-medium">פרשת {selectedWeek}</p>
            </div>
            <button className="text-blue-600 p-2 bg-blue-50 rounded-lg">
              <Printer size={20} />
            </button>
          </div>

          <div className="mb-6 text-slate-800 font-medium leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-100 italic">
            [כאן יופיע נוסח הפתיחה לרבי]
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-4">סיכום</h3>
            <div className="flex gap-4 text-center">
              <div className="flex-1 bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                <div className="text-xl font-bold text-slate-900">{totalTefillin}</div>
                <div className="text-xs text-zinc-500 font-medium">סה״כ תפילין</div>
              </div>
              <div className="flex-1 bg-amber-50 p-3 rounded-xl border border-amber-100">
                <div className="text-xl font-bold text-amber-700">{totalKarkeftas}</div>
                <div className="text-xs text-amber-600 font-medium">קרקפתות 💎</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-4">פירוט משתתפים פעילים השבוע</h3>
            <div className="space-y-3">
              {activeUserStats.map(user => (
                <div key={user.id} className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <div className="font-semibold text-slate-900">
                    {user.firstName} בן {user.mothersName || '____'} {user.lastName}
                  </div>
                  <div className="text-left font-bold text-slate-700 w-24">
                    {user.amount} <span className="text-xs font-normal text-zinc-400 ms-1">תפילין</span>
                    {user.karkeftas > 0 && <div className="text-[10px] text-amber-600">({user.karkeftas} קרקפתא)</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-slate-800 font-medium leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-100 italic">
            [כאן תופיע החתימה]
          </div>
        </div>
      </div>
    </div>
  );
};
