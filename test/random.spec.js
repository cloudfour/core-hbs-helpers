'use strict';

const Chance = require('chance');
const Handlebars = require('handlebars');
const R = require('ramda');
const tape = require('tape');

const random = require('../').random;

const chance = new Chance();

Handlebars.registerHelper('random', random);

tape('random', (test) => {
  let template;
  let result;
  let parsed;

  test.plan(6);

  template = Handlebars.compile('{{random}}');
  result = template();
  parsed = Number(result);
  test.ok(Number.isSafeInteger(parsed), 'Works');

  template = Handlebars.compile('{{random min=5 max=10}}');
  result = template();
  parsed = Number(result);
  test.ok(parsed >= 5 && parsed <= 10, 'Works with hash');

  template = Handlebars.compile('{{random "state"}}');
  result = template();
  test.ok(R.find(R.propEq(result, 'abbreviation'))(chance.states()), 'Works with method');

  template = Handlebars.compile('{{random "dollar" max=20}}');
  result = template();
  parsed = Number(result.slice(1));
  test.ok(result[0] === '$' && parsed <= 20, 'Works with method and hash');

  template = Handlebars.compile('{{random 42}}');
  test.throws(
    () => {
      template();
    },
    /first argument must be a String\.$/v,
    'Errors when method is not a String'
  );

  template = Handlebars.compile('{{random "whatever"}}');
  test.throws(
    () => {
      template();
    },
    /does not support the "whatever" method\.$/v,
    'Errors when method does not exist'
  );

});
