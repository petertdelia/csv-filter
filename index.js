const { orchestrator } = require("./lib/duplicateRemover");
const defaults = require("./constants.js");

const pathToRead = process.argv[2] || defaults.pathToRead;
const strategy = process.argv[3] || defaults.strategy;
const pathToWrite = process.argv[4] || defaults.pathToWrite;

orchestrator(pathToRead, strategy, pathToWrite);
console.log(`file successfully written to ${pathToWrite}`);