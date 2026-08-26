import cloudfour from '@cloudfour/eslint-config';

// This file is `.mjs` rather than `.js` because the package is CommonJS and the
// shared config is ESM-only.

const config = [
  {
    // Inputs to the `svg` helper's tests, not source we control.
    ignores: ['test/fixtures/**'],
  },

  ...cloudfour,

  {
    files: ['**/*.js'],
    languageOptions: {
      // The shared config assumes ESM; everything we publish is CommonJS.
      sourceType: 'commonjs',
    },
    rules: {
      // `lib/index.js` builds its exports with require-dir, so every filename
      // in lib/ is a public export name. Renaming dummyImgSrc.js to
      // dummy-img-src.js would rename the helper and break consumers.
      'unicorn/filename-case': 'off',

      // The shared config turns the JSDoc type rules off on the reasoning that
      // types belong in type annotations. That holds for TypeScript, but this
      // is a plain-JS package whose published documentation is generated from
      // these docblocks, so the types have to live here and have to be checked.
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns-type': 'error',
      'jsdoc/valid-types': 'error',

      // Several helpers accept a value of genuinely any type, which is what
      // `@param {*}` is for.
      'jsdoc/reject-any-type': 'off',

      // `@credit` is this project's convention for attributing a helper that
      // was adapted from someone else's.
      //
      // Every `@example` in this package is a Handlebars template, so a
      // `{{@index}}` in one reads to JSDoc as the inline tag `{@index}`. The
      // Handlebars data variables are listed alongside JSDoc's own inline tags
      // (which this option replaces rather than extends) so that documenting a
      // block helper doesn't trip the rule.
      'jsdoc/check-tag-names': [
        'error',
        {
          definedTags: ['credit'],
          inlineTags: [
            'link',
            'linkcode',
            'linkplain',
            'tutorial',
            'inheritDoc',
            'label',
            'include',
            'includeCode',
            // Handlebars data variables
            'index',
            'key',
            'first',
            'last',
            'root',
            'count',
          ],
        },
      ],
    },
  },

  {
    files: ['lib/**/*.js'],
    rules: {
      // These helpers are handed whatever a template passes them, which is
      // often a string. `Number.parseFloat` stops at the first character it
      // can't read, so `{{math "5px" "+" 2}}` is 7 today; `Number()` would make
      // it NaN. That may well be the better behavior, but it is a change to
      // what the helpers return, not a lint cleanup, so it isn't decided here.
      'unicorn/prefer-number-coercion': 'off',
    },
  },

  {
    files: ['**/package.json'],
    rules: {
      // Publishing ESM or adding an `exports` map would both be breaking
      // changes for consumers of this package.
      'package-json/prefer-type-module': 'off',
      'package-json/prefer-exports': 'off',
    },
  },
];

export default config;
