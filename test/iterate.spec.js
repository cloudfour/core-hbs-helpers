'use strict';

var iterate = require('../').iterate;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(iterate.name, iterate);

tape('iterate', function (test) {
  var template = Handlebars.compile(
    '{{#iterate 3}}<{{@index}},{{@count}}>{{/iterate}}'
  );
  var actual = template();
  var expected = '<0,1><1,2><2,3>';

  test.plan(1);
  test.equal(actual, expected, 'works');
});
