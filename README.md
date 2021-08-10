# duplicate-filter

## Description
- duplicate-filter is a command line utility that takes a csv file and a duplicate filtering strategy, and writes a new csv file with duplicates removed according to the specified strategy.

## Installation
- run `git clone https://github.com/petertdelia/duplicate-filter.git` and `cd duplicate-filter`
- run `npm install`

## Usage
- from the root project directory, run `npm run duplicate-filter [path/to/csv/file] [removal strategy]`
- `path/to/csv/file` is relative to the root project directory, defaults to `example.csv`
- `removal strategy` is one of: `email`, `phone`, `email_or_phone`, defaults to `email`
- the defaults can be modified in `constants.js`
- the program outputs to a file named `output.csv` in the root project directory


## Testing
- from the root project directory, run `npm run test` to run all tests. This command outputs code coverage as well
- tests are kept in the `tests` directory

## Design considerations

## Future work
- add command line option to specify output directory and file name