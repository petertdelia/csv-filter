const fs = require('fs');
const PATH_TO_FILE = process.argv[2] || "../test/all-values-test.csv";

function fileValidator(filePath) {

}

function fileReader(filePath) {
  return fs.readFileSync(filePath, {encoding: 'utf8'})
    .split("\n")
    .slice(1)
    .map(entry => entry.split(",").map(field => field.trim()));
}

function filterByEmail(entries) {
  return entries;
}

function filterByPhone(entries) {

}

function filterByEmailOrPhone(entries) {

}

function duplicateFilter(filePath, detectionStrategy) {
  fileValidator(filePath);
  let entries = fileReader(filePath);

  switch(detectionStrategy) {
    case "email":
      return filterByEmail(entries);
    case "phone":
      return filterByPhone(entries);
    case "email_or_phone":
      return filterByEmailOrPhone(entries);
  }
}

module.exports = duplicateFilter;