import * as fs from 'fs-extra';
import * as path from 'path';

const files: { [key: string]: (opts: { dirname: string; name: string; }) => string } = {
  'package.json': ({ name }: { name: string }) => {
    return JSON.stringify({
      name,
      version: '0.0.1',
      description: '',
      license: 'MIT',
      main: 'dist/index.js',
      typings: 'dist/index.d.ts',
      scripts: {
        build: 'ts-pub build'
      },
      keywords: [],
      author: '',
      dependencies: {
      },
      devDependencies: {
        '@types/node': '8.0.7',
        'ts-node': '3.1.0',
        'ts-pub': require('./package.json').version,
        'typescript': '2.4.1'
      }
    }, null, 2);
  },

  'tsconfig.json': () => {
    return JSON.stringify({
      compilerOptions: {
        strict: true,
        target: 'es2015',
        module: 'commonjs',
        declaration: true,
        typeRoots: [
          'node_modules/@types'
        ]
      },
      files: [
        'src/index.ts'
      ]
    }, null, 2);
  },

  '.gitignore': () => {
    return [
      'node_modules',
      'dist'
    ].join('\n') + '\n';
  },

  'src/index.ts': () => ''
};

export async function init(name: string, dirname: string) {
  await fs.mkdirs(dirname);

  for (const filename of Object.keys(files)) {
    const content = files[filename]({ dirname, name });
    const filepath = path.join(dirname, filename);
    await fs.mkdirs(path.dirname(filepath));
    await fs.writeFile(filepath, content, { encoding: 'utf8' });
  }
}
