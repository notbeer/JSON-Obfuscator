const fs = require('fs');

const { validateJSON } = require('./validate');

class File {
    /**
     * Get JSON content of a file.
     * @param {string} path - The file path.
     * @returns {string}
     */
    get = (path) => validateJSON(fs.readFileSync(path).toString(), path);
    /**
     * Save utf-8 content to a file.
     * @param {string} path - The file path.
     * @param {string} content - The content to save.
     */
    save(path, content) {
        fs.writeFile(path, content, 'utf-8', (err, data) => {
            if(err) throw new Error(`An unexpected error occured ${err}`);
        });
    };
};

module.exports = { File };