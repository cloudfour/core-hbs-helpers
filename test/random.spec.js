'use strict';

var random = require('../').random;
var tape = require('tape');
var R = require('ramda');
var Handlebars = require('handlebars');
var Chance = require('chance');
var chance = new Chance();

Handlebars.registerHelper(random.name, random);

tape('random', function (test) {
  var template;
  var result;
  var parsed;

  test.plan(6);

  template = Handlebars.compile('{{random}}');
  result = template();
  parsed = parseFloat(result);
  test.ok(R.is(Number, parsed) && parsed === parseInt(result, 10), 'Works');

  template = Handlebars.compile('{{random min=5 max=10}}');
  result = template();
  parsed = parseInt(result, 10);
  test.ok(parsed >= 5 && parsed <= 10, 'Works with hash');

  template = Handlebars.compile('{{random "state"}}');
  result = template();
  test.ok(R.find(R.propEq(result, 'abbreviation'))(chance.states()), 'Works with method');

  template = Handlebars.compile('{{random "dollar" max=20}}');
  result = template();
  parsed = parseFloat(result.substr(1));
  test.ok(result[0] === '$' && parsed <= 20, 'Works with method and hash');

  template = Handlebars.compile('{{random 42}}');
  test.throws(
    function () {
      template();
    },
    /first argument must be a String\.$/,
    'Errors when method is not a String'
  );

  template = Handlebars.compile('{{random "whatever"}}');
  test.throws(
    function () {
      template();
    },
    /does not support the "whatever" method\.$/,
    'Errors when method does not exist'
  );

});
