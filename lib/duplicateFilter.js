const fs = require('fs');

/*

[
  [ [ 'firstname', 'lastname', 'email', 'phone' ] ],
  [
    [ 'John', 'Doe', 'jdoe@gmail.com', '123-456-7890' ],
    [ 'Peter', 'Delia', 'pdelia@gmail.com', '123-456-7890' ],
    [ 'Joe', 'Hood', 'jhood@gmail.com', '098-765-4321' ],
    [ 'Jane', 'Doe', 'jdoe@gmail.com', '456-789-9012' ]
  ]
]

[
  {
    firstname: 'John', lastname, 'Doe', email: 'jdoe@gmail.com', phone: '123-456-7890'
  },
  {
    etc.
  }
]

*/

function fileValidator(filePath) {

}

function getEntries(file) {
  return file
    .split("\n")
    .slice(1)
    .map(entry => entry.split(",").map(field => field.trim()));
}

function getHeaders(file) {
  return headers = file
  .split("\n")
  .slice(0, 1)
  .map(headers => headers.split(",").map(header => header.trim()))[0];
}

function consolidateEntries(file) {
  let entries = getEntries(file);
  let headers = getHeaders(file);
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

function filterByEmail(entries) {

  // let entryObj = {};
  // let newEntries = [];
  // entries.forEach(entry => {
  //   entry.forEach(field => {
  //     if (!entryObj[field]) {
  //       entryObj[field] = true;
  //     }
  //     if ()
  //   })
  // })
  return [headers, entries];
}

function filterByPhone(entries) {

}

function filterByEmailOrPhone(entries) {

}

function duplicateFilter(filePath, detectionStrategy) {
  fileValidator(filePath);
  let file = fs.readFileSync(filePath, {encoding: 'utf8'});
  let consolidatedEntries = consolidateEntries(file);

  switch(detectionStrategy) {
    case "email":
      return filterByEmail(consolidatedEntries);
    case "phone":
      return filterByPhone(consolidatedEntries);
    case "email_or_phone":
      return filterByEmailOrPhone(consolidatedEntries);
  }
}

module.exports = duplicateFilter;