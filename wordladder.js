const fs = require('fs');

// language constants to form our dictionary and possible characters.
const words = new Set(fs.readFileSync('words.txt', 'utf8').split(/\s+/));
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const indices = [0, 1, 2, 3];

/*
Puzzle solving : we need to find 
*/

/**
 * Solve a word ladder puzzle for given start and end words by finding 
 * a valid path between the two. On each rung there must be a valid 
 * four-letter word thay is identical to the word above it, apart 
 * form a one-letter change.
 * @param {string} start word to start from
 * @param {string} end word to end at
 * @param {number} ladderLength number of words needed in the ladder
 * @returns {string[]} valid ladder or empty array
 */
function solve(start, end, ladderLength = 6) {
    if (start === end || !words.has(start) || !words.has(end)) {
        return [];
    }
    let s = [[start]];
    while (s.length > 0) {
        let v = s.pop();
        for (let node of successors(v[v.length-1])) {
            if (v.includes(node)) {
                continue;
            }
            let v2 = v.concat([node]);
            if (v2.length === ladderLength && node === end) {
                return v2;
            }
            if (v2.length < ladderLength) {
                s.push(v2);
            }
        }
    }
    return [];
}

/**
 * An iterator to generate all possible valid successors of the current 
 * word. A word is valid succesor of the current word if it is in our words 
 * set dictionary and is one character different from the current word.
 * @param {string} word start word to seed the generation.
 * @yields {string} a valid successor word.
 */
function* successors(word) {
    for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            // If our update will be the same skip this iteration.
            if (word[i] === alphabet[j]) {
                continue;
            }
            // make the new word and if it is in our words dictionary 
            // yield the result
            let newWord = replaceCharAtIndex(word, i, alphabet[j]);
            if (words.has(newWord)) {
                yield newWord;
            }
        }
    }
}

/* 
Puzzle generation : we need to generate a chain of valid words 
each one character different from eachother for a given ladder length.
*/

/**
 * Generate a new ladder as a string array.
 * @param {string} start start word to seed the generation.
 * @param {number} ladderLength length of ladder puzzle.
 * @returns {string[]} a new valid word ladder.
 */
function generate(start, ladderLength = 6) {
    let ladder = [start];
    for (let i = 1; i < ladderLength; i++) {
        let w = nextWord(ladder);
        if (w === '') {
            return [];
        }
        ladder.push(w);
    }
    return ladder;
}

/**
 * Return a random next possible valid word from the last word
 * in the ladder. A word is valid if its in our words set, 
 * isn't already in our ladder and is one character different
 * from the previous word.
 * @param {array} ladder current word ladder being generated. 
 * @returns {string} a valid next word.
 */
function nextWord(ladder) {
    let prevWord = ladder[ladder.length-1];
    for (let i of randArrayIter(indices)) {
        for (let char of randArrayIter(alphabet)) {
            if (prevWord[i] === char) {
                continue;
            }
            let newWord = replaceCharAtIndex(prevWord, i, char);
            if (words.has(newWord) && !ladder.includes(newWord)) {
                return newWord;
            }
        }
    }
    return '';
}

/* Common utilities */ 

/**
 * Iterate threw an array each item once in a random order.
 * @param {array} array 
 * @yields {any} random array item
 */
function* randArrayIter(array) {
    shuffle(array)
    for (let i = 0; i < array.length; i++) {
        yield array[i];
    }
}

/**
 * Shuffle an array inplace using Fisher–Yates shuffle algorithm.
 * @param {array} array
 * @returns {undefined}
 */ 
function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
}

function randomWord() {
    let i = 0;
    let v = Math.floor(Math.random() * words.size);
    for (let word of words.values()) {
        if (i == v) {
            return word;
        }
        i++;
    }
}

/**
 * Return a new string with a character replaced at a given index
 * @param {string} str original input string to be replaced
 * @param {number} i index to replace
 * @param {string} char character to place in new position
 * @returns {string} updated string
 */
function replaceCharAtIndex(str, i, char) {
    return str.substring(0, i) + char + str.substring(i + 1);
}

module.exports = {
    generate: generate,
    solve: solve,
    nextWord: nextWord,
    successors: successors,
    randomWord: randomWord,
    replaceCharAtIndex: replaceCharAtIndex,
    words: words
}