'use strict';

var slug = require('../').slug;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(slug.name, slug);

tape('slug', function (test) {
  var template = Handlebars.compile('{{slug title}}');
  var expected = 'some-title';
  var actual = template({
    title: 'Some Title'
  });
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
