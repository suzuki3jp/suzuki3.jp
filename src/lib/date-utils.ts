// 期間を計算する関数
export function calculateDuration(startDate: string, endDate?: string): string {
	const start = new Date(startDate);
	const end = endDate ? new Date(endDate) : new Date();

	const diffTime = Math.abs(end.getTime() - start.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	const diffMonths = Math.floor(diffDays / 30);

	if (diffMonths < 1) {
		return `${diffDays}日`;
	} else if (diffMonths < 12) {
		return `${diffMonths}ヶ月`;
	} else {
		const years = Math.floor(diffMonths / 12);
		const remainingMonths = diffMonths % 12;
		if (remainingMonths === 0) {
			return `${years}年`;
		} else {
			return `${years}年${remainingMonths}ヶ月`;
		}
	}
}

// 期間を表示用にフォーマットする関数
export function formatProjectPeriod(
	startDate: string,
	endDate?: string,
): string {
	const start = new Date(startDate);
	const startFormatted = `${start.getFullYear()}年${start.getMonth() + 1}月`;

	if (endDate) {
		const end = new Date(endDate);
		const endFormatted = `${end.getFullYear()}年${end.getMonth() + 1}月`;
		return `${startFormatted} - ${endFormatted}`;
	} else {
		return `${startFormatted} - 現在`;
	}
}

// startDateから年を取得する関数
export function getProjectYear(startDate: string): string {
	return new Date(startDate).getFullYear().toString();
}
