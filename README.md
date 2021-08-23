# duplicate-remover

## Description
- duplicate-remover is a command line utility that takes a csv file that contains specific headers and a duplicate removal strategy, and writes a new csv file with duplicates removed according to the specified strategy.

## Installation
- run `git clone https://github.com/petertdelia/duplicate-remover.git` and `cd duplicate-remover`
- run `npm install`

## Usage
- from the root project directory, run `npm run duplicate-remover [path/to/csv/file] [removal strategy] [path/to/output]`.
- `path/to/csv/file` defaults to `example.csv` in the root project directory
- `removal strategy` is one of: `email`, `phone`, `email_or_phone`, defaults to `email`
- `path/to/output` defaults to `output.csv` in the root project directory
- the defaults can be modified in `constants.js`
- the input csv file must contain the headers `[ FirstName, LastName, Email, Phone ]`

## Testing
- from the root project directory, run `npm test` to run all tests. This command outputs code coverage as well
- tests are kept in the `tests` directory

## Design considerations
- used functional programming rather than class-based design, for simplicity

## Future work
- extract expected results from tests to de-clutter
- handle special characters in csv files (`,` `\n`)
- handle country codes in phone numbers