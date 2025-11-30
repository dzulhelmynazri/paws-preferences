"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { CatCardProps } from "@/types/cat";

const SWIPE_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 500;
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

	const handleDragEnd = (
		_event: MouseEvent | TouchEvent | PointerEvent,
		info: PanInfo
	) => {
		const xValue = x.get();
		const velocity = info.velocity.x;

		if (
			Math.abs(xValue) > SWIPE_THRESHOLD ||
			Math.abs(velocity) > VELOCITY_THRESHOLD
		) {
			onSwipe(xValue > 0 || velocity > 0 ? "right" : "left");
		} else {
			x.set(0);
		}
	};

	const handleImageError = () => {
		if (!imgError) {
			setImgError(true);
			setCurrentImageUrl(FALLBACK_IMAGE);
		}
	};

	return (
		<motion.div
			className="absolute inset-0 touch-none select-none"
			style={{
				x,
				rotate,
				opacity,
				zIndex: 10 - index,
				cursor: index === 0 ? "grab" : "default",
			}}
			drag={index === 0 ? "x" : false}
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.8}
			dragMomentum={true}
			dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
			onDragEnd={handleDragEnd}
			whileDrag={{ scale: 1.05, cursor: "grabbing" }}
			initial={{ scale: 0.9, opacity: 0 }}
			animate={{ scale: 1, opacity: 1 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
		>
			<div className="relative w-full h-full rounded-3xl overflow-hidden ring-2 ring-gray-200 ring-offset-2 ring-offset-background">
				<Image
					src={currentImageUrl}
					alt="Cat"
					fill
					className="object-cover pointer-events-none"
					priority
					sizes="(max-width: 768px) 100vw, 500px"
					draggable={false}
					onError={handleImageError}
				/>
			</div>
		</motion.div>
	);
}
