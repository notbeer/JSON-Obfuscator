/**
 * Escape string to unicode.
 * @param {string} value - The value to escape.
 * @returns {string}
 */
function escapeToUnicode(value) {
    for(var newString = '', i = 0, unicode; !isNaN(unicode = value.charCodeAt(i++));)
        newString += '\\u' + `0000${unicode.toString(16)}`.slice(-4);
    return newString;
};
/**
 * Obfuscate json string.
 * @param {string} value - The value to obfuscate.
 * @returns {string}
 */
function obfuscate(value) {
    const stringRegex = /"(?:"|.)*?"/gm;
    
    const syntaxArr = value.split(stringRegex), stringArr = `"${value}"`.split(stringRegex).slice(1, -1);
    
    let unicodeArr = [], obfuscated = '';
    stringArr.forEach(str => unicodeArr.push(`"${escapeToUnicode(str).replace(/\\u005c$/g, '\\')}"`));
    syntaxArr.map((value, index) => obfuscated += `${value}${unicodeArr[index] ? unicodeArr[index] : ''}`);

    return obfuscated;
};

module.exports = { obfuscate };