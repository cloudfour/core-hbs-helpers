'use strict';

var displayName = require('../').displayName;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(displayName.name, displayName);

tape('displayName', function (test) {
  var template = Handlebars.compile('{{displayName title}}');
  var expected = 'title';
  var actual = template({
    title: '01 title'
  });
  test.plan(1);
  test.equal(actual, expected, 'Works');
});
