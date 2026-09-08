export type Language = 'en' | 'he';

export type UserRole = 'participant' | 'manager';

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  mothersName?: string;
  commitment: number;
  isPrivate: boolean;
  role: UserRole;
  language: Language;
}

export interface Report {
  id: string;
  userId: string;
  amount: number;
  karkeftas: number;
  date: string; // ISO string
  hebrewDate: string;
  parasha: string;
}

export interface ActivityEvent {
  id: string;
  userId: string;
  type: 'report' | 'milestone' | 'karkefta';
  messageEn: string;
  messageHe: string;
  timestamp: string;
  likes: number;
  hasLiked: boolean;
}
