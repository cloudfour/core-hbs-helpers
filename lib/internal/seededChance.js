'use strict';

const Chance = require('chance');
const R = require('ramda');

// Shared by every helper made with a `seed`, so `random` and `randomItem`
// given the same seed draw from one repeatable sequence. This file lives in a
// subdirectory because `lib/index.js` registers every top-level file in `lib/`
// as a helper.
const instances = new Map();

/**
 * Returns a function that takes a helper's Handlebars options and returns the
 * Chance instance for that call, or `undefined` when no seed was configured.
 *
 * @param {string} helperName - Used in error messages.
 * @param {*|((options: object) => *)} [seed] - A seed, or a function of `options` returning one.
 * @returns {(options: object) => (object|undefined)}
 */
function createSeededLookup (helperName, seed) {
  if (R.isNil(seed)) {
    return () => {};
  }

  return (options) => {
    const value = R.is(Function, seed) ? seed(options) : seed;

    if (R.isNil(value)) {
      throw new TypeError(`The "${helperName}" helper's seed function returned ${value}.`);
    }

    if (!instances.has(value)) {
      instances.set(value, new Chance(value));
    }

    return instances.get(value);
  };
}

/**
 * Discards every seeded instance, so the next call for each seed starts its
 * sequence over.
 */
function resetSeeded () {
  instances.clear();
}

module.exports = { createSeededLookup, resetSeeded };
