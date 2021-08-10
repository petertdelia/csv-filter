const { removeDuplicates, convertCSVToArray } = require("../lib/duplicateRemover");
let filePath, detectionStrategy, expectedResult;

describe("A CSV file with all values present", () => {
  filePath = "./test/test-all-values.csv";
  let entries = convertCSVToArray(filePath)

  test("removes duplicates by email address", () => {
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
        Phone: '123-456-7890'
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

  test("removes duplicates by phone number", () => {
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
        Email: 'jdoe@gmail.com',
        Phone: '456-789-9012'
      }
    ];
    
    expect(removeDuplicates(entries, detectionStrategy)).toEqual(expectedResult);
  });

  test("removes duplicates by email address and phone number", () => {
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
})

describe("A CSV file with some values missing", () => {
  filePath = "./test/test-missing-values.csv";

  xtest("removes duplicates by email address", () => {
    expect(removeDuplicates(entries, detectionStrategy)).toEqual("4");
  });

  xtest("removes duplicates by phone number", () => {
    expect(removeDuplicates()).toEqual("4");
  });

  xtest("removes duplicates by email address and phone number", () => {
    expect(removeDuplicates()).toEqual("4");
  });
});

describe("A CSV file without headers", () => {
  xtest("throws an appropriate error", () => {
    expect(removeDuplicates()).toBe("4");
  });
})

describe("An invalid file path", () => {
  xtest("throws an error", () => {

  })
})

describe("An invalid file type", () => {
  xtest("throws an error", () => {

  })
})