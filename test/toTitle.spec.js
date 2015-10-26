'use strict';

var toTitle = require('../').toTitle;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(toTitle.name, toTitle);

tape('toTitle', function (test) {
  var template = Handlebars.compile('{{toTitle title}}');
  var expected = 'title';
  var actual = template({
    title: '01 title'
  });
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
