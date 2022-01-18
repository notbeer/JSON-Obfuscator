const fs = require('fs');

const { validateJSON } = require('./utils/validate');
const { obfuscate } = require('./utils/obfuscator');
const { File } = require('./utils/file');
const {
    crawlFolder,
    crawlDir
} = require('./utils/crawler');

const file = new File();

/**
 * Obfuscate an JSON string.
 * @param {string} value - JSON string to obfuscate.
 * @returns {string}
 */
const obfuscateString = (value) => obfuscate(validateJSON(value));
/**
 * Obfuscate an JSON file.
 * @param {string} path - The path of the file to obfuscate.
 */
function obfuscateFile(path) {
    if(fs.lstatSync(path).isFile()) file.save(path, obfuscate(file.get(path)));
};
/**
 * Obfuscates all JSON file(s) in a directory, excluding sub folders.
 * @param {string} dir - The files in the directory you want to obfuscate.
 */
function obfuscateFolder(dir) {
    for(const path of crawlFolder(dir, '.json')) {
        file.save(path, obfuscate(file.get(path)))
    };
};
/**
 * Obfuscates all JSON file(s) in a directory, including sub folders.
 * @param {string} dir - The files in the directory you want to obfuscate.
 */
function obfuscateDir(dir) {
    for(const path of crawlDir(dir, '.json')) {
        file.save(path, obfuscate(file.get(path)))
    };
};

module.exports = {
    obfuscateString,
    obfuscateFolder,
    obfuscateFile,
    obfuscateDir
};
