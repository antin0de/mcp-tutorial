import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ChapterProgress {
  completed: boolean;
  lastAccessedAt: number;
}

export interface ProgressState {
  chapters: Record<string, ChapterProgress>;
  currentChapter: string | null;
  markChapterComplete: (chapterId: string) => void;
  setCurrentChapter: (chapterId: string) => void;
  resetProgress: () => void;
  hydrate: () => void;
}

const initialState = {
  chapters: {},
  currentChapter: null,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      ...initialState,
      markChapterComplete: (chapterId) =>
        set((state) => ({
          chapters: {
            ...state.chapters,
            [chapterId]: {
              completed: true,
              lastAccessedAt: Date.now(),
            },
          },
        })),
      setCurrentChapter: (chapterId) =>
        set({ currentChapter: chapterId }),
      resetProgress: () => set(initialState),
      hydrate: () => {
        // This is called by ProgressProvider on mount
        // The persist middleware handles hydration automatically
        // This function exists for explicit control if needed
      },
    }),
    {
      name: "mcp-tutorial-progress",
      skipHydration: true, // We'll hydrate manually in ProgressProvider
    }
  )
);

/**
 * Check if a chapter (module/section) is completed
 */
export const useChapterCompleted = (chapterId: string): boolean => {
  return useProgressStore((state) => state.chapters[chapterId]?.completed ?? false);
};

/**
 * Get completed module IDs from chapter progress
 * Chapters are formatted as "moduleId/slug"
 */
export const useCompletedModules = (): string[] => {
  const chapters = useProgressStore((state) => state.chapters);
  const completedModules = new Set<string>();

  Object.entries(chapters).forEach(([chapterId, progress]) => {
    if (progress.completed) {
      const [moduleId] = chapterId.split('/');
      completedModules.add(moduleId);
    }
  });

  return Array.from(completedModules);
};

/**
 * Check if a module is completed or current
 */
export const useModuleProgress = (moduleId: string): { isCompleted: boolean; isCurrent: boolean } => {
  const chapters = useProgressStore((state) => state.chapters);
  const currentChapter = useProgressStore((state) => state.currentChapter);

  // Check if any chapter in this module is completed
  const isCompleted = Object.entries(chapters).some(([chapterId, progress]) =>
    chapterId.startsWith(`${moduleId}/`) && progress.completed
  );

  // Check if the current chapter is in this module
  const isCurrent = currentChapter?.startsWith(`${moduleId}/`) ?? false;

  return { isCompleted, isCurrent };
};
