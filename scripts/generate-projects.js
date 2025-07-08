const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// プロジェクトデータを静的JSONファイルとして生成
function generateProjectsJson() {
  const projectsDir = path.join(process.cwd(), 'src', 'projects');
  const outputPath = path.join(process.cwd(), 'public', 'projects.json');
  
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
  
  // public/projects.json に書き出し
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
  console.log(`Generated ${projects.length} projects to ${outputPath}`);
}

generateProjectsJson();
