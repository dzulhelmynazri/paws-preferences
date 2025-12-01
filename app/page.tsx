"use client";

import useSWR from "swr";
import { FileIcon, PawPrint } from "lucide-react";
import Confetti from "react-confetti";
import { CatStack } from "@/components/CatStack";
import { CatSummary } from "@/components/CatSummary";
import { Button } from "@/components/ui/button";
import { AlertDialogInfo } from "@/components/AlertDialogInfo";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { type Cat } from "@/types/cat";
import { useCatSummaryStore } from "@/stores/cat-summary-store";
import { useConfetti } from "@/hooks/use-confetti";
import { fetchRandomCats } from "@/lib/cataas";
import CircularGallery from "@/components/CircularGallery";

const TOTAL_CATS = 15;

export default function Home() {
	const { likedCats, showSummary, setLikedCats, setShowSummary, reset } =
		useCatSummaryStore();

	const { showConfetti, windowDimensions } = useConfetti({
		trigger: showSummary,
	});

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
			<div className="flex mx-auto text-center flex-col space-y-4 items-center justify-center min-h-screen">
				<PawPrint className="size-6 animate-spin" />
				<span className="text-muted-foreground">Loading adorable cats...</span>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex mx-auto text-center flex-col space-y-4 items-center justify-center min-h-screen">
				<Empty>
					<EmptyHeader>
						<EmptyMedia
							variant="icon"
							className="rounded-full size-12 ring-1 ring-gray-200 ring-offset-2 ring-offset-background"
						>
							<FileIcon />
						</EmptyMedia>
						<EmptyTitle>No data</EmptyTitle>
						<EmptyDescription>No data found</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button
							onClick={handleReset}
							className="rounded-full ring-1 ring-dashed ring-border ring-offset-2 ring-offset-background"
						>
							Refresh
						</Button>
					</EmptyContent>
				</Empty>
			</div>
		);
	}

	return (
		<div className="w-full relative mx-auto flex flex-col items-center px-4 py-8 max-w-3xl text-center max-h-screen">
			<div className="text-3xl font-bold mb-2">Paws & Preferences</div>
			<div className="text-lg text-muted-foreground mb-4">
				Swipe right to like, left to dislike
			</div>

			<div style={{ height: "600px", position: "relative" }}>
				<CircularGallery
					bend={3}
					textColor="#ffffff"
					borderRadius={0.05}
					scrollEase={0.02}
				/>
			</div>

			{cats && <CatStack cats={cats} onComplete={handleComplete} />}

			<div className="mt-4 fixed bottom-4 right-4">
				<AlertDialogInfo />
			</div>
		</div>
	);
}
