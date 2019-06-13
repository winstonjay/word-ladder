# Word Ladder
Word ladder puzzles are found daily in a number of newspapers. Here is a simple solver and generator so you can complete every one.

## How to play
Convert the word at the top of the ladder into the word at the bottom of it using only the four rungs inbetween. On each rung you must put a valid four-letter word thay is identical to the word above it, apart form a one-letter change. There may be more than one way of acheiving this.

## Install

```
$ npm install
```

## Word Ladder CLI

Generate a puzzle with a optional start word.

```
$ node wordladder-cli.js generate made
║ MADE ║
╠══════╣
║      ║
╠══════╣
║      ║
╠══════╣
║      ║
╠══════╣
║      ║
╠══════╣
║ MYTH ║
╠══════╣
```

Solve the path between two words. e.g. 'made

```
$ node wordladder-cli.js solve made myth
║ MADE ║
╠══════╣
║ MADS ║
╠══════╣
║ MAYS ║
╠══════╣
║ MATS ║
╠══════╣
║ MATH ║
╠══════╣
║ MYTH ║
╠══════╣
```