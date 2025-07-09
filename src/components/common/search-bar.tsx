"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

export function SearchBar({
	value,
	onChange,
	placeholder = "検索...",
	className = "",
}: SearchBarProps) {
	return (
		<div className={`max-w-md mx-auto relative ${className}`}>
			<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
			<Input
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
			/>
		</div>
	);
}
