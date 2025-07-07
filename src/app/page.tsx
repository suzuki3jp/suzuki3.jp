"use client";

import { AboutSection } from "@/components/home-sections/about-section";
import { HeroSection } from "@/components/home-sections/hero-section";
import { ProjectsPreviewSection } from "@/components/home-sections/projects-preview-section";
import { TechStackSection } from "@/components/home-sections/tech-stack-section";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
			<HeroSection />
			<AboutSection />
			<TechStackSection />
			<ProjectsPreviewSection />
		</div>
	);
}
