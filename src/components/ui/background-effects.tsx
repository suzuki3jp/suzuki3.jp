"use client";

interface BackgroundEffectsProps {
	variant?: "hero" | "section";
}

export function BackgroundEffects({
	variant = "section",
}: BackgroundEffectsProps) {
	if (variant === "hero") {
		return (
			<div className="absolute inset-0">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
			</div>
		);
	}

	return (
		<div className="absolute inset-0 pointer-events-none">
			<div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full blur-xl" />
			<div className="absolute -bottom-4 -right-4 w-8 h-8 bg-cyan-500/20 rounded-full blur-xl" />
		</div>
	);
}
