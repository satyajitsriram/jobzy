import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Column, JobCard, Settings, Tag } from '../types';

interface JobzyState {
  columns: Column[];
  settings: Settings;
  searchTerm: string;
  selectedTags: Tag[];
  viewMode: 'compact' | 'full';
  sort: 'recent' | 'company';
  setSearchTerm: (term: string) => void;
  setSelectedTags: (tags: Tag[]) => void;
  setViewMode: (mode: 'compact' | 'full') => void;
  setSort: (sort: 'recent' | 'company') => void;
  addCard: (card: Omit<JobCard, 'id' | 'dateCreated'>) => void;
  updateCard: (card: JobCard) => void;
  deleteCard: (cardId: string) => void;
  duplicateCard: (card: JobCard) => void;
  moveCard: (cardId: string, sourceColumnId: string, targetColumnId: string) => void;
  toggleCardPin: (cardId: string) => void;
  updateSettings: (settings: Settings) => void;
}

const INITIAL_COLUMNS: Column[] = [
  { id: 'job-list', title: 'Job List', icon: '📋', cards: [] },
  { id: 'referral', title: 'Waiting for Referral', icon: '🤝', cards: [] },
  { id: 'applied', title: 'Applied', icon: '📤', cards: [] },
  { id: 'assessment', title: 'Online Assessment', icon: '📝', cards: [] },
  { id: 'interview', title: 'Interview', icon: '🎤', cards: [] },
  { id: 'offer', title: 'Offer', icon: '🏆', cards: [] },
  { id: 'rejected', title: 'Rejected', icon: '❌', cards: [] },
];

const INITIAL_SETTINGS: Settings = {
  theme: {
    mode: 'light',
    primaryColor: '#3B82F6', // blue-500
  },
};

export const useStore = create<JobzyState>()(
  persist(
    (set) => ({
      columns: INITIAL_COLUMNS,
      settings: INITIAL_SETTINGS,
      searchTerm: '',
      selectedTags: [],
      viewMode: 'full',
      sort: 'recent',

      setSearchTerm: (term) => set({ searchTerm: term }),
      setSelectedTags: (tags) => set({ selectedTags: tags }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setSort: (sort) => set({ sort }),

      addCard: (card) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === card.columnId
              ? {
                  ...col,
                  cards: [
                    ...col.cards,
                    {
                      ...card,
                      id: crypto.randomUUID(),
                      dateCreated: new Date().toISOString(),
                    },
                  ],
                }
              : col
          ),
        })),

      updateCard: (card) =>
        set((state) => ({
          columns: state.columns.map((col) => ({
            ...col,
            cards: col.cards.map((c) => (c.id === card.id ? card : c)),
          })),
        })),

      deleteCard: (cardId) =>
        set((state) => ({
          columns: state.columns.map((col) => ({
            ...col,
            cards: col.cards.filter((c) => c.id !== cardId),
          })),
        })),

      duplicateCard: (card) =>
        set((state) => ({
          columns: state.columns.map((col) =>
            col.id === card.columnId
              ? {
                  ...col,
                  cards: [
                    ...col.cards,
                    {
                      ...card,
                      id: crypto.randomUUID(),
                      dateCreated: new Date().toISOString(),
                      title: `${card.title} (Copy)`,
                    },
                  ],
                }
              : col
          ),
        })),

      moveCard: (cardId, sourceColumnId, targetColumnId) =>
        set((state) => {
          const card = state.columns
            .find((col) => col.id === sourceColumnId)
            ?.cards.find((c) => c.id === cardId);

          if (!card) return state;

          return {
            columns: state.columns.map((col) => {
              if (col.id === sourceColumnId) {
                return {
                  ...col,
                  cards: col.cards.filter((c) => c.id !== cardId),
                };
              }
              if (col.id === targetColumnId) {
                return {
                  ...col,
                  cards: [...col.cards, { ...card, columnId: targetColumnId }],
                };
              }
              return col;
            }),
          };
        }),

      toggleCardPin: (cardId) =>
        set((state) => ({
          columns: state.columns.map((col) => ({
            ...col,
            cards: col.cards.map((c) =>
              c.id === cardId ? { ...c, isPinned: !c.isPinned } : c
            ),
          })),
        })),

      updateSettings: (settings) => set({ settings }),
    }),
    {
      name: 'jobzy-storage',
    }
  )
);