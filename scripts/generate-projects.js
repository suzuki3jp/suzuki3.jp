const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// プロジェクトデータを静的TypeScriptファイルとして生成
function generateProjectsTs() {
  const projectsDir = path.join(process.cwd(), 'src', 'projects');
  const tsOutputPath = path.join(process.cwd(), 'src', 'data', 'generated-projects.ts');
  
  if (!fs.existsSync(projectsDir)) {
    console.log('Projects directory not found');
    return;
  }
  
  const filenames = fs.readdirSync(projectsDir);
  const projects = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '');
      const filePath = path.join(projectsDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      return {
        metadata: data,
        content,
        slug
      };
    });
  
  // TypeScriptファイルを生成
  const tsContent = `// このファイルはビルド時に自動生成されます
import type { ProjectWithContent } from '@/lib/mdx';

export const projects: ProjectWithContent[] = ${JSON.stringify(projects, null, 2)};

export type GeneratedProject = typeof projects[number];
`;
  
  // dataディレクトリが存在しない場合は作成
  const dataDir = path.dirname(tsOutputPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  fs.writeFileSync(tsOutputPath, tsContent);
  console.log(`Generated ${projects.length} projects to ${tsOutputPath}`);
}

generateProjectsTs();
