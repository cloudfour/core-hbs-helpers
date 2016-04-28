'use strict';

var dummyImgSrc = require('../').dummyImgSrc;
var tape = require('tape');
var Handlebars = require('handlebars');

Handlebars.registerHelper(dummyImgSrc.name, dummyImgSrc);

tape('dummyImgSrc', function (test) {
  var template;
  var expected;
  var actual;

  test.plan(5);

  template = Handlebars.compile('{{dummyImgSrc 48 48}}');
  expected = 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2048%2048%22%3E%3Crect%20fill%3D%22%23ddd%22%20width%3D%22100%25%22%20height%3D%22100%25%22%2F%3E%3Ctext%20fill%3D%22%235d5d5d%22%20font-family%3D%22sans-serif%22%20font-size%3D%229%22%20dy%3D%223%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3E48%20%26%23215%3B%2048%3C%2Ftext%3E%3C%2Fsvg%3E';
  actual = template();
  test.equal(actual, expected, 'Works with width and height');

  template = Handlebars.compile('{{dummyImgSrc 48 48 text="foo" bg="#333" fg="#fff" font="serif"}}');
  expected = 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2048%2048%22%3E%3Crect%20fill%3D%22%23333%22%20width%3D%22100%25%22%20height%3D%22100%25%22%2F%3E%3Ctext%20fill%3D%22%23fff%22%20font-family%3D%22serif%22%20font-size%3D%229%22%20dy%3D%223%22%20font-weight%3D%22bold%22%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%3Efoo%3C%2Ftext%3E%3C%2Fsvg%3E';
  actual = template();
  test.equal(actual, expected, 'Works with options');

  template = Handlebars.compile('{{dummyImgSrc}}');
  test.throws(
    template,
    /two numeric dimensions\.$/,
    'Errors when passed no dimensions'
  );

  template = Handlebars.compile('{{dummyImgSrc 48}}');
  test.throws(
    template,
    /two numeric dimensions\.$/,
    'Errors when passed only one dimension'
  );

  template = Handlebars.compile('{{dummyImgSrc "foo" "bar"}}');
  test.throws(
    template,
    /two numeric dimensions\.$/,
    'Errors when passed non-numeric dimensions'
  );
});
