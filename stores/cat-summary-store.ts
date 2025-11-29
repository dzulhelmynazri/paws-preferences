import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Cat } from "@/types/cat";

interface CatSummaryStoreProps {
	likedCats: Cat[];
	showSummary: boolean;
	setLikedCats: (cats: Cat[]) => void;
	setShowSummary: (show: boolean) => void;
	reset: () => void;
}

export const useCatSummaryStore = create<CatSummaryStoreProps>()(
	persist(
		(set) => ({
			likedCats: [],
			showSummary: false,
			setLikedCats: (cats) => set({ likedCats: cats }),
			setShowSummary: (show) => set({ showSummary: show }),
			reset: () => set({ likedCats: [], showSummary: false }),
		}),
		{
			name: "paws-preferences-storage",
		}
	)
);
