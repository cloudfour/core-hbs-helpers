'use strict';

const R = require('ramda');

const { createSeededLookup, resetSeeded } = require('./internal/seededChance.js');

function createRandomItemHelper (settings = {}) {
  const lookup = createSeededLookup('randomItem', settings.seed);

  function randomItem (...args) {
    const options = R.last(args);
    let items = R.dropLast(1, args);

    if (items.length === 0) {
      throw new Error('The helper "randomItem" must be passed at least one argument.');
    }

    if (items.length === 1) {
      items = R.is(Array, items[0]) ? items[0] : [items[0]];
    }

    const chance = lookup(options);
    const float = chance ? chance.random() : Math.random();

    return items[Math.floor(float * items.length)];
  }

  randomItem.reset = resetSeeded;

  return randomItem;
}

/**
 * Return only one random item. If only one argument is provided and it is an
 * array, it will return a random item from that array. Otherwise it will return
 * one of the arguments.
 *
 * Output differs on every render. Use `randomItem.create({ seed })` for output
 * that repeats from one build to the next.
 *
 * @since v0.0.1
 * @param {...*} items
 * @returns {any} One random item.
 * @example
 * var beatles = ["John", "Paul", "George", "Ringo"];
 * {{randomItem beatles}} //=> "George"
 *
 * {{randomItem "John" "Paul" "George" "Ringo"}} //=> "Ringo"
 */

module.exports = createRandomItemHelper();

/**
 * Returns a new instance of the randomItem helper with settings applied. Takes
 * the same settings as `random.create()`, and a `randomItem` helper given the
 * same seed as a `random` helper draws from the same sequence.
 *
 * @since v0.13.0
 * @param {object} [settings]
 * @param {*|((options: object) => *)} [settings.seed] - A seed for Chance.js, or a function
 *   that receives the helper's `options` and returns one.
 * @returns {(...args: *[]) => *} The helper, with a `reset()` method.
 * @example
 *
 *   const randomItem = require('@cloudfour/hbs-helpers/lib/randomItem.js');
 *
 *   handlebars.registerHelper('randomItem', randomItem.create({
 *     seed: (options) => options.data.root.page.inputPath,
 *   }));
 */

module.exports.create = createRandomItemHelper;
