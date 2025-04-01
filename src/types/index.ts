export type Tag = '🔥 Urgent' | '🏠 Remote' | '⭐ Dream Job' | '⏳ Follow Up' | '🤝 Referred';

export type Column = {
  id: string;
  title: string;
  icon: string;
  cards: JobCard[];
};

export type JobCard = {
  id: string;
  title: string;
  company: string;
  description?: string;
  jobLink?: string;
  minExperience?: string;
  tags: Tag[];
  isPinned: boolean;
  columnId: string;
  dateCreated: string;
  actionTask?: string;
  actionDate?: string;
};

export type Theme = {
  mode: 'light' | 'dark';
  primaryColor: string;
};

export type Settings = {
  theme: Theme;
};