"use client";

import { AboutSection } from "@/components/home-sections/about-section";
import { HeroSection } from "@/components/home-sections/hero-section";
import { ProjectsPreviewSection } from "@/components/home-sections/projects-preview-section";
import { TechStackSection } from "@/components/home-sections/tech-stack-section";
import { COMMON_STYLES } from "@/constants/app-config";

export default function HomePage() {
	return (
		<div className={`min-h-screen ${COMMON_STYLES.gradients.page}`}>
			<HeroSection />
			<AboutSection />
			<TechStackSection />
			<ProjectsPreviewSection />
		</div>
	);
}
