// アプリケーション全体で使用する定数
export const APP_CONFIG = {
	// アニメーション設定
	animation: {
		duration: {
			fast: 0.3,
			normal: 0.8,
			slow: 1.0,
		},
		delay: {
			stagger: 0.1,
			card: 0.2,
		},
	},
	// レスポンシブブレイクポイント
	breakpoints: {
		sm: "640px",
		md: "768px",
		lg: "1024px",
		xl: "1280px",
	},
	// プロジェクト設定
	projects: {
		previewCount: 3,
		imageHeight: "h-48", // 192px
	},
	// タイピングアニメーション設定
	typing: {
		names: ["suzuki3jp", "森 滉樹", "Kouki Mori"],
		typeSpeed: 150,
		deleteSpeed: 75,
		pauseDuration: 2000,
	},
} as const;

// 共通のスタイルクラス
export const COMMON_STYLES = {
	// グラデーション背景
	gradients: {
		page: "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900",
		card: "bg-gradient-to-br from-white/10 to-white/5",
		text: "bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent",
		button:
			"bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600",
	},
	// カード共通スタイル
	card: {
		base: "backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300",
		interactive: "group hover:scale-105 hover:-translate-y-2",
	},
	// テキストスタイル
	text: {
		heading: "font-bold text-white",
		subheading: "text-gray-300",
		accent: "text-blue-400",
		muted: "text-gray-400",
	},
	// レイアウト
	layout: {
		container: "max-w-6xl mx-auto px-4",
		section: "py-20 px-4 md:px-8",
		grid: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
	},
} as const;
