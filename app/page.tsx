"use client";

import useSWR from "swr";
import { CatStack } from "@/components/CatStack";
import { CatSummary } from "@/components/CatSummary";
import { Spinner } from "@/components/ui/spinner";
import Confetti from "react-confetti";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { FileIcon } from "lucide-react";
import { useCatSummaryStore } from "@/stores/cat-summary-store";
import { type Cat } from "@/types/cat";
import { useConfetti } from "@/hooks/use-confetti";
import { fetchRandomCats } from "@/lib/cataas";

const TOTAL_CATS = 15;

export default function Home() {
	const { likedCats, showSummary, setLikedCats, setShowSummary, reset } =
		useCatSummaryStore();

	const {
		data: cats,
		error,
		isLoading,
		mutate,
	} = useSWR("random-cats", () => fetchRandomCats(TOTAL_CATS), {
		revalidateOnFocus: false,
	});

	const handleComplete = (liked: Cat[]) => {
		setLikedCats(liked);
		setShowSummary(true);
	};

	const handleReset = async () => {
		reset();
		await mutate();
	};

	const { showConfetti, windowDimensions } = useConfetti({
		trigger: showSummary,
	});

	if (showSummary) {
		return (
			<>
				{showConfetti && (
					<Confetti
						width={windowDimensions.width}
						height={windowDimensions.height}
						recycle={false}
						numberOfPieces={500}
					/>
				)}
				<CatSummary
					likedCats={likedCats}
					totalCats={TOTAL_CATS}
					onReset={handleReset}
				/>
			</>
		);
	}

	if (isLoading) {
		return (
			<div className="flex text-center flex-col space-y-4 items-center justify-center min-h-screen">
				<Spinner className="size-6" />
				<span className="text-muted-foreground">Loading adorable cats...</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex text-center flex-col space-y-4 items-center justify-center min-h-screen">
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<FileIcon />
						</EmptyMedia>
						<EmptyTitle>No data</EmptyTitle>
						<EmptyDescription>No data found</EmptyDescription>
					</EmptyHeader>
				</Empty>
			</div>
		);
	}

	return (
		<div className="w-full mx-auto flex flex-col items-center px-4 pt-4 max-w-3xl min-h-screen">
			<div className="text-3xl font-bold mb-2">Paws & Preferences</div>
			<div className="text-lg text-muted-foreground mb-8">
				Swipe right to like, left to dislike
			</div>

			{cats && <CatStack cats={cats} onComplete={handleComplete} />}
		</div>
	);
}
