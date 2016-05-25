'use strict';

var R = require('ramda');
var ltx = require('ltx');
var Handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

function createSvgHelper (settings) {
  var cache = {};

  settings = R.merge({
    basePath: process.cwd(),
    extName: '.svg',
    omitAttr: ['xmlns', 'xmlns:xlink'],
  }, settings);

  return function svg (name, options) {
    var svg;

    if (arguments.length < 2) {
      throw new Error('The "svg" helper requires a file path.');
    }

    if (path.extname(name) === '') {
      name += settings.extName;
    }

    name = path.join(settings.basePath, name);

    if (!cache[name]) {
      cache[name] = fs.readFileSync(name, 'utf-8');
    }

    svg = ltx.parse(cache[name]);

    if (svg.name !== 'svg') {
      throw new TypeError('The "svg" helper only supports SVG files.');
    }

    svg.attrs = R.pipe(
      R.omit(settings.omitAttr),
      R.merge(R.__, options.hash)
    )(svg.attrs);

    return new Handlebars.SafeString(svg.root());
  }
}

/**
 * Returns the contents of the SVG at the specified path, with any attributes
 * passed along via the hash included on the root element.
 *
 * Inspired by https://github.com/aredridel/npm-handlebars-helper-svg
 *
 * @since v0.6.0
 * @param {String} name - The path to the SVG. The extension may be omitted.
 * @param {Object} options
 * @return {String}
 * @example
 *
 *   {{svg "foo/test.svg"}}
 *
 *   {{svg "foo/test"}}
 *
 *   {{svg "foo/test" class="foo" width="24" height="24"}}
 */

module.exports = createSvgHelper();

/**
 * Returns a new instance of the svg helper with settings applied. Useful for
 * defining a base path for the project so you don't have to specify it for
 * every usage of the helper.
 *
 * @since v0.6.0
 * @param {Object} [settings]
 * @param {String} [settings.basePath] - Base path for file lookups.
 * @param {String} [settings.extName] - Extension to use when it is omitted.
 * @param {Array} [settings.omitAttr] - Attributes to strip from the SVG root element.
 * @example
 *
 *   var svgHelper = require('path/to/module').create({
 *     basePath: './src/assets/images'
 *   });
 */

module.exports.create = createSvgHelper;
