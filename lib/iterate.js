'use strict';

var R = require('ramda');
var Handlebars = require('handlebars');

/**
 * Repeat a block a given amount of times.
 *
 * @credit https://github.com/fbrctr/fabricator-assemble
 * @since v0.0.2
 * @example
 * {{#iterate 10}}
 *   <li>Index: {{@index}} Count: {{@count}}</li>
 * {{/iterate}}
 */

function iterate (num, block) {
  return R.times(function (i) {
    var data = block.data
      ? R.mergeRight(Handlebars.createFrame(block.data), {
          index: i,
          count: i + 1,
        })
      : null;

    return block.fn(i, {data: data});
  }, num).join('');
};

module.exports = iterate;
