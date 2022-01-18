const fs = require('fs');
const path = require('path');

/**
 * Find every file in a folder.
 * @param {string} dir - Directory to look through.
 * @param {string=} type - Type of file to look for.
 * @returns {Array<string>}
 */
function crawlFolder(dir, type) {
    return fs.readdirSync(dir, { withFileTypes: true })
        .filter(content => content.isFile() && (type && content.name.endsWith(type)))
        .map(content => path.join(dir, content.name));
};
/**
 * Find every file in a directory.
 * @param {string} dir - Directory to look through.
 * @param {string=} type - Type of file to look for.
 */
function* crawlDir(dir, type) {
    for(const content of fs.readdirSync(dir, { withFileTypes: true })) {
        if(content.isDirectory()) yield* crawlDir(path.join(dir, content.name), type);
        else if(type) content.name.endsWith(type) ? yield path.join(dir, content.name) : null;
        else yield path.join(dir, content.name);
    };
};

module.exports = {
    crawlFolder,
    crawlDir
};