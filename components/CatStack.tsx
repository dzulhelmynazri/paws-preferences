"use client";

import { useMemo, useState } from "react";
import { CatCard } from "./CatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X } from "lucide-react";
import { type Cat } from "@/types/cat";
import { CatStackProps } from "@/types/cat";

export function CatStack({ cats, onComplete }: CatStackProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [likedCats, setLikedCats] = useState<Cat[]>([]);

	const handleSwipe = (direction: "left" | "right") => {
		const currentCat = cats[currentIndex];
		const updatedLikedCats =
			direction === "right" ? [...likedCats, currentCat] : likedCats;

		if (currentIndex < cats.length - 1) {
			setCurrentIndex((prev) => prev + 1);
			if (direction === "right") {
				setLikedCats(updatedLikedCats);
			}
		} else {
			onComplete(updatedLikedCats);
		}
	};

	const visibleCats = useMemo(
		() => cats.slice(currentIndex, currentIndex + 5),
		[cats, currentIndex]
	);

	if (!visibleCats.length) return null;

	return (
		<div className="relative w-full max-w-md mx-auto h-[450px]">
			<Badge
				variant="secondary"
				className="z-50 absolute top-4 right-4 py-2 px-4"
			>
				{currentIndex + 1} / {cats.length}
			</Badge>

			{visibleCats.map((cat, index) => (
				<CatCard
					key={`${cat.id}-${currentIndex + index}`}
					imageUrl={cat.url}
					onSwipe={handleSwipe}
					index={index}
				/>
			))}

			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 z-20">
				<Button
					size="lg"
					variant="destructive"
					className="rounded-full size-16 cursor-pointer"
					onClick={() => handleSwipe("left")}
				>
					<X className="size-8" />
				</Button>
				<Button
					size="lg"
					className="rounded-full size-16 cursor-pointer"
					onClick={() => handleSwipe("right")}
				>
					<Heart className="size-8" />
				</Button>
			</div>
		</div>
	);
}
