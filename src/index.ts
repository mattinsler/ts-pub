import * as path from 'path';

import { init } from './init';
import { build } from './build';

export function cli(argv: string) {
  if (argv.length === 1) {
    switch (argv[0]) {
      case 'build':
        try {
          build(process.cwd());
        } catch (err) {
          console.log('ERROR:', err.message);
        }
      case 'init':
        try {
          init(path.basename(process.cwd()), process.cwd());
        } catch (err) {
          console.log('ERROR:', err.message);
        }
      default:
        console.log('Usage: ts-pub build|init');
    }
  }
}
