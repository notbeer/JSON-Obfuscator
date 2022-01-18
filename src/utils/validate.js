/**
 * Validate JSON string.
 * @param {string} value - JSON value to validate.
 * @param {string=} path - The file path.
 * @returns {string}
 */
function validateJSON(value, path) {
    let json = value.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    try {
        json = JSON.parse(json);
    } catch(err) {
        throw new Error(path ? `Invalid JSON in file ${path}` : 'Value is an invalid JSON');
    };
    return JSON.stringify(json);
};

module.exports = { validateJSON };