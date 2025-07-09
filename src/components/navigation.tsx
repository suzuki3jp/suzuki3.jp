"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, FolderOpen, Home, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	const navItems = [
		{ href: "/", label: "Home", icon: Home },
		{ href: "/projects", label: "Projects", icon: FolderOpen },
		{ href: "/timeline", label: "Timeline", icon: Clock },
	];

	return (
		<>
			<motion.nav
				className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-white/10 transition-all duration-300"
				initial={{ y: 0, opacity: 1 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.6 }}
			>
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						{/* Logo */}
						<Link href="/">
							<motion.div
								className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
								whileHover={{ scale: 1.05 }}
							>
								suzuki3jp
							</motion.div>
						</Link>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center space-x-8">
							{navItems.map((item) => (
								<Link key={item.href} href={item.href}>
									<motion.div
										className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
											pathname === item.href
												? "text-blue-400 bg-blue-400/10"
												: "text-gray-300 hover:text-white hover:bg-white/10"
										}`}
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<item.icon className="w-4 h-4" />
										<span>{item.label}</span>
									</motion.div>
								</Link>
							))}
						</div>

						{/* Mobile Menu Button */}
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden text-white hover:bg-white/10"
							onClick={() => setIsOpen(!isOpen)}
						>
							{isOpen ? (
								<X className="w-5 h-5" />
							) : (
								<Menu className="w-5 h-5" />
							)}
						</Button>
					</div>
				</div>
			</motion.nav>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 z-40 md:hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<div
							className="absolute inset-0 bg-gray-900/95 backdrop-blur-md"
							onClick={() => setIsOpen(false)}
						/>
						<motion.div
							className="absolute top-16 left-0 right-0 bg-gray-800/95 backdrop-blur-md border-b border-white/10"
							initial={{ y: -20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -20, opacity: 0 }}
						>
							<div className="container mx-auto px-4 py-4">
								{navItems.map((item, index) => (
									<motion.div
										key={item.href}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
									>
										<Link href={item.href} onClick={() => setIsOpen(false)}>
											<div
												className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
													pathname === item.href
														? "text-blue-400 bg-blue-400/10"
														: "text-gray-300 hover:text-white hover:bg-white/10"
												}`}
											>
												<item.icon className="w-5 h-5" />
												<span>{item.label}</span>
											</div>
										</Link>
									</motion.div>
								))}
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
