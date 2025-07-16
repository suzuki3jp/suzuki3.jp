import { evaluate } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";

interface MDXContentProps {
	content: string;
}

interface TocItem {
	id: string;
	text: string;
	level: number;
}

export function MDXContent({ content }: MDXContentProps) {
	const [MdxComponent, setMdxComponent] = useState<React.ComponentType | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [tocItems, setTocItems] = useState<TocItem[]>([]);
	const contentRef = useRef<HTMLDivElement>(null);

	// 見出しからTOCアイテムを生成
	const generateTocFromHeadings = (element: HTMLElement): TocItem[] => {
		const headings = element.querySelectorAll("h1, h2, h3, h4, h5, h6");
		const tocItems: TocItem[] = [];

		headings.forEach((heading, index) => {
			const level = parseInt(heading.tagName.charAt(1));
			const text = heading.textContent || "";

			// IDがない場合は生成
			if (!heading.id) {
				const id = `heading-${index}-${text
					.toLowerCase()
					.replace(/[^a-z0-9]/g, "-")
					.replace(/-+/g, "-")
					.replace(/^-|-$/g, "")}`;
				heading.id = id;
			}

			tocItems.push({
				id: heading.id,
				text,
				level,
			});
		});

		return tocItems;
	};

	// MDXコンポーネントのカスタムスタイリング
	const mdxComponents = {
		h1: ({ children }: { children: React.ReactNode }) => (
			<h1 className="text-3xl font-bold text-white mb-6 mt-12 first:mt-0 border-b-2 border-gray-700 pb-2">
				{children}
			</h1>
		),
		h2: ({ children }: { children: React.ReactNode }) => (
			<h2 className="text-2xl font-bold text-white mb-4 mt-8 border-b-2 border-gray-700 pb-2">
				{children}
			</h2>
		),
		h3: ({ children }: { children: React.ReactNode }) => (
			<h3 className="text-xl font-bold text-white mb-3 mt-6 border-b-2 border-gray-700 pb-1">
				{children}
			</h3>
		),
		h4: ({ children }: { children: React.ReactNode }) => (
			<h4 className="text-base font-bold text-white mb-2 mt-4 border-b-2 border-gray-700 pb-1">
				{children}
			</h4>
		),
		h5: ({ children }: { children: React.ReactNode }) => (
			<h5 className="text-sm font-bold text-white mb-2 mt-3 border-b-2 border-gray-700 pb-1">
				{children}
			</h5>
		),
		h6: ({ children }: { children: React.ReactNode }) => (
			<h6 className="text-xs font-bold text-white mb-2 mt-3 border-b-2 border-gray-700 pb-1">
				{children}
			</h6>
		),
		p: ({ children }: { children: React.ReactNode }) => (
			<p className="text-gray-300 mb-8 leading-relaxed">{children}</p>
		),
		ul: ({ children }: { children: React.ReactNode }) => (
			<ul className="text-gray-300 mb-8 ml-4 list-disc space-y-2">
				{children}
			</ul>
		),
		ol: ({ children }: { children: React.ReactNode }) => (
			<ol className="text-gray-300 mb-4 ml-4 list-decimal space-y-2">
				{children}
			</ol>
		),
		li: ({ children }: { children: React.ReactNode }) => (
			<li className="text-gray-300">{children}</li>
		),
		strong: ({ children }: { children: React.ReactNode }) => (
			<strong className="font-bold text-white">{children}</strong>
		),
		em: ({ children }: { children: React.ReactNode }) => (
			<em className="italic text-gray-300">{children}</em>
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
		blockquote: ({ children }: { children: React.ReactNode }) => (
			<blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-gray-800/30 italic text-gray-300">
				{children}
			</blockquote>
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
				className="text-blue-400 hover:text-blue-300 underline transition-colors"
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</a>
		),
		hr: () => <hr className="border-gray-600 my-8" />,
	};

	// TOCコンポーネント
	const TableOfContents = ({ items }: { items: TocItem[] }) => {
		if (items.length === 0) return null;

		const handleTocClick = (id: string) => {
			const element = document.getElementById(id);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		};

		return (
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5 }}
				className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-8"
			>
				<h3 className="text-lg font-bold text-white mb-4 flex items-center">
					<svg
						className="w-5 h-5 mr-2"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 10h16M4 14h16M4 18h16"
						/>
					</svg>
					目次
				</h3>
				<nav>
					<ul className="space-y-1">
						{items.map((item) => (
							<li key={item.id}>
								<button
									onClick={() => handleTocClick(item.id)}
									className={`text-left w-full hover:text-blue-400 cursor-pointer transition-colors ${
										item.level === 1
											? "font-semibold text-white"
											: item.level === 2
												? "ml-4 text-gray-300"
												: item.level === 3
													? "ml-8 text-gray-400"
													: "ml-12 text-gray-500"
									}`}
								>
									{item.text}
								</button>
							</li>
						))}
					</ul>
				</nav>
			</motion.div>
		);
	};

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

	// MDXコンポーネントがレンダリングされた後にTOCを生成
	useEffect(() => {
		if (MdxComponent && contentRef.current && !isLoading) {
			// 次のティックで実行してDOMが更新されてから実行
			const timeoutId = setTimeout(() => {
				if (contentRef.current) {
					const toc = generateTocFromHeadings(contentRef.current);
					setTocItems(toc);
				}
			}, 100);

			return () => clearTimeout(timeoutId);
		}
	}, [MdxComponent, isLoading]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-8">
				<div className="flex items-center space-x-3">
					<div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
					<div className="text-gray-400">読み込み中...</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 my-4">
				<div className="flex items-center space-x-2">
					<svg
						className="w-5 h-5 text-red-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p className="text-red-400">{error}</p>
				</div>
			</div>
		);
	}

	if (!MdxComponent) {
		return (
			<div className="text-gray-400 text-center py-8">
				コンテンツが見つかりません
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="prose prose-invert max-w-none"
		>
			{/* 目次を表示 */}
			<TableOfContents items={tocItems} />

			{/* MDXコンテンツ */}
			<div ref={contentRef}>
				<MDXProvider components={mdxComponents}>
					<MdxComponent />
				</MDXProvider>
			</div>
		</motion.div>
	);
}
