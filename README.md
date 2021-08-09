# duplicate-filter

## Description
- duplicate-filter is an npm package that takes a csv file and a duplicate filtering strategy, and writes a new csv file with duplicates removed according to the specified strategy.

## Installation
- git clone and cd into project directory
- run `npm install`

## Usage
- from the root project directory, run `npm run duplicate-filter [path/to/csv/file] [removal strategy]`
- `path-to-csv-file` is relative to the root project directory
- `removal strategy` is one of: `email`, `phone`, `email_or_phone`
- the program outputs to a file named `output.csv` in the root project directory


## Testing
- from the root project directory, run `npm run test` to run all tests
- tests are kept in the `tests` directory

## Future work
- add command line option to specify output directory and file name