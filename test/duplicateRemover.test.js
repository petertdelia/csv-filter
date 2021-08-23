const { 
  removeDuplicates, 
  convertCSVToArray, 
  validateFile, 
  validateEntries,
  convertArrayToCSV,
  orchestrator,
} = require("../lib/duplicateRemover");
const fs = require("fs");

let inputPath, detectionStrategy, entries, expectedResult;

describe("A CSV file with all values present", () => {
  beforeEach(() => {
    inputPath = "./test/csv-test-files/test-all-values-input.csv";
    entries = convertCSVToArray(inputPath);
  });

  test("is successfully converted to an array of objects", () => {
    expectedResult = [
      {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Peter',
        LastName: 'Delia',
        Email: 'pdelia@gmail.com',
        Phone: '123.456.7890'
      },
      {
        FirstName: 'Joe',
        LastName: 'Hood',
        Email: 'jhood@gmail.com',
        Phone: '098-765-4321'
      },
      {
        FirstName: 'Jane',
        LastName: 'Doe',
        Email: 'Jdoe@gmail.com',
        Phone: '456-789-9012'
      }
    ];

    expect(convertCSVToArray(inputPath)).toEqual(expectedResult);
  });

  test("has duplicates removed by email address, handles upper- and lower-case differences", () => {
    detectionStrategy = "email";
    expectedResult = [
      {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Peter',
        LastName: 'Delia',
        Email: 'pdelia@gmail.com',
        Phone: '123.456.7890'
      },
      {
        FirstName: 'Joe',
        LastName: 'Hood',
        Email: 'jhood@gmail.com',
        Phone: '098-765-4321'
      }
    ]
    
    expect(removeDuplicates(entries, detectionStrategy)).toEqual(expectedResult);
  });

  test("has duplicates removed by phone number, handles different non-numeric chars", () => {
    detectionStrategy = "phone";
    expectedResult = [
      {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Joe',
        LastName: 'Hood',
        Email: 'jhood@gmail.com',
        Phone: '098-765-4321'
      },
      {
        FirstName: 'Jane',
        LastName: 'Doe',
        Email: 'Jdoe@gmail.com',
        Phone: '456-789-9012'
      }
    ];
    
    expect(removeDuplicates(entries, detectionStrategy)).toEqual(expectedResult);
  });

  test("has duplicates removed by email address and phone number", () => {
    detectionStrategy = "email_or_phone";
    expectedResult = [
      {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Joe',
        LastName: 'Hood',
        Email: 'jhood@gmail.com',
        Phone: '098-765-4321'
      }
    ];
    
    expect(removeDuplicates(entries, detectionStrategy)).toEqual(expectedResult);
  });

  test("removes email duplicates end-to-end", () => {
    detectionStrategy = "email";
    inputPath = "./test/csv-test-files/test-all-values-input.csv";
    let expectedPath = "./test/csv-test-files/test-all-values-expected.csv";
    let pathToWrite = "./test/csv-test-files/test.csv";
    expectedResult = fs.readFileSync(expectedPath, {encoding: "utf-8"});
    orchestrator(inputPath, detectionStrategy, pathToWrite)

    expect(fs.readFileSync(pathToWrite, {encoding: "utf-8"})).toEqual(expectedResult);
  });
})

describe("A CSV file with some values missing", () => {

  beforeEach(() => {
    inputPath = "./test/csv-test-files/test-missing-values-input.csv";
    entries = convertCSVToArray(inputPath);
  });

  test("is successfully converted to an array of objects", () => {
    expectedResult = [
      {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Peter',
        LastName: 'Delia',
        Email: '',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Joe',
        LastName: 'Hood',
        Email: 'jhood@gmail.com',
        Phone: ''
      },
      {
        FirstName: 'Jane',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '456-789-9012'
      }
    ];
    
  });

  test("has duplicates removed by email address", () => {
    detectionStrategy = "email";
    expectedResult = [
      {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Peter',
        LastName: 'Delia',
        Email: '',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Joe',
        LastName: 'Hood',
        Email: 'jhood@gmail.com',
        Phone: ''
      }
    ];

    expect(removeDuplicates(entries, detectionStrategy)).toEqual(expectedResult);
  });

  test("has duplicates removed by phone number", () => {
    detectionStrategy = "phone";
    expectedResult = [
      {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Joe',
        LastName: 'Hood',
        Email: 'jhood@gmail.com',
        Phone: ''
      },
      {
        FirstName: 'Jane',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '456-789-9012'
      }
    ];

    expect(removeDuplicates(entries, detectionStrategy)).toEqual(expectedResult);
  });

  test("has duplicates removed by email address and phone number", () => {
    detectionStrategy = "email_or_phone";
    expectedResult = [
      {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Joe',
        LastName: 'Hood',
        Email: 'jhood@gmail.com',
        Phone: ''
      }
    ];

    expect(removeDuplicates(entries, detectionStrategy)).toEqual(expectedResult);
  });

  test("removes email duplicates end-to-end", () => {
    detectionStrategy = "email";
    inputPath = "./test/csv-test-files/test-missing-values-input.csv";
    let expectedPath = "./test/csv-test-files/test-missing-values-expected.csv";
    let pathToWrite = "./test/csv-test-files/test.csv";
    expectedResult = fs.readFileSync(expectedPath, {encoding: "utf-8"});
    orchestrator(inputPath, detectionStrategy, pathToWrite);

    expect(fs.readFileSync(pathToWrite, {encoding: "utf-8"})).toEqual(expectedResult);
  });
});

describe("An array of objects", () => {
  test("is successfully written to a csv file", () => {
    inputPath = "./test/csv-test-files/test-all-values-input.csv";
    let pathToWrite = "./test/csv-test-files/test.csv";
    expectedResult = fs.readFileSync(inputPath, {encoding: "utf-8"});
    entries = [
      {
        FirstName: 'John',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '123-456-7890'
      },
      {
        FirstName: 'Peter',
        LastName: 'Delia',
        Email: 'pdelia@gmail.com',
        Phone: '123.456.7890'
      },
      {
        FirstName: 'Joe',
        LastName: 'Hood',
        Email: 'jhood@gmail.com',
        Phone: '098-765-4321'
      },
      {
        FirstName: 'Jane',
        LastName: 'Doe',
        Email: 'Jdoe@gmail.com',
        Phone: '456-789-9012'
      }
    ];

    convertArrayToCSV(entries, pathToWrite);

    expect(fs.readFileSync(pathToWrite, {encoding: "utf-8"})).toEqual(expectedResult);
  });
});

describe("A CSV file with missing or wrong headers", () => {
  test("throws an appropriate error", () => {
    inputPath = "./test/csv-test-files/test-missing-headers-input.csv";
    expect(() => {
      validateFile(inputPath);
    }).toThrowError("File must contain headers [FirstName, LastName, Email, Phone]");
  });
});

describe("A CSV file that contains entries with the wrong number of columns", () => {
  test("throws an appropriate error", () => {
    inputPath = "./test/csv-test-files/test-missing-columns-input.csv";
    entries = convertCSVToArray(inputPath);
    expect(() => {
      validateEntries(entries);
    }).toThrowError("File must contain the correct number of columns in each entry");
  });
});

describe("An invalid file path", () => {
  test("throws an error", () => {
    inputPath = "./test/csv-test-files/no-such-file";
    expect(() => {
      validateFile(inputPath);
    }).toThrow();
  })
});