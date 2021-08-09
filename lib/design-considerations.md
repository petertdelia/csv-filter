# Design considerations

- representing CSV in JS code
  - [[],[],[]]


- fileReader function
  - takes an argument, path to file
  - validates it
  - converts it to array and returns the array
- fileWriter function
  - takes an argument, 
- duplicateFilter function, 
  - takes two arguments - path to file, duplicate detection strategy
  - invokes fileValidator
  - invokes fileReader, converts file to array
  - checks duplicate detection strategy
    - invokes appropriate function (one of three), passes array
  - invokes fileWriter
- 