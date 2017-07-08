import * as fs from 'fs-extra';
import * as path from 'path';
import { spawn, SpawnOptions } from 'child_process';

function exec(command: string, opts: SpawnOptions = {}) {
  opts.stdio = 'inherit';

  return new Promise((resolve, reject) => {
    console.log(command);
    const proc = spawn('/bin/sh', ['-c', command], opts);
    proc.on('close', (code) => {
      if (code !== 0) { reject(new Error(`Process ended with code: ${code}`)); }
      resolve();
    });
  });
}

export async function build(dirname: string) {
  await fs.remove(path.join(dirname, 'dist'));
  await exec('tsc -p ./ --outDir dist/', { cwd: dirname });
  if (await fs.exists(path.join(dirname, 'README.md'))) {
    await fs.copy(
      path.join(dirname, 'README.md'),
      path.join(dirname, 'dist', 'README.md')
    );
  }

  const pkg = await fs.readJSON(path.join(dirname, 'package.json'));
  delete pkg.devDependencies;
  delete pkg.files;
  delete pkg.scripts;
  pkg.main = pkg.main.replace(/^dist\//, '');
  pkg.typings = pkg.typings.replace(/^dist\//, '');

  await fs.writeJSON(path.join(dirname, 'dist', 'package.json'), pkg, { encoding: 'utf8' });
}
