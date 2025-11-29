"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { CatCardProps } from "@/types/cat";

const SWIPE_THRESHOLD = 100;
const FALLBACK_IMAGE = "/404.jpg";

export function CatCard({ imageUrl, onSwipe, index }: CatCardProps) {
	const [imgError, setImgError] = useState(false);
	const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

	const x = useMotionValue(0);
	const rotate = useTransform(x, [-300, 300], [-15, 15]);
	const opacity = useTransform(
		x,
		[-300, -SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD, 300],
		[0, 1, 1, 1, 0]
	);

	const handleDragEnd = () => {
		const xValue = x.get();

		if (Math.abs(xValue) > SWIPE_THRESHOLD) {
			onSwipe(xValue > 0 ? "right" : "left");
		} else {
			x.set(0);
		}
	};

	// notes: i have to provide a fallback img due to
	// the fact that the api sometimes returns a 500 error
	const handleImageError = () => {
		if (!imgError) {
			setImgError(true);
			setCurrentImageUrl(FALLBACK_IMAGE);
		}
	};

	return (
		<motion.div
			className="absolute inset-0 w-full h-full touch-none select-none"
			style={{
				x,
				rotate,
				opacity,
				zIndex: 10 - index,
				cursor: index === 0 ? "grab" : "default",
			}}
			drag={index === 0 ? "x" : false}
			dragConstraints={{ left: -300, right: 300 }}
			dragElastic={0.2}
			onDragEnd={handleDragEnd}
			whileDrag={{ scale: 1.05, cursor: "grabbing" }}
			initial={{ scale: 0.9, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
		>
			<div className="relative w-full h-full rounded-3xl overflow-hidden">
				<Image
					src={currentImageUrl}
					alt="Cat"
					fill
					className="object-cover"
					priority={index === 0}
					loading={index === 0 ? undefined : "lazy"}
					sizes="(max-width: 768px) 100vw, 500px"
					draggable={false}
					onError={handleImageError}
				/>
			</div>
		</motion.div>
	);
}
