'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const replaceAll = require('../').replaceAll;

Handlebars.registerHelper(replaceAll.name, replaceAll);

tape('replaceAll', (test) => {
  let actual;
  let expected;

  test.plan(5);

  expected = '9';
  actual = Handlebars.compile('{{replaceAll "9:00" ":00" ""}}');
  test.equal(actual(), expected, 'Replaces a single instance of a string with an empty string');

  expected = 'xcllnt';
  actual = Handlebars.compile('{{replaceAll "excellent" "e" ""}}');
  test.equal(actual(), expected, 'Replaces multiple instances of a character with an empty string');

  expected = 'She sells sea barbells by the seabarbore';
  actual = Handlebars.compile('{{replaceAll "She sells sea shells by the seashore" "sh" "barb"}}');
  test.equal(actual(), expected, 'Replaces multiple instances of a string with another string');

  expected = '1000000000 bucks';
  actual = Handlebars.compile('{{replaceAll "30 bucks" 30 1000000000}}');
  test.equal(actual(), expected, 'Replaces a number in a string');

  expected = '1111111111';
  actual = Handlebars.compile('{{replaceAll 1000000000 0 1}}');
  test.equal(actual(), expected, 'Converts a number to a string and then replaces all instances of a specific digit');  
});
