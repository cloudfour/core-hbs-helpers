'use strict';

// Every helper is listed by hand. Node scans this file's source to find named
// exports for ESM consumers, and only recognises the shorthand properties
// below, so `import { random } from '@cloudfour/hbs-helpers'` works. Adding a
// helper means adding it here and to the list in test/index.spec.js.

const all = require('./all.js');
const and = require('./and.js');
const any = require('./any.js');
const around = require('./around.js');
const average = require('./average.js');
const capitalize = require('./capitalize.js');
const capitalizeWords = require('./capitalizeWords.js');
const compare = require('./compare.js');
const concat = require('./concat.js');
const defaultTo = require('./defaultTo.js');
const dummyImgSrc = require('./dummyImgSrc.js');
const iterate = require('./iterate.js');
const math = require('./math.js');
const maybe = require('./maybe.js');
const or = require('./or.js');
const random = require('./random.js');
const randomItem = require('./randomItem.js');
const replaceAll = require('./replaceAll.js');
const split = require('./split.js');
const svg = require('./svg.js');
const timestamp = require('./timestamp.js');
const toFixed = require('./toFixed.js');
const toFraction = require('./toFraction.js');
const toJSON = require('./toJSON.js');
const toSlug = require('./toSlug.js');
const toTitle = require('./toTitle.js');

module.exports = {
  all,
  and,
  any,
  around,
  average,
  capitalize,
  capitalizeWords,
  compare,
  concat,
  defaultTo,
  dummyImgSrc,
  iterate,
  math,
  maybe,
  or,
  random,
  randomItem,
  replaceAll,
  split,
  svg,
  timestamp,
  toFixed,
  toFraction,
  toJSON,
  toSlug,
  toTitle,
};
