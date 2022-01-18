declare module "json-obfuscator" {
    /**
     * Obfuscate an JSON string.
     * @param {string} value - JSON string to obfuscate.
     * @returns {string}
     */
    export function obfuscateString(value: string): string;
    /**
     * Obfuscate an JSON file.
     * @param {string} path - The path of the file to obfuscate.
     */
    export function obfuscateFile(path: string): void;
    /**
     * Obfuscates all JSON file(s) in a directory, excluding sub folders.
     * @param {string} dir - The files in the directory you want to obfuscate.
     */
    export function obfuscateFolder(dir: string): void;
    /**
     * Obfuscates all JSON file(s) in a directory, including sub folders.
     * @param {string} dir - The files in the directory you want to obfuscate.
     */
    export function obfuscateDir(dir: string): void;
}