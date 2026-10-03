import { existsSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, '..');
if (!existsSync(resolve(root, 'dist/index.html'))) throw new Error('Run npm run build first.');

function archive(name, cwd, args) {
  const destination = resolve(output, name);
  rmSync(destination, { force: true });
  const result = spawnSync('zip', ['-q', '-r', destination, ...args], { cwd, stdio: 'inherit' });
  if (result.status !== 0) throw new Error('ZIP packaging requires the zip command (available on macOS and Linux).');
  console.log(destination);
}

archive('Yogesh-Bhavna-Anniversary-Website.zip', resolve(root, 'dist'), ['.']);
archive('Yogesh-Bhavna-Anniversary-Source.zip', root, ['.', '-x', 'node_modules/*', 'dist/*', '.git/*', 'qa/*', '.playwright-cli/*', '*.zip', '.DS_Store']);
