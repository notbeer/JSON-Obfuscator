const { obfuscateFile, obfuscateFolder, obfuscateDir } = require('../src');

const path = require('path');

obfuscateFile(path.join(__dirname, 'test-folder', 'obfuscateFile-test.json'));
obfuscateFolder(path.join(__dirname, 'test-folder', 'obfuscateFolder-test'));
obfuscateDir(path.join(__dirname, 'test-folder', 'obfuscateDir-test'));
