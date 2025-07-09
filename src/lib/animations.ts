import type { Variants } from "framer-motion";
import { APP_CONFIG } from "@/constants/app-config";

// 共通のアニメーションバリアント
export const fadeInUp: Variants = {
	initial: { opacity: 0, y: 50 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -50 },
};

export const fadeInDown: Variants = {
	initial: { opacity: 0, y: -50 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: 50 },
};

export const fadeInLeft: Variants = {
	initial: { opacity: 0, x: -50 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: 50 },
};

export const fadeInRight: Variants = {
	initial: { opacity: 0, x: 50 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -50 },
};

export const scaleIn: Variants = {
	initial: { opacity: 0, scale: 0.9 },
	animate: { opacity: 1, scale: 1 },
	exit: { opacity: 0, scale: 0.9 },
};

export const slideIn: Variants = {
	initial: { opacity: 0, x: 300 },
	animate: { opacity: 1, x: 0 },
	exit: { opacity: 0, x: -300 },
};

// 共通のトランジション設定
export const getTransition = (
	duration?: keyof typeof APP_CONFIG.animation.duration,
	delay?: number,
) => ({
	duration: duration
		? APP_CONFIG.animation.duration[duration]
		: APP_CONFIG.animation.duration.normal,
	delay: delay || 0,
});

// スタガーアニメーション用のトランジション
export const getStaggerTransition = (index: number, baseDelay: number = 0) => ({
	...getTransition(),
	delay: baseDelay + index * APP_CONFIG.animation.delay.stagger,
});

// カードホバーアニメーション
export const cardHover = {
	scale: 1.05,
	y: -10,
};

// 無限リピートアニメーション（カーソル点滅など）
export const infiniteRepeat = {
	repeat: Number.POSITIVE_INFINITY,
	repeatType: "reverse" as const,
};
