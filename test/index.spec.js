'use strict';

const tape = require('tape');

const helpers = require('../');

// `lib/index.js` is require-dir, so the name of every file in lib/ is a public
// export name. Downstream repos go further and import
// `@cloudfour/hbs-helpers/lib/<name>.js` directly from a hardcoded list, which
// means renaming a file breaks their build at registration time rather than
// merely changing a key here.
//
// This list is deliberately hand-written. Deriving it from the filesystem would
// make the assertion tautological. Adding a helper means adding it here too --
// that edit is the point, so a change to the public surface shows up in review.
const EXPECTED_HELPERS = [
  'all',
  'and',
  'any',
  'around',
  'average',
  'capitalize',
  'capitalizeWords',
  'compare',
  'concat',
  'defaultTo',
  'dummyImgSrc',
  'iterate',
  'math',
  'maybe',
  'or',
  'random',
  'randomItem',
  'replaceAll',
  'split',
  'svg',
  'timestamp',
  'toFixed',
  'toFraction',
  'toJSON',
  'toSlug',
  'toTitle',
];

tape('exports', (test) => {
  test.plan(4);

  test.deepEqual(
    Object.keys(helpers).toSorted(),
    EXPECTED_HELPERS.toSorted(),
    'Exports exactly the expected set of helpers'
  );

  test.deepEqual(
    EXPECTED_HELPERS.filter((name) => typeof helpers[name] !== 'function'),
    [],
    'Every helper is a function'
  );

  // The deep path is API too, because that is what consumers import.
  test.deepEqual(
    EXPECTED_HELPERS.filter((name) => {
      try {
        return require(`../lib/${name}.js`) !== helpers[name];
      } catch {
        return true;
      }
    }),
    [],
    'Every helper resolves at lib/<name>.js and is the same reference'
  );

  test.equal(
    typeof helpers.svg.create,
    'function',
    'The svg helper exposes create(), as its docblock documents'
  );
});
