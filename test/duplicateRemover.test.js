const { removeDuplicates, convertCSVToArray } = require("../lib/duplicateRemover");
let filePath, detectionStrategy, entries, expectedResult;

describe("A CSV file with all values present", () => {
  beforeEach(() => {
    filePath = "./test/test-all-values.csv";
    entries = convertCSVToArray(filePath);
  });

  xtest("is successfully converted to an array of objects", () => {
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
      },
      {
        FirstName: 'Jane',
        LastName: 'Doe',
        Email: 'jdoe@gmail.com',
        Phone: '456-789-9012'
      }
    ];

    expect(convertCSVToArray(filePath)).toEqual(expectedResult);
  });

  xtest("has duplicates removed by email address", () => {
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

  xtest("has duplicates removed by phone number", () => {
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

  xtest("has duplicates removed by email address and phone number", () => {
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

  beforeEach(() => {
    filePath = "./test/test-missing-values.csv";
    entries = convertCSVToArray(filePath);
  });

  xtest("is successfully converted to an array of objects", () => {
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

  xtest("removes duplicates by phone number", () => {
    detectionStrategy = "phone";
    expect(removeDuplicates()).toEqual("4");
  });

  xtest("removes duplicates by email address and phone number", () => {
    detectionStrategy = "email_or_phone";
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