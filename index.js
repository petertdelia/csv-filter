const duplicateFilter = require("./lib/duplicateFilter");

const defaultPath = "example.csv";
const defaultStrategy = "email";

const path = process.argv[2] || defaultPath;
const strategy = process.argv[3] || defaultStrategy;

console.log(duplicateFilter(path, strategy));