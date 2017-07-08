{
  "name": "ts-pub",
  "version": "0.0.1",
  "description": "",
  "keywords": [],
  "author": {},
  "license": "MIT",
  "scripts": {
    "build": "rm -rf dist; tsc -p ./ --outDir dist/; cp README.md dist/; cp package.json README.md;"
  },
  "bin": {
    "ts-pub": "bin/ts-pub"
  },
  "dependencies": {
    "fs-extra": "3.0.1"
  },
  "devDependencies": {
    "@types/fs-extra": "3.0.3",
    "@types/node": "8.0.8",
    "ts-node": "3.2.0",
    "typescript": "2.4.1"
  }
}