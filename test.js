const assert = require('assert').strict;
const wl = require('./wordladder');


describe('generatePuzzle', function () {
    it('should be able to generate a puzzle at least 6 words long', function () {
        assert.equal(wl.generatePuzzle('hell', 6).length, 6);
    });
});

describe('solvePuzzle', function () {
    it('should find be able to find a valid solution', function () {
        assert.deepEqual(wl.solvePuzzle('lent', 'wood', 6),
            ['lent', 'lend', 'fend', 'fond', 'food', 'wood']);
    });S
    // should take a sec or 2
    it('should be able to solve all puzzles we can generate in our wordset', function () {
        let possible = 0;
        let sample = [...wl.words.values()].slice(0, 200);
        for (let start of sample) {
            let puzzle = wl.generatePuzzle(start);
            let end = puzzle[puzzle.length - 1];
            let solution = wl.solvePuzzle(start, end);
            assert.equal(solution.length, puzzle.length);
            assert.equal(solution[solution.length - 1], end);
            if (solution.length === 6) {
                possible++;
            }
        }
        console.log(`\t${possible / 200 * 100}% generatable`);
    });
});

describe('successors', function () {
    it('should return a valid list of successors', function () {
        assert.deepEqual(sorted([...wl.successors('wood')]),
            ['food', 'good', 'hood', 'mood', 'rood']);
    })
})

describe('replaceCharAtIndex', function () {
    it('should replace a character at any index', function () {
        assert.equal(wl.replaceCharAtIndex('gate', 0, 'h'), 'hate');
        assert.equal(wl.replaceCharAtIndex('hate', 3, 's'), 'hats');
        assert.equal(wl.replaceCharAtIndex('hats', 1, 'o'), 'hots');
    });
});

function sorted(arr) {
    arr.sort()
    return arr;
}
