import React from 'react';
import { useAppContext } from '../store';
import { t } from '../i18n';
import { ArrowLeft, Trash2, Edit2 } from 'lucide-react';

export const MyReports = () => {
  const { language, navigate, reports, currentUser } = useAppContext();
  
  const userReports = reports.filter(r => r.userId === currentUser?.id);

  return (
    <div className="flex flex-col h-full bg-zinc-50">
      <div className="flex items-center p-4 bg-white border-b border-zinc-100 sticky top-0 z-10 shrink-0">
        <button onClick={() => navigate('profile')} className="p-2 -ms-2 text-zinc-400 active:text-zinc-600">
          <ArrowLeft size={24} className={language === 'he' ? 'rotate-180' : ''} />
        </button>
        <h1 className="text-lg font-bold text-slate-900 ms-3">{t('myReports', language)}</h1>
      </div>

      <div className="p-4 space-y-3 overflow-y-auto flex-1">
        {userReports.length === 0 ? (
          <div className="text-center text-slate-500 py-10 font-medium">No reports yet</div>
        ) : userReports.map(report => (
          <div key={report.id} className="bg-white p-4 rounded-xl border border-zinc-100 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900">{report.amount} {t('added', language)}</div>
              <div className="text-xs text-slate-500 font-medium mt-1">{new Date(report.date).toLocaleDateString()} • {report.hebrewDate}</div>
              {report.karkeftas > 0 && <div className="text-xs font-bold text-amber-600 mt-1">{report.karkeftas} {t('karkeftas', language)} 💎</div>}
            </div>
            <div className="flex gap-2 text-slate-400">
              <button className="p-2 active:bg-slate-50 rounded-lg"><Edit2 size={16} /></button>
              <button className="p-2 active:bg-slate-50 rounded-lg"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
