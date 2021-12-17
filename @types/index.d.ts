declare module "json-obfuscator" {
    /**
     * Obfuscates a json file
     * @param {string} path 
     */
    export function obfuscateFile(path: string): void;
    /**
     * Obfuscates all json file(s) in a folder
     * @param {string} dir
     */
    export function obfuscateFolder(dir: string): void;
    /**
     * Obfuscates all json file(s) in a directory
     * @param {string} dir
     */
    export function obfuscateDir(dir: string): void;
};