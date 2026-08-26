'use strict';

const R = require('ramda');

/**
 * Return only one random item. If only one argument is provided and it is an
 * array, it will return a random item from that array. Otherwise it will return
 * one of the arguments.
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

function randomItem (...args) {
  let items = R.dropLast(1, args);

  if (items.length === 0) {
    throw new Error('The helper "randomItem" must be passed at least one argument.');
  }

  if (items.length === 1) {
    items = R.is(Array, items[0]) ? items[0] : [items[0]];
  }

  return items[Math.floor(Math.random() * items.length)];
};

module.exports = randomItem;
