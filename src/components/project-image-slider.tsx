"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

interface ProjectImageSliderProps {
	images: string[];
	title: string;
	className?: string;
}

export function ProjectImageSlider({
	images,
	title,
	className = "",
}: ProjectImageSliderProps) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const nextImage = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	const prevImage = () => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	const goToImage = (index: number) => {
		setCurrentIndex(index);
	};

	if (images.length === 0) {
		return (
			<div
				className={`bg-gray-800 rounded-xl flex items-center justify-center h-64 md:h-96 ${className}`}
			>
				<span className="text-gray-400">画像がありません</span>
			</div>
		);
	}

	if (images.length === 1) {
		return (
			<div className={`relative overflow-hidden rounded-xl ${className}`}>
				<img
					src={images[0] || "/placeholder.svg"}
					alt={title}
					className="w-full h-64 md:h-96 object-cover"
				/>
			</div>
		);
	}

	return (
		<div className={`relative overflow-hidden rounded-xl group ${className}`}>
			{/* Main Image */}
			<div className="relative h-64 md:h-96 overflow-hidden">
				<AnimatePresence mode="wait">
					<motion.img
						key={currentIndex}
						src={images[currentIndex]}
						alt={`${title} - ${currentIndex + 1}`}
						className="w-full h-full object-contain"
						initial={{ opacity: 0, x: 300 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -300 }}
						transition={{ duration: 0.3 }}
					/>
				</AnimatePresence>

				{/* Navigation Arrows */}
				<div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<Button
						variant="ghost"
						size="icon"
						onClick={prevImage}
						className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
					>
						<ChevronLeft className="w-5 h-5" />
					</Button>
					<Button
						variant="ghost"
						size="icon"
						onClick={nextImage}
						className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
					>
						<ChevronRight className="w-5 h-5" />
					</Button>
				</div>

				{/* Image Counter */}
				<div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm backdrop-blur-sm">
					{currentIndex + 1} / {images.length}
				</div>
			</div>

			{/* Thumbnail Navigation */}
			<div className="flex gap-2 mt-4 overflow-x-auto pb-2">
				{images.map((image, index) => (
					<button
						key={index}
						onClick={() => goToImage(index)}
						className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
							index === currentIndex
								? "border-blue-400 scale-105"
								: "border-transparent hover:border-gray-400"
						}`}
					>
						<img
							src={image || "/placeholder.svg"}
							alt={`${title} thumbnail ${index + 1}`}
							className="w-full h-full object-contain"
						/>
					</button>
				))}
			</div>
		</div>
	);
}
