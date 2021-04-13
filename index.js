//TODO: Make sure there is a file called 'json.txt' and 'obfuscated.json'. If you don't the nodejs process will terminate!
const chalk = require('chalk'); //Exporting "chalk" (Package gives the ability to color stuff in the console)
const fs = require('fs'); //Exporting "fs" (Lets you write, edit files with more features!)
const settings = require('./settings.json'); //First step of getting from 'settings.json', if "Minifier?" is true or false  

if (fs.readFileSync(`json.txt`).length === 0) //Checking if there are anything written in 'json.txt'
    return console.log(chalk.redBright("Please write your json in 'json.txt' to obfuscate!")); //If not logs this

const json = fs.readFileSync('json.txt').toString().replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ""); //If everything went good so far get the json from the file, then remove every comment and set the text to const json

function validateJSON(text) { //Function to later execute below
    try {
        JSON.parse(text); //Checking if the JSON has any errors
        console.log(chalk.yellowBright("JSON is Valid...")); //Execute this in the log, if it doesn't
    } catch (e) {
        return console.log("Please make sure your JSON file in 'json.txt' is valid! If you need help use a JSON Validator."); //log this if there is a error
    };
};
validateJSON(json); //Now execute the function we made above

console.log(chalk.underline("Please be patient! It takes the code time to process and write depending on your file size!"));
const getString = `"${JSON.stringify(JSON.parse(json))}"`; //Getting the json in shape, so it can be supported by the REGEX coming below

const regex = /".*?"/g; //Regex to split everything inside quotations from everything outside quotations
const syntaxArray = json.split(regex); //split the json by the regex, so all the syntax are seperated from stuff inside quotations
const jsonstringArray = getString.split(regex).slice(1, -1); //split getString by regex, so all the quotations are seperated from the syntax's. The slice removes the last empty part that comes at the end of the split.
console.log(syntaxArray);console.log(jsonstringArray);

function uniCode(escaped) { //Function to later execute below
    for(var newString = "", i = 0, string; !isNaN(string = escaped.charCodeAt(i++));) //In the begin of for loop, we make a variable called "newString", "i" = 0, and string. In the condition, we check if the parameter "escaped" is NOT a number, then set it to variable "string"...                                                                 
        newString += "\\u" + ("0000" + string.toString(16)).slice(-4); //Makes the whole index passed into escape parameter to unicode.
    return newString; //Returns the index as unicode at the end
};

var stringArray = []; //Creates a array to store the new unicode that will get passed down by the function "uniCode"
for(var i = 0; i < jsonstringArray.length; i++) //Created a loop to go through every index of "jsonstringArray"
    stringArray.push(`"${uniCode(jsonstringArray[i]).replace(/\\u005c$/g, "\\")}"`); //Passing down "jsonstringArray" index of i to parameter of function "uniCode". Then some regex magic to check if there is a SPECIFIC unicode at the end of string then replace it with "\\". The replace was there because some values in the JSON might have escaped quotations.  

var jsonCollected = ''; //New variable to collect the json below
syntaxArray.map(function(value, index) { //Maps out syntaxArray
    jsonCollected += value + stringArray[index]; //Parameter value gets the index of syntaxArray adds it to the index of stringArray, which will equal to variable "jsonCollected"
});

const outputCleaned = jsonCollected.substring(0, jsonCollected.lastIndexOf("undefined")); //Looks for any undefined at last then removes it
//Check if minfier in 'settings.json' is true ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇   |   If true below executes makes the json smalled using regex        | false below
fs.writeFileSync("obfuscated.json", (settings['Minifier?'] ? outputCleaned.replace(/(?:\r\n|  |\t)(?=(?:[^"]|"[^"]*")*$)/g, "") : outputCleaned), err => { //Writes the final JSON in 'obfusctaed.json'.
    if(err) console.log(chalk.redBright("Missing file called 'obfuscated.json'")); //Error most likely appear when the file is missing
});
console.log(chalk.bold("Successfully obfuscated the json!"));