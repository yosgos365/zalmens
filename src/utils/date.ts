export const formatDistanceToNow = (date: Date, lang: 'en' | 'he'): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHrs = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHrs / 24);

  if (diffMins < 1) return lang === 'he' ? 'עכשיו' : 'Just now';
  if (diffMins < 60) return lang === 'he' ? `לפני ${diffMins} דקות` : `${diffMins}m ago`;
  if (diffHrs < 24) return lang === 'he' ? `לפני ${diffHrs} שעות` : `${diffHrs}h ago`;
  if (diffDays === 1) return lang === 'he' ? 'אתמול' : 'Yesterday';
  return lang === 'he' ? `לפני ${diffDays} ימים` : `${diffDays}d ago`;
};
