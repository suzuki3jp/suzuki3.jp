// 共通のコンポーネントプロパティ型
export interface BaseComponentProps {
	className?: string;
	children?: React.ReactNode;
}

// アニメーション関連の型
export interface AnimationProps {
	initial?: string | object;
	animate?: string | object;
	exit?: string | object;
	transition?: object;
	variants?: object;
}

// サイズ関連の型
export type Size = "sm" | "md" | "lg" | "xl";

// カードバリアント型
export type CardVariant = "default" | "interactive" | "elevated";

// プロジェクトカードのバリアント型
export type ProjectCardVariant = "preview" | "full";

// ステータス関連の型
export interface LoadingProps {
	isLoading: boolean;
	error?: string | null;
}

// 検索関連の型
export interface SearchableProps {
	searchTerm?: string;
	onSearchChange?: (term: string) => void;
}
