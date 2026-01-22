/**
 * 経験の型定義
 * start は必須、end は省略可能（省略時は現在まで）
 * 日付は Date.parse() 可能な文字列（例: "2024-08", "2024-08-01"）
 */
export interface Experience {
  company: string;
  role: string;
  start: string;
  end?: string;
  description?: string;
  link?: string;
}
