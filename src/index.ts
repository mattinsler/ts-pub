import * as path from 'path';

import { init } from './init';
import { build } from './build';

export function cli(argv: string) {
  if (argv.length === 1) {
    if (argv[0] === 'build') {
      try {
        build(process.cwd());
      } catch (err) {
        console.log('ERROR:', err.message);
      }
    } else if (argv[0] === 'init') {
      try {
        init(path.basename(process.cwd()), process.cwd());
      } catch (err) {
        console.log('ERROR:', err.message);
      }
    } else {
      console.log('Usage: ts-pub build|init');
    }
  }
}
