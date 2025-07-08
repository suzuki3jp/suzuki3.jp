"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Github, Mail, Sparkles, Twitter } from "lucide-react";
import { BackgroundEffects } from "@/components/ui/background-effects";
import { Button } from "@/components/ui/button";
import { APP_CONFIG, COMMON_STYLES } from "@/constants/app-config";
import { useTypingAnimation } from "@/hooks/use-typing-animation";
import { fadeInUp, getTransition, infiniteRepeat } from "@/lib/animations";

export function HeroSection() {
	const displayText = useTypingAnimation(
		[...APP_CONFIG.typing.names], // readonly配列をmutableに変換
		APP_CONFIG.typing.pauseDuration,
		APP_CONFIG.typing.typeSpeed,
		APP_CONFIG.typing.deleteSpeed,
	);

	const { scrollYProgress } = useScroll();
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

	return (
		<motion.section
			className="relative h-screen flex items-center justify-center overflow-hidden"
			style={{ y, opacity }}
		>
			<BackgroundEffects variant="hero" />

			<div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
				<motion.div
					variants={fadeInUp}
					initial="initial"
					animate="animate"
					transition={getTransition("slow")}
					className="mb-8"
				>
					<div className="flex items-center justify-center mb-4">
						<Sparkles className={`w-8 h-8 ${COMMON_STYLES.text.accent} mr-3`} />
						<span className={`${COMMON_STYLES.text.accent} font-medium`}>
							Welcome to my portfolio
						</span>
					</div>

					<h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
						<span className={COMMON_STYLES.gradients.text}>
							{displayText}
							<motion.span
								animate={{ opacity: [1, 0] }}
								transition={{
									duration: 0.8,
									...infiniteRepeat,
								}}
								className={COMMON_STYLES.text.accent}
							>
								|
							</motion.span>
						</span>
					</h1>

					<p
						className={`text-xl md:text-2xl ${COMMON_STYLES.text.subheading} max-w-2xl mx-auto leading-relaxed`}
					>
						Student Developer & Otaku
						<br />
						<span className={`text-lg ${COMMON_STYLES.text.muted}`}>
							日頃のちょっとした不便をテクノロジーで解決
						</span>
					</p>
				</motion.div>

				<motion.div
					variants={fadeInUp}
					initial="initial"
					animate="animate"
					transition={getTransition("slow", 0.5)}
					className="flex flex-wrap justify-center gap-4 mb-12"
				>
					<Button
						size="lg"
						className={`${COMMON_STYLES.gradients.button} text-white border-0`}
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
				transition={{ duration: 2, ...infiniteRepeat }}
			>
				<ChevronDown className="w-8 h-8 text-white/60" />
			</motion.div>
		</motion.section>
	);
}
