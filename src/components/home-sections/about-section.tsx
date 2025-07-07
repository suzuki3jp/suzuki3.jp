"use client";

import { motion } from "framer-motion";

export function AboutSection() {
	return (
		<motion.section
			className="py-20 px-4 md:px-8 relative"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			viewport={{ once: true }}
		>
			<div className="max-w-4xl mx-auto">
				<motion.h2
					className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					About Me
				</motion.h2>

				<motion.div
					className="relative backdrop-blur-lg bg-gradient-to-r from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 shadow-2xl"
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full blur-xl" />
					<div className="absolute -bottom-4 -right-4 w-8 h-8 bg-cyan-500/20 rounded-full blur-xl" />

					<p className="text-lg text-gray-300 leading-relaxed">
						日頃感じているちょっとした不便を解決するために、個人開発を行っています。
						主に TypeScript を使用してきましたが、今後 Go や Rust
						などの言語にも挑戦していきたいと考えています。
						新しいことを知ることが好きで、小さいころから知的好奇心が旺盛です。
					</p>
				</motion.div>
			</div>
		</motion.section>
	);
}
