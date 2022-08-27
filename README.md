# JSON-Obfuscator
The JSON Obfuscator you see here is good way to make it harder for people to read your JSON file!

## Require via NPM
Make sure that you have [Node.js](https://nodejs.org/en/)

1. Install JSON-Obfuscator as a dependency using NPM by running the following command:
```
npm i json-obfuscator
```
2. Import JSON-Obfuscator on project.
```js
const jsonObf = require("json-obfuscator");
```
3. Example of All Functions
```js
(async () => {
    /**
     * Obfuscate an json string 
    **/
    const EncryptedString = await jsonObf.obfuscateString(`{ "name": "John", "age": 30, "city": "New York" }`);

    console.log({
        String: EncryptedString,
    })

    /**
     * Obfuscate an File
    **/
    await jsonObf.obfuscateFile(`${__dirname}/file.json`);

    /**
     * Obfuscate an directory with json file(s) doens't include sub dirs
    **/
    await jsonObf.obfuscateDir(`${__dirname}/Folder`);

    /**
     * Obfuscate an directory with json file(s), including sub dirs
    **/
    await jsonObf.obfuscateDir(`${__dirname}/Folder`);
})()
```
