const util = require('util');

const wl = require('./wordladder.js');

function cli(args) {
    if (args.length < 1) {
        console.error(`Need args: need at least 1. got = ${args.length}`);
        return;
    }
    let [cmd, ...vargs] = args;
    try {
        switch (cmd) {
            case 'generate':
                generateLadder(vargs);
                break;
            case 'solve':
                solveLadder(vargs);
                break;
            default:
                throw new WlError(
                    `Invald command '${cmd}'. available are ['generate', 'solve']`);
        }
    } catch (e) {
        console.error(e instanceof WlError ? e.message : e);
    }
}

function generateLadder(args) {
    let start = validWord(args.length === 1 ? args[0] : wl.randomWord());
    let puzzle = wl.generatePuzzle(start);
    if (puzzle.length === 0) {
        throw new WlError(`Could not find a generate a puzzle for start: ${start}`)
    }
    console.log(fmtGenerated(puzzle));
}

function solveLadder(args) {
    if (args.length < 2) {
        throw new WlError(`Not enough args for solver. got=${args.length} want=2`)
    }
    let [start, end] = [validWord(args[0]), validWord(args[1])];
    let solution = wl.solvePuzzle(start, end);
    if (solution.length === 0) {
        throw new WlError(`Could not find a solution for ${start} to ${end}`)
    }
    console.log(fmtSolution(solution));
}


function validWord(word) {
    if (word.length !== 4) {
        throw new WlError(
            `All words should be 4 letters long. ${word} has ${word.length} letters`);
    }
    if (!wl.words.has(word)) {
        throw new WlError(`${word} is not a valid word in our dictionary`)
    }
    return word.toLowerCase();
}

function fmtSolution(words) {
    return util.format('\b' + ladder.repeat(words.length), ...words).toUpperCase();
}

function fmtGenerated(words) {
    return util.format('\b' 
        + ladder 
        + ladderBlank.repeat(words.length-2)
        + ladder,
        words[0], words[words.length-1]).toUpperCase();
}

// InternalError for custom error handling.
class WlError extends Error {};

const ladder = '\n║ %s ║\n╠══════╣';
const ladderBlank = util.format(ladder, '    ');

cli(process.argv.slice(2));
