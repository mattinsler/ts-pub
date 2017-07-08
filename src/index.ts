import * as path from 'path';

import { init } from './init';
import { build } from './build';

export function cli(argv: string) {
  if (argv.length === 1) {
    switch (argv[0]) {
      case 'build':
        return build(process.cwd());
      case 'init':
        return init(path.basename(process.cwd()), process.cwd());
    }
  }

  console.log('Usage: ts-pub build|init');
}
