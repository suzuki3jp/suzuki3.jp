# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

suzuki3jp (フロントエンドエンジニア) のポートフォリオサイト。Next.js 16 と React 19 で構築。

## デザインリファレンス

v0 で作成したプロトタイプが https://github.com/suzuki3jp/v0-suzuki3-jp にあるため、実装の際はこのデザインを参考にすること。

## コマンド

```bash
pnpm dev      # 開発サーバー起動
pnpm build    # 本番ビルド
pnpm lint     # ESLint 実行
```

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router, RSC 有効)
- **UI**: React 19, Tailwind CSS v4, shadcn/ui (New York スタイル)
- **アイコン**: Lucide React
- **言語**: TypeScript (strict モード)
- **フォーマッター/リンター**: Biome (VS Code で保存時に自動実行)

## アーキテクチャ

```
src/
├── app/           # Next.js App Router ページとレイアウト
├── components/
│   └── ui/        # shadcn/ui コンポーネント (CVA パターン)
└── lib/
    └── utils.ts   # Tailwind クラスマージ用 cn() ユーティリティ
```

**パスエイリアス**: `@/*` → `./src/*`

## コンポーネントパターン

コンポーネントは Class Variance Authority (CVA) でバリアントを管理:

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva("base-styles", {
  variants: { variant: { ... }, size: { ... } }
});

// cn() で Tailwind クラスをマージ
<div className={cn(componentVariants({ variant }), className)} />
```

shadcn/ui コンポーネント追加: `npx shadcn@latest add <component>`

## コードスタイルルール

- **console.log 禁止**: Biome が `noConsole: error` で強制
- **Tailwind クラス**: Biome がアルファベット順に自動ソート
- **インポート**: Biome が自動整理
- **クォート**: ダブルクォート
- **インデント**: スペース2つ
- **リンク**: `<a>` タグではなく `next/link` の `<Link>` を使用する

## スタイリング

- OKLCH カラースペースの CSS 変数 (ライト/ダークテーマは `globals.css`)
- マークダウン/ブログ用プローススタイル (`.prose` クラス)
- フォント: Noto Sans JP (sans), JetBrains Mono (mono)
