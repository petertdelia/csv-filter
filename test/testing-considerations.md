# Testing considerations

## How to group tests
- according to csv input? 
- according to duplicate detection strategy?

## What to test
- a csv file with all values works with all three detection strategies
- a csv file with missing values works with all three detection strategies
- invalid input throws an appropriate error with all three detection strategies

## Specifying invalid input
- invalid path
- No file at specified path
- file at specified path doesn't contain appropriate headers
- file at specified path doesn't follow the appropriate format (has missing commas, missing newline chars)
  - each line must contain the same number of fields
