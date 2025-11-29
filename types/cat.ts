export interface Cat {
	id: string;
	url: string;
}

export interface CatCardProps {
	imageUrl: string;
	onSwipe: (direction: "left" | "right") => void;
	index: number;
}

export interface CatStackProps {
	cats: Cat[];
	onComplete: (likedCats: Cat[]) => void;
}

export interface CatSummaryProps {
	likedCats: Cat[];
	totalCats: number;
	onReset: () => void;
}
