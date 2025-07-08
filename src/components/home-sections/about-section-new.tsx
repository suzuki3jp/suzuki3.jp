"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, Container } from "@/components/layout/section";
import { BackgroundEffects } from "@/components/ui/background-effects";
import { COMMON_STYLES } from "@/constants/app-config";
import { getTransition, scaleIn } from "@/lib/animations";

export function AboutSection() {
	return (
		<Section>
			<Container size="md">
				<SectionHeader title="About Me" />

				<motion.div
					className={`relative ${COMMON_STYLES.gradients.card} ${COMMON_STYLES.card.base} rounded-2xl p-8`}
					variants={scaleIn}
					initial="initial"
					whileInView="animate"
					transition={getTransition()}
					viewport={{ once: true }}
				>
					<BackgroundEffects />

					<p
						className={`text-lg ${COMMON_STYLES.text.subheading} leading-relaxed`}
					>
						日頃感じているちょっとした不便を解決するために、個人開発を行っています。
						主に TypeScript を使用してきましたが、今後 Go や Rust
						などの言語にも挑戦していきたいと考えています。
						新しいことを知ることが好きで、小さいころから知的好奇心が旺盛です。
					</p>
				</motion.div>
			</Container>
		</Section>
	);
}
