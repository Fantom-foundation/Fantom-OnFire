/**
 * Returns random positive integer between 0 and n - 1.
 *
 * @param {number} n
 * @param {boolean} randInt Return integer
 * @return {number}
 */
export function randNumber(n = 1, randInt = false) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(parseInt(n, 10)) || n < 0) {
        throw new Error('Not a positive integer');
    }

    const value = Math.random() * n;

    if (randInt) {
        return Math.floor(value);
    }

    return value;
}

/**
 * @param {number} a
 * @param {number} b
 * @param {boolean} randInt Return integer
 * @returns {number}
 */
export function randNumberRange(a = 0, b = 1, randInt = false) {
    return a + randNumber(b - a, randInt);
}

export function randInt(n = 1) {
    return randNumber(n, true);
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function randIntRange(a = 0, b = 1) {
    return randNumberRange(a, b, true);
}
