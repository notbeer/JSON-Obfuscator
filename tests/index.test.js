const { obfuscateString, obfuscateFile, obfuscateFolder, obfuscateDir } = require('../src');

const path = require('path');

console.log(obfuscateString(JSON.stringify({ a: 'b', c: { d: 'e', f: 'g' }, h: 'i' })));
obfuscateFile(path.join(__dirname, 'test-folder', 'obfuscateFile-test.json'));
obfuscateFolder(path.join(__dirname, 'test-folder', 'obfuscateFolder-test'));
obfuscateDir(path.join(__dirname, 'test-folder', 'obfuscateDir-test'));