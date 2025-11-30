"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { CatSummaryProps } from "@/types/cat";

export function CatSummary({ likedCats, totalCats, onReset }: CatSummaryProps) {
	return (
		<div className="w-full max-w-3xl mx-auto px-4 py-8 text-center">
			<div className="text-3xl font-bold mb-2 ">Your Favourite Kitties!</div>
			<div className="text-lg text-muted-foreground mb-8">
				You liked {likedCats.length} out of {totalCats} cats
			</div>

			{likedCats.length === 0 ? (
				<div className="mb-8">No cats were liked this time. Try again!</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
					{likedCats.map((cat) => (
						<div
							key={cat.id}
							className="relative aspect-square rounded-2xl overflow-hidden"
						>
							<Image
								key={cat.id}
								src={cat.url}
								alt="Liked cat"
								fill
								priority
								className="object-cover"
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
							/>
						</div>
					))}
				</div>
			)}

			<Button size="lg" onClick={onReset} className="w-full cursor-pointer">
				<RotateCcw className="size-5" />
				Start Over
			</Button>
		</div>
	);
}
