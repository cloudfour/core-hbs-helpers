'use strict';

const Chance = require('chance');
const R = require('ramda');

const { createSeededLookup, resetSeeded } = require('./internal/seededChance.js');

let unseeded;

function createRandomHelper (settings = {}) {
  const lookup = createSeededLookup('random', settings.seed);

  function random (...args) {
    const options = args.pop();
    const hash = options.hash || {};
    const [method = 'integer'] = args;

    if (!R.is(String, method)) {
      throw new Error('The "random" helper\'s first argument must be a String.');
    }

    const chance = lookup(options) ?? (unseeded ||= new Chance());

    if (!R.propIs(Function, method, chance)) {
      throw new Error(`The "random" helper does not support the "${method}" method.`);
    }

    return chance[method](hash);
  }

  random.reset = resetSeeded;

  return random;
}

/**
 * Generate a random integer or any other type of random content supported by
 * [Chance.js](https://chancejs.com).
 *
 * Output differs on every render. Use `random.create({ seed })` for output
 * that repeats from one build to the next.
 *
 * @since v0.4.0
 * @param {string} [method=integer] - Chance method to use.
 * @param {object} options
 * @param {object} options.hash - Additional options to pass to method.
 * @returns {any}
 * @see {@link https://chancejs.com|Chance.js}
 * @example
 * {{random}} //=> 1839473434
 * {{random min=5 max=10}} //=> 7
 * {{random "state"}} //=> WA
 * {{random "dollar" max=20}} //=> $17.42
 */

module.exports = createRandomHelper();

/**
 * Returns a new instance of the random helper with settings applied. Pass a
 * `seed` to make its output repeatable.
 *
 * Each distinct seed value gets one Chance instance, created on first use and
 * shared with `randomItem` helpers given the same seed. Calls within a render
 * still vary from one another, but the sequence is the same in every process.
 *
 * A seed function is called with the helper's Handlebars `options` on every
 * call, so you can seed per page. With one fixed seed, every page draws from
 * a single sequence, and adding a call to one template changes the output of
 * every template rendered after it.
 *
 * Seeded instances keep advancing for the life of the process. In a watch
 * mode that rebuilds without restarting, call `reset()` on the helper before
 * each build so every build repeats the first. Resetting clears the instances
 * for every seed, including those `randomItem` uses.
 *
 * @since v0.13.0
 * @param {object} [settings]
 * @param {*|((options: object) => *)} [settings.seed] - A seed for Chance.js, or a function
 *   that receives the helper's `options` and returns one.
 * @returns {(...args: *[]) => *} The helper, with a `reset()` method.
 * @example
 *
 *   const random = require('@cloudfour/hbs-helpers/lib/random.js');
 *
 *   // One fixed seed for every render
 *   handlebars.registerHelper('random', random.create({ seed: 'my-site' }));
 *
 *   // A seed per page, e.g. in Eleventy
 *   handlebars.registerHelper('random', random.create({
 *     seed: (options) => options.data.root.page.inputPath,
 *   }));
 */

module.exports.create = createRandomHelper;
