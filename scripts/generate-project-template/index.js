const fs = require('fs');
const path = require('path');

// プロジェクトテンプレートから新しいプロジェクトファイルを生成
function generateProjectFile(projectName) {
  if (!projectName) {
    console.error('エラー: プロジェクト名を指定してください');
    console.log('使用方法: node scripts/generate-project-template project-name');
    process.exit(1);
  }

  // プロジェクト名をケバブケースに変換（スラッグ用）
  const projectSlug = projectName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // 現在の日付を取得
  const currentDate = new Date().toISOString().split('T')[0];

  // テンプレートファイルのパス
  const templatePath = path.join(__dirname, 'project-template.mdx');
  const outputDir = path.join(process.cwd(), 'src', 'projects');
  const outputPath = path.join(outputDir, `${projectSlug}.mdx`);

  // 出力ディレクトリが存在しない場合は作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`ディレクトリを作成しました: ${outputDir}`);
  }

  // 既にファイルが存在する場合はエラー
  if (fs.existsSync(outputPath)) {
    console.error(`エラー: ファイルが既に存在します: ${outputPath}`);
    process.exit(1);
  }

  try {
    // テンプレートファイルを読み込み
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    // プレースホルダーを置換
    const projectContent = templateContent
      .replace(/\{\{PROJECT_NAME\}\}/g, projectName)
      .replace(/\{\{PROJECT_SLUG\}\}/g, projectSlug)
      .replace(/\{\{DATE\}\}/g, currentDate)
      .replace(/\{\{GITHUB_URL\}\}/g, `https://github.com/suzuki3jp/${projectSlug}`)
      .replace(/\{\{LIVE_URL\}\}/g, `https://${projectSlug}.suzuki3.jp`);

    // ファイルを生成
    fs.writeFileSync(outputPath, projectContent);

    console.log(`✅ プロジェクトファイルを生成しました: ${outputPath}`);
    console.log(`📝 プロジェクト名: ${projectName}`);
    console.log(`🔗 スラッグ: ${projectSlug}`);
    console.log(`📅 開始日: ${currentDate}`);
    console.log('');
    console.log('次のステップ:');
    console.log('1. 生成されたMDXファイルを編集してプロジェクト情報を記入');
    console.log('2. public/images フォルダにプロジェクト画像を配置');
    console.log('3. npm run generate-projects でプロジェクトデータを更新');

  } catch (error) {
    console.error('エラー: ファイルの生成に失敗しました:', error.message);
    process.exit(1);
  }
}

// コマンドライン引数からプロジェクト名を取得
const projectName = process.argv[2];
generateProjectFile(projectName);