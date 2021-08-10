const fs = require('fs');
const encoding = 'utf8';
const HEADERS = [ "FirstName", "LastName", "Email", "Phone" ];

function validateFile(pathToRead) {

  let file = fs.readFileSync(pathToRead, {encoding: encoding});
  let headers = getHeadersFromCSV(file);
  headers.forEach((header, idx) => {
    if (header !== HEADERS[idx]) {
      throw new Error("File must contain headers [FirstName, LastName, Email, Phone]")
    }
  })
}

function validateEntries(entries) {
  entries.forEach(entry => {
    if (entry.length !== HEADERS.length) {
      throw new Error("File must contain the correct number of columns in each entry");
    }
  })
}

function getEntriesFromCSV(file) {
  return file
    .split("\n")
    .slice(1)
    .map(entry => entry.split(",").map(field => field.trim()));
}

function getHeadersFromCSV(file) {
  return file
  .split("\n")
  .slice(0, 1)
  .map(headers => headers.split(",").map(header => header.trim()))[0];
}

function convertCSVToArray(pathToRead) {
  let file = fs.readFileSync(pathToRead, {encoding: encoding});
  let headers = getHeadersFromCSV(file);
  let entries = getEntriesFromCSV(file);
  let newEntries = [];

  entries.forEach(entry => {
    let newEntry = {};
    entry.forEach((field, idx) => {
      newEntry[headers[idx]] = field;
    });
    newEntries.push(newEntry);
  });
  return newEntries;
}

function convertArrayToCSV(entries, pathToWrite) {
  let newEntries = [];
  newEntries.push(HEADERS.join(","));

  entries.forEach(entry => {
    let newEntry = [];
    Object.keys(entry).forEach(field => {
      newEntry[HEADERS.indexOf(field)] = entry[field];
    });
    newEntries.push(newEntry.join(","));
  });

  fs.writeFileSync(pathToWrite, newEntries.join("\n"))
}

function filterBy(entries, filterType) {
  let filteredEntries = [];
  let fieldValueList = {};
  entries.forEach(entry => {
    let duplicate = false;
    Object.keys(entry).forEach(field => {
      if (!Array.isArray(fieldValueList[field])) {
        fieldValueList[field] = [];
      }
      if (field === filterType && fieldValueList[field].includes(entry[field])) {
        duplicate = true;
      }
      fieldValueList[field].push(entry[field]);
    });
    if (!duplicate) {
      filteredEntries.push(entry);
    }
  });
  
  return filteredEntries;
}

function removeDuplicates(entries, detectionStrategy) {
  let filteredEntries;

  switch(detectionStrategy) {
    case "email":
      filteredEntries = filterBy(entries, "Email");
      break;
    case "phone":
      filteredEntries = filterBy(entries, "Phone");
      break;
    case "email_or_phone":
      filteredEntries = filterBy(entries, "Email");
      filteredEntries = filterBy(filteredEntries, "Phone");
  }

  return filteredEntries;
}

function orchestrator(pathToRead, detectionStrategy, pathToWrite) {
  validateFile(pathToRead);
  let entries = convertCSVToArray(pathToRead);
  validateEntries(entries);
  let filteredEntries = removeDuplicates(entries, detectionStrategy);
  convertArrayToCSV(filteredEntries, pathToWrite);
}

module.exports = {
  orchestrator,
  removeDuplicates,
  convertCSVToArray,
  convertArrayToCSV,
  validateFile,
  validateEntries,
};