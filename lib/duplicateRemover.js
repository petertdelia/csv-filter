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
    if (Object.keys(entry).length !== HEADERS.length) {
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
      if (typeof fieldValueList[field] !== 'object') {
        fieldValueList[field] = {};
      }
      switch(filterType) {
        case 'Phone':
          if (field === 'Phone') {
            let phoneNum = entry[field].replace(/[^0-9]/gi, "");
            fieldValueList[field][phoneNum] ? duplicate = true : fieldValueList[field][phoneNum] = true;
          }
          break;
        case 'Email':
          if (field === 'Email' && fieldValueList[field][entry[field].toLowerCase()]) {
            duplicate = true;
          } else {
            fieldValueList[field][entry[field].toLowerCase()] = true;
          }
          break;
      }
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