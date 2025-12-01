"use client";

// import Image from "next/image";
import { RotateCcw, Cat } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import BounceCards from "./BounceCards";
import { CatSummaryProps } from "@/types/cat";

const transformStyles = [
	"rotate(5deg) translate(-150px)",
	"rotate(0deg) translate(-70px)",
	"rotate(-5deg)",
	"rotate(5deg) translate(70px)",
	"rotate(-5deg) translate(150px)",
];

export function CatSummary({ likedCats, totalCats, onReset }: CatSummaryProps) {
	return (
		<div className="w-full max-w-3xl mx-auto px-4 py-8 text-center">
			<div className="text-3xl font-bold mb-2 ">Your Favourite Kitties!</div>
			<div className="text-lg text-muted-foreground mb-4">
				You liked {likedCats.length} out of {totalCats} cats
			</div>

			{likedCats.length === 0 ? (
				<div className="flex mx-auto text-center mb-8 flex-col space-y-4 items-center justify-center">
					<Empty>
						<EmptyHeader>
							<EmptyMedia
								variant="icon"
								className="rounded-full size-12 ring-1 ring-gray-200 ring-offset-2 ring-offset-background"
							>
								<Cat />
							</EmptyMedia>
							<EmptyTitle>Try again</EmptyTitle>
							<EmptyDescription>No cats were liked this time!</EmptyDescription>
						</EmptyHeader>
					</Empty>
				</div>
			) : (
				// <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
				<div className="flex flex-row pt-16 pb-12 flex-wrap w-full mx-auto overflow-hidden justify-center relative">
					{likedCats.map((cat) => (
						<div
							key={cat.id}
							// className="relative aspect-square rounded-2xl overflow-hidden ring-2 ring-gray-200 ring-offset-2 ring-offset-background"
							className="z-10"
						>
							{/* <Image
								key={cat.id}
								src={cat.url}
								alt="Liked cat"
								fill
								priority
								className="object-cover"
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
							/> */}

							<BounceCards
								className="custom-bounceCards absolute top-0 left-38 hover:z-10"
								images={[cat.url]}
								containerWidth={140}
								containerHeight={160}
								animationDelay={1}
								animationStagger={0.1}
								easeType="elastic.out(1, 0.5)"
								transformStyles={transformStyles}
								enableHover={false}
							/>
						</div>
					))}
				</div>
			)}

			<Button
				size="lg"
				onClick={onReset}
				className="w-full cursor-pointer rounded-full ring-2 ring-gray-200 ring-offset-2 ring-offset-background"
			>
				<RotateCcw className="size-5" />
				Start Over
			</Button>
		</div>
	);
}
