const duplicateFilter = require("./lib/duplicateFilter");
const path = process.argv[2];
const strategy = process.argv[3];
console.log(duplicateFilter(path, strategy));