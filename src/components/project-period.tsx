"use client";

import { Calendar, Clock } from "lucide-react";
import { calculateDuration, formatProjectPeriod } from "@/lib/date-utils";

interface ProjectPeriodProps {
	startDate: string;
	endDate?: string;
	className?: string;
}

export function ProjectPeriod({
	startDate,
	endDate,
	className = "",
}: ProjectPeriodProps) {
	const period = formatProjectPeriod(startDate, endDate);
	const duration = calculateDuration(startDate, endDate);
	const isOngoing = !endDate;

	return (
		<div
			className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ${className}`}
		>
			<div className="flex items-center gap-2 text-gray-400">
				<Calendar className="w-4 h-4" />
				<span className="text-sm">{period}</span>
				{isOngoing && (
					<span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">
						進行中
					</span>
				)}
			</div>
			<div className="flex items-center gap-2 text-gray-400">
				<Clock className="w-4 h-4" />
				<span className="text-sm">期間: {duration}</span>
			</div>
		</div>
	);
}
