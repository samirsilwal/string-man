# Manipulate String Inputs

A GitHub Action to manipulate string inputs with different functions.

## Overview

This action allows you to manipulate strings using various functions directly in your GitHub workflows. You can specify the input string, the function to apply, and any additional parameters required by the function.

### Author

- **Samir Silwal**

## Inputs

| Input   | Description                             | Required | Default    |
|---------|-----------------------------------------|----------|------------|
| `input` | The string input to manipulate           | Yes      | N/A        |
| `func`  | The function to run on the input string  | No       | `identity` |
| `params`| Parameters for the specified function   | No       | `''`       |

## Outputs

| Output | Description                                 |
|--------|---------------------------------------------|
| `value`| The value returned by the function operation |

## Supported Functions

Below is a list of supported string manipulation functions with their descriptions:

| Function           | Description                                                             |
|--------------------|------------------------------------------------------------------------|
| `equals`           | Checks if the input string equals another string.                      |
| `identity`         | Returns the input string as it is.                                      |
| `length`           | Returns the length of the string.                                       |
| `charAt`           | Returns the character at a specified index.                             |
| `charCodeAt`       | Returns the Unicode value of the character at a specified index.        |
| `at`               | Returns the character at the specified index, supports negative indexing.|
| `indexOf`          | Returns the position of the first occurrence of a substring.            |
| `lastIndexOf`      | Returns the position of the last occurrence of a substring.             |
| `includes`         | Checks if the string contains a specific substring.                    |
| `startsWith`       | Checks if the string starts with a specific substring.                 |
| `endsWith`         | Checks if the string ends with a specific substring.                   |
| `concat`           | Joins two or more strings into one.                                     |
| `replace`          | Replaces the first occurrence of a substring with a new value.          |
| `replaceAll`       | Replaces all occurrences of a substring with a new value.               |
| `slice`            | Extracts a section of the string and returns it as a new string.        |
| `substring`        | Returns a substring between specified indices.                          |
| `substr`           | Returns a substring starting at a specified index for a given length.   |
| `padStart`         | Pads the string from the start to reach a specified length.             |
| `padEnd`           | Pads the string from the end to reach a specified length.               |
| `trim`             | Removes whitespace from both ends of the string.                        |
| `trimStart`/`trimLeft` | Removes whitespace from the start of the string.                   |
| `trimEnd`/`trimRight`   | Removes whitespace from the end of the string.                     |
| `toUpperCase`      | Converts the string to uppercase.                                       |
| `toLowerCase`      | Converts the string to lowercase.                                       |
| `toLocaleUpperCase`| Converts the string to uppercase using locale-specific rules.           |
| `toLocaleLowerCase`| Converts the string to lowercase using locale-specific rules.           |
| `split`            | Splits the string into an array of substrings based on a separator.     |
| `repeat`           | Repeats the string a specified number of times.                         |
| `localeCompare`    | Compares two strings in the current locale.                             |

### JSON-Based Chained String Operations

`func` input also support for JSON input to define multiple string operations and their respective parameters, enabling chaining of operations in a single action.

#### Usage

Instead of passing a single operator, you can now pass a JSON array to define multiple operators and their parameters. The `operator` parameter should be a valid JSON string representing an array of arrays, where each inner array contains an operation name followed by its corresponding arguments.

#### JSON Format

The JSON format should be as follows:

```json
[
  ["operator1", "param1", "param2", ...],
  ["operator2", "param1", "param2", ...],
  ...
]
```
### Example

```json
[
  ["replace", "hello", "gg"],
  ["includes", "gg"]
]
```

## Usage

Below is an example of how to use this GitHub Action in your workflow:

```yaml
name: String Manipulation Example

on:
  push:
    branches:
      - main

jobs:
  manipulate-string:
    runs-on: ubuntu-latest
    steps:
      - name: Manipulate String Input
        uses: samirsilwal/string-man@v1
        with:
          input: 'Hello World'
          func: 'toUpperCase'
```
OR

```yaml
      - name: Manipulate string inputs
        id: operate
        uses: ./
        with:
          input: ${{ github.event.inputs.value }}
          func: ${{ github.event.inputs.operation }}
          params: ${{ github.event.inputs.params }}
      
      - name: Print the output value
        run: echo "Output value is ${{ steps.operate.outputs.value }}"
```
