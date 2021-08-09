const duplicateFilter = require("../lib/duplicateFilter");
const FILE_PATH = "./test/all-values-test.csv";
let detectionStrategy, result;

describe("A CSV file with all values present", () => {
  test("removes duplicates by email address", () => {
    detectionStrategy = "email";
    result = 
    expect(duplicateFilter(FILE_PATH, detectionStrategy)).toBe("4");
  });

  xtest("removes duplicates by phone number", () => {
    detectionStrategy = "phone";
    expect(duplicateFilter(FILE_PATH, detectionStrategy)).toBe("4");
  });

  xtest("removes duplicates by email address and phone number", () => {
    detectionStrategy = "email_or_phone";
    expect(duplicateFilter(FILE_PATH, detectionStrategy)).toBe("4");
  });
})

describe("A CSV file with some values missing", () => {
  xtest("removes duplicates by email address", () => {
    expect(duplicateFilter(FILE_PATH, detectionStrategy)).toBe("4");
  });

  xtest("removes duplicates by phone number", () => {
    expect(duplicateFilter()).toBe("4");
  });

  xtest("removes duplicates by email address and phone number", () => {
    expect(duplicateFilter()).toBe("4");
  });
});

describe("A CSV file without headers", () => {
  xtest("throws an appropriate error", () => {
    expect(duplicateFilter()).toBe("4");
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