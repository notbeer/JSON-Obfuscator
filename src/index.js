const fs = require('fs');
const path = require('path');

/**
 * Escape string to unicode
 * @param {string} value 
 * @returns {string}
 */
function escapeToUnicode(value) {
    for(var newString = '', i = 0, unicode; !isNaN(unicode = value.charCodeAt(i++));)
        newString += '\\u' + `0000${unicode.toString(16)}`.slice(-4);
    return newString;
};
/**
 * Validate JSON first. Obfuscate a whole json string
 * @param {string} value
 * @returns {string}
 */
function obfuscateJSON(value) {
    const stringRegex = /"(?:"|.)*?"/gm;
    
    const syntaxArr = value.split(stringRegex), stringArr = `"${value}"`.split(stringRegex).slice(1, -1);
    
    let unicodeArr = [], obfuscated = '';
    stringArr.forEach(str => unicodeArr.push(`"${escapeToUnicode(str).replace(/\\u005c$/g, '\\')}"`));
    syntaxArr.map((value, index) => obfuscated += `${value}${unicodeArr[index] ? unicodeArr[index] : ''}`);

    return obfuscated;
};

/**
 * Get content of file
 * @param {string} path
 * @returns {string}
 */
function getFileContent(path) {
    const content = fs.readFileSync(path).toString().replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    try {
        JSON.parse(content);
    } catch(err) {
        throw new Error(`Invalid JSON in folder ${path}`)
    };
    return JSON.stringify(JSON.parse(content));
};
/**
 * Find every file in a folder
 * @param {string} dir
 * @returns {Array<string>}
 */
function crawlFolder(dir) {
    if(!fs.existsSync(dir)) throw new Error(`Cannot find directory ${dir}`);
    return fs.readdirSync(dir, { withFileTypes: true })
        .filter(content => !content.isDirectory())
        .map(content => path.join(dir, content.name));
};
/**
 * Find every file in a directory
 * @param {string} dir
 */
function* crawlDir(dir) {
    if(!fs.existsSync(dir)) throw new Error(`Cannot find directory ${dir}`);
    for(const content of fs.readdirSync(dir, { withFileTypes: true })) {
        content.isDirectory()
        ? yield* crawlDir(path.join(dir, content.name))
        : yield path.join(dir, content.name);
    };
};

/**
 * Obfuscates a json file
 * @param {string} path 
 */
function obfuscateFile(path) {
    if(!path.endsWith('.json')) throw new Error(`Not a valid json file ${path}`);
    fs.writeFile(path, obfuscateJSON(getFileContent(path)), 'utf-8', (err, data) => {
        if(err) throw new Error(`An unexpected error occured ${err}`);
    });
};
/**
 * Obfuscates all json file(s) in a folder
 * @param {string} dir
 */
function obfuscateFolder(dir) {
    const paths = crawlFolder(dir);
    if(!paths.length) throw new Error(`No JSON file found in the folder ${dir}`);
    for(let path of paths) {
        if(path.endsWith('.json')) {
            obfuscateFile(path);
        };
    };
};
/**
 * Obfuscates all json file(s) in a directory
 * @param {string} dir
 */
function obfuscateDir(dir) {
    const paths = crawlDir(dir), check = paths;
    if(check.next().done) throw new Error(`No JSON file found in the directory ${dir}`);
    for(let path of crawlDir(dir)) {
        if(path.endsWith('.json')) {
            obfuscateFile(path);
        };
    };
};

module.exports = {
    obfuscateFile,
    obfuscateFolder,
    obfuscateDir
};