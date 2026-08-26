'use strict';

const Handlebars = require('handlebars');
const R = require('ramda');
const tinycolor = require('tinycolor2');

const source = '<svg xmlns="http://www.w3.org/2000/svg" width="{{width}}" height="{{height}}" viewBox="0 0 {{width}} {{height}}">' +
  '<rect fill="{{bg}}" width="100%" height="100%"/>' +
  '<text fill="{{fg}}" font-family="{{font}}" font-size="{{size}}" dy="{{dy}}" font-weight="{{weight}}" x="50%" y="50%" text-anchor="middle">{{{text}}}</text>' +
'</svg>';

const template = Handlebars.compile(source);

function encode (svgString) {
  // Thanks to: filamentgroup/directory-encoder
  return `data:image/svg+xml;charset=US-ASCII,${encodeURIComponent(svgString
    // Strip newlines and tabs
    .replaceAll(/[\n\r]/gv, '')
    .replaceAll('\t', ' ')
    // Strip comments
    .replaceAll(/<!--.*(?=-->)-->/gv, '')
    // Replace
    .replaceAll('\'', String.raw`\i`))
    // Encode brackets
    .replaceAll('(', '%28').replaceAll(')', '%29')}`;
}

function create (width, height, options) {
  options = R.mergeRight(
    {
      width,
      height,
      text: `${width} &#215; ${height}`,
      bg: "#ddd",
      size: Math.floor(height * 0.2),
      dy: Math.floor(height * 0.2 * 0.4),
      weight: "bold",
      font: "sans-serif",
    },
    options || {}
  );

  if (R.isNil(options.fg)) {
    options.fg = (function (bg) {
      const color = tinycolor(bg);
      const method = color.isDark() ? 'lighten' : 'darken';
      return color[method](50).toString();
    })(options.bg);
  }

  return template(options);
}

/**
 * Returns an escaped data URI for a placeholder image that can be used as the
 * src attribute of an img element.
 *
 * @since v0.3.0
 * @param {number} width
 * @param {number} height
 * @param {object} options
 * @returns {string}
 * @example
 * <img src="{{dummyImgSrc 150 50}}">
 *
 * <img src="{{dummyImgSrc 150 50 text="foo"}}">
 *
 * <img src="{{dummyImgSrc 150 50 bg="#000"}}">
 *
 * <img src="{{dummyImgSrc 150 50 fg="pink"}}">
 */

function dummyImgSrc (width, height, options) {
  if (!R.is(Number, width) || !R.is(Number, height)) {
    throw new Error('The "dummyImgSrc" helper must be passed two numeric dimensions.');
  }

  const result = encode(create(width, height, options.hash));

  return new Handlebars.SafeString(result);
};

module.exports = dummyImgSrc;
