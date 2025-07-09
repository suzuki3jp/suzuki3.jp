// 技術スタック（カテゴリ別）
export const SKILL_CATEGORIES = [
	{
		category: "Frontend",
		skills: [
			{ name: "React", proficiency: 70 },
			{ name: "Next.js", proficiency: 80 },
			{ name: "TypeScript", proficiency: 80 },
			{ name: "Tailwind CSS", proficiency: 30 },
		],
	},
	{
		category: "Backend",
		skills: [
			{ name: "Node.js", proficiency: 80 },
			{ name: "Express.js", proficiency: 30 },
			{ name: "Python", proficiency: 50 },
			{ name: "Go", proficiency: 20 },
			{ name: "Rust", proficiency: 10 },
			{ name: "SQLite", proficiency: 10 },
		],
	},
	{
		category: "Tools & Others",
		skills: [
			{ name: "Supabase", proficiency: 50 },
			{ name: "Docker", proficiency: 30 },
		],
	},
] as const;
