"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Github, Mail, Sparkles, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTypingAnimation } from "@/hooks/use-typing-animation";

export function HeroSection() {
	const names = ["suzuki3jp", "森 滉樹", "Kouki Mori"];
	const displayText = useTypingAnimation(names, 2000, 150, 75);

	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

	return (
		<motion.section
			className="relative h-screen flex items-center justify-center overflow-hidden"
			style={{ y, opacity }}
		>
			{/* Background Effects */}
			<div className="absolute inset-0">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className="mb-8"
				>
					<div className="flex items-center justify-center mb-4">
						<Sparkles className="w-8 h-8 text-blue-400 mr-3" />
						<span className="text-blue-400 font-medium">
							Welcome to my portfolio
						</span>
					</div>

					<h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
						<span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
							{displayText}
							<motion.span
								animate={{ opacity: [1, 0] }}
								transition={{
									duration: 0.8,
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "reverse",
								}}
								className="text-blue-400"
							>
								|
							</motion.span>
						</span>
					</h1>

					<p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
						Student Developer & Otaku
						<br />
						<span className="text-lg text-gray-400">
							日頃のちょっとした不便をテクノロジーで解決
						</span>
					</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
					className="flex flex-wrap justify-center gap-4 mb-12"
				>
					<Button
						size="lg"
						className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
					>
						<Github className="w-5 h-5 mr-2" />
						GitHub
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="border-white/20 text-white hover:bg-white/10 bg-transparent"
					>
						<Twitter className="w-5 h-5 mr-2" />
						Twitter
					</Button>
					<Button
						size="lg"
						variant="outline"
						className="border-white/20 text-white hover:bg-white/10 bg-transparent"
					>
						<Mail className="w-5 h-5 mr-2" />
						Contact
					</Button>
				</motion.div>
			</div>

			<motion.div
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
				animate={{ y: [0, 10, 0] }}
				transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
			>
				<ChevronDown className="w-8 h-8 text-white/60" />
			</motion.div>
		</motion.section>
	);
}
