"use client";

import { evaluate } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import { motion } from "framer-motion";
import type React from "react";
import {  useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";

interface MDXContentProps {
	content: string;
}

// MDXコンポーネントのカスタムスタイリング
const mdxComponents = {
	h1: ({ children }: { children: React.ReactNode }) => (
		<h1 className="text-3xl font-bold text-white mb-6 mt-8 first:mt-0">
			{children}
		</h1>
	),
	h2: ({ children }: { children: React.ReactNode }) => (
		<h2 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h2>
	),
	h3: ({ children }: { children: React.ReactNode }) => (
		<h3 className="text-xl font-bold text-white mb-3 mt-4">{children}</h3>
	),
	p: ({ children }: { children: React.ReactNode }) => (
		<p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
	),
	ul: ({ children }: { children: React.ReactNode }) => (
		<ul className="text-gray-300 mb-4 ml-4 list-disc space-y-2">{children}</ul>
	),
	li: ({ children }: { children: React.ReactNode }) => (
		<li className="text-gray-300">{children}</li>
	),
	strong: ({ children }: { children: React.ReactNode }) => (
		<strong className="font-bold text-white">{children}</strong>
	),
	code: ({ children }: { children: React.ReactNode }) => (
		<code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm">
			{children}
		</code>
	),
	pre: ({ children }: { children: React.ReactNode }) => (
		<div className="bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto">
			<pre className="text-green-400 text-sm">{children}</pre>
		</div>
	),
	table: ({ children }: { children: React.ReactNode }) => (
		<div className="overflow-x-auto my-6">
			<table className="w-full border-collapse border border-gray-600 bg-gray-800/50 rounded-lg">
				{children}
			</table>
		</div>
	),
	thead: ({ children }: { children: React.ReactNode }) => (
		<thead className="bg-gray-700">{children}</thead>
	),
	tbody: ({ children }: { children: React.ReactNode }) => (
		<tbody>{children}</tbody>
	),
	tr: ({ children }: { children: React.ReactNode }) => (
		<tr className="border-b border-gray-600 hover:bg-gray-700/30">
			{children}
		</tr>
	),
	th: ({ children }: { children: React.ReactNode }) => (
		<th className="border border-gray-600 px-4 py-3 text-left font-bold text-white bg-gray-700">
			{children}
		</th>
	),
	td: ({ children }: { children: React.ReactNode }) => (
		<td className="border border-gray-600 px-4 py-3 text-gray-300">
			{children}
		</td>
	),
	img: ({ src, alt }: { src?: string; alt?: string }) => (
		<img
			src={src}
			alt={alt}
			className="w-full rounded-lg my-4 border border-gray-700"
		/>
	),
	a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
		<a
			href={href}
			className="text-blue-400 hover:text-blue-300 underline"
			target="_blank"
			rel="noopener noreferrer"
		>
			{children}
		</a>
	),
};

export function MDXContent({ content }: MDXContentProps) {
	const [MdxComponent, setMdxComponent] = useState<React.ComponentType | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const compileMDX = async () => {
			try {
				setIsLoading(true);
				setError(null);

				// MDXコンテンツをコンパイル
				const compiled = await evaluate(content, {
					...runtime,
					useMDXComponents: () => mdxComponents,
					remarkPlugins: [remarkGfm],
				});

				setMdxComponent(() => compiled.default);
			} catch (err) {
				console.error("MDX compilation error:", err);
				setError("MDXのコンパイルに失敗しました");
			} finally {
				setIsLoading(false);
			}
		};

		if (content) {
			compileMDX();
		}
	}, [content]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="text-gray-400">読み込み中...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 my-4">
				<p className="text-red-400">{error}</p>
			</div>
		);
	}

	if (!MdxComponent) {
		return (
			<div className="text-gray-400">コンテンツが見つかりません</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="prose prose-invert max-w-none"
		>
			<MDXProvider components={mdxComponents}>
				<MdxComponent />
			</MDXProvider>
		</motion.div>
	);
}
