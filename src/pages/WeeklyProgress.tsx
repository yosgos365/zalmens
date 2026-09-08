import React from 'react';
import { useAppContext } from '../store';
import { t } from '../i18n';
import { ArrowLeft } from 'lucide-react';

export const WeeklyProgress = () => {
  const { language, navigate } = useAppContext();

  const mockWeeks = [
    { name: 'Bereshit', tefillin: 450, karkeftas: 12 },
    { name: 'Noach', tefillin: 520, karkeftas: 8 },
    { name: 'Lech Lecha', tefillin: 600, karkeftas: 15 },
    { name: 'Vayeira', tefillin: 480, karkeftas: 5 },
    { name: 'Chayei Sarah', tefillin: 710, karkeftas: 22 },
    { name: 'Toldot', tefillin: 650, karkeftas: 14 },
    { name: 'Vayeitzei', tefillin: 230, karkeftas: 2 }, // Current incomplete week
  ];

  const maxTefillin = Math.max(...mockWeeks.map(w => w.tefillin));

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto pb-20">
      <div className="flex items-center p-6 border-b border-zinc-100">
        <button onClick={() => navigate('profile')} className="p-2 -ms-2 text-zinc-400 active:text-zinc-600">
          <ArrowLeft size={24} className={language === 'he' ? 'rotate-180' : ''} />
        </button>
        <h1 className="text-xl font-bold text-slate-900 ms-4">
          {language === 'he' ? 'התקדמות שבועית' : 'Weekly Progress'}
        </h1>
      </div>

      <div className="p-6">
        <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-3xl font-black text-slate-900">3,640</div>
              <div className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mt-1">Total in 7 weeks</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-amber-600">78</div>
              <div className="text-sm font-semibold text-zinc-400">Karkefta 💎</div>
            </div>
          </div>

          <div className="space-y-4">
            {mockWeeks.map((week) => (
              <div key={week.name} className="flex items-center gap-4">
                <div className="w-24 text-xs font-semibold text-slate-600 truncate">
                  {week.name}
                </div>
                <div className="flex-1 h-6 bg-white rounded-full overflow-hidden flex relative">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(week.tefillin / maxTefillin) * 100}%` }}
                  />
                  <div className="absolute inset-y-0 left-2 flex items-center text-[10px] font-bold text-white">
                    {week.tefillin}
                  </div>
                </div>
                <div className="w-8 text-right text-xs font-bold text-amber-500">
                  {week.karkeftas > 0 ? week.karkeftas : ''}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 text-blue-800 p-4 rounded-xl">
          <div className="font-bold mb-1">{language === 'he' ? 'קצב נדרש' : 'Required Pace'}</div>
          <p className="text-sm font-medium opacity-90">
            {language === 'he' 
              ? 'כדי להגיע ליעד של 80,000 עד סוף השנה, יש לשמור על ממוצע של 1,500 הנחות בשבוע.' 
              : 'To reach the 80,000 goal by end of year, an average of 1,500 reports per week is required.'}
          </p>
        </div>
      </div>
    </div>
  );
};
