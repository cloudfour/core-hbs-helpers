'use strict';

const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

const Handlebars = require('handlebars');
const ltx = require('ltx');
const R = require('ramda');

const readAndCache = R.memoizeWith(R.identity, (name) => fs.readFileSync(name, 'utf8'));

const pathToSvg = R.pipe(readAndCache, ltx.parse);

function createSvgHelper (settings) {
  settings = R.mergeRight({
    basePath: process.cwd(),
    extName: '.svg',
    omitAttr: ['xmlns', 'xmlns:xlink'],
  }, settings);

  return function svg (name, options) {
    if (arguments.length < 2) {
      throw new Error('The "svg" helper requires a file path.');
    }

    if (path.extname(name) === '') {
      name += settings.extName;
    }

    name = path.join(settings.basePath, name);
    const parsed = pathToSvg(name);

    if (parsed.name !== 'svg') {
      throw new TypeError('The "svg" helper only supports SVG files.');
    }

    parsed.attrs = R.pipe(
      R.omit(settings.omitAttr),
      R.mergeRight(R.__, options.hash)
    )(parsed.attrs);

    if (!R.isNil(options.fn)) {
      const prepend = ltx.parse(`<root>${options.fn(this)}</root>`);
      parsed.children = [...prepend.children, ...parsed.children];
    }

    return new Handlebars.SafeString(parsed.root());
  }
}

/**
 * Returns the contents of the SVG at the specified path, with any attributes
 * passed along via the hash included on the root element.
 *
 * Inspired by https://github.com/aredridel/npm-handlebars-helper-svg
 *
 * @since v0.6.0
 * @param {string} name - The path to the SVG. The extension may be omitted.
 * @param {object} options
 * @returns {string}
 * @example
 *
 *   {{svg "foo/test.svg"}}
 *
 *   {{svg "foo/test"}}
 *
 *   {{svg "foo/test" class="foo" width="24" height="24"}}
 *
 *   {{#svg "foo/test" aria-labelledby="foo-title"}}
 *     <title id="foo-title">Hello world</title>
 *   {{/svg}}
 */

module.exports = createSvgHelper();

/**
 * Returns a new instance of the svg helper with settings applied. Useful for
 * defining a base path for the project so you don't have to specify it for
 * every usage of the helper.
 *
 * @since v0.6.0
 * @param {object} [settings]
 * @param {string} [settings.basePath] - Base path for file lookups.
 * @param {string} [settings.extName] - Extension to use when it is omitted.
 * @param {Array} [settings.omitAttr] - Attributes to strip from the SVG root element.
 * @example
 *
 *   var svgHelper = require('path/to/module').create({
 *     basePath: './src/assets/images'
 *   });
 */

module.exports.create = createSvgHelper;
