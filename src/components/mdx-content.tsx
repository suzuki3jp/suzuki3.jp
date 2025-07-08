"use client";

import { motion } from "framer-motion";
import type React from "react";

interface MDXContentProps {
	content: string;
}

export function MDXContent({ content }: MDXContentProps) {
	const parseContent = (content: string) => {
		const lines = content.split("\n");
		const elements: React.JSX.Element[] = [];
		let inCodeBlock = false;
		let codeBlockContent = "";
		let codeBlockLang = "";

		lines.forEach((line, index) => {
			// コードブロックの処理
			if (line.startsWith("```")) {
				if (!inCodeBlock) {
					inCodeBlock = true;
					codeBlockLang = line.replace("```", "");
					codeBlockContent = "";
				} else {
					inCodeBlock = false;
					elements.push(
						<div
							key={index}
							className="bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto"
						>
							<pre className="text-green-400 text-sm">
								<code>{codeBlockContent}</code>
							</pre>
						</div>,
					);
				}
				return;
			}

			if (inCodeBlock) {
				codeBlockContent += line + "\n";
				return;
			}

			// 見出しの処理
			if (line.startsWith("# ")) {
				elements.push(
					<h1
						key={index}
						className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0"
					>
						{line.replace("# ", "")}
					</h1>,
				);
			} else if (line.startsWith("## ")) {
				elements.push(
					<h2 key={index} className="text-2xl font-bold text-white mb-4 mt-6">
						{line.replace("## ", "")}
					</h2>,
				);
			} else if (line.startsWith("### ")) {
				elements.push(
					<h3 key={index} className="text-xl font-bold text-white mb-3 mt-4">
						{line.replace("### ", "")}
					</h3>,
				);
			} else if (line.startsWith("- ")) {
				// リストアイテムの処理（黒点の重複を避ける）
				const listContent = line.replace("- ", "");
				const processedContent = processBoldText(listContent);
				elements.push(
					<li key={index} className="text-gray-300 mb-2 ml-4 list-disc">
						{processedContent}
					</li>,
				);
			} else if (line.trim() !== "") {
				// 通常の段落の処理
				const processedContent = processBoldText(line);
				elements.push(
					<p key={index} className="text-gray-300 mb-4 leading-relaxed">
						{processedContent}
					</p>,
				);
			}
		});

		return elements;
	};

	// **bold** テキストを処理する関数
	const processBoldText = (text: string) => {
		const parts = text.split(/(\*\*.*?\*\*)/);
		return parts.map((part, index) => {
			if (part.startsWith("**") && part.endsWith("**")) {
				const boldText = part.slice(2, -2);
				return (
					<strong key={index} className="font-bold text-white">
						{boldText}
					</strong>
				);
			}
			return part;
		});
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="prose prose-invert max-w-none"
		>
			{parseContent(content)}
		</motion.div>
	);
}
