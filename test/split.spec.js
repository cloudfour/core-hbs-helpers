'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const split = require('../').split;

Handlebars.registerHelper(split.name, split);

tape('split', (test) => {
  let actual;
  let expected;

  test.plan(5);

  expected = "<li>h</li><li>e</li><li>l</li><li>l</li><li>o</li>";
  actual = Handlebars.compile('{{#each (split "hello" "")}}<li>{{this}}</li>{{/each}}');
  test.equal(actual(), expected, 'Splits a string into its composite characters');

  expected = "<li>hello</li><li>world</li>";
  actual = Handlebars.compile('{{#each (split "hello world" " ")}}<li>{{this}}</li>{{/each}}');
  test.equal(actual(), expected, 'Splits a string by spaces');

  expected = "<li>lions</li><li>tigers</li><li>and bears</li>";
  actual = Handlebars.compile('{{#each (split "lions, tigers, and bears" ", ")}}<li>{{this}}</li>{{/each}}');
  test.equal(actual(), expected, 'Splits a string by ", "');

  expected = "<li></li><li>0</li><li>0</li>";
  actual = Handlebars.compile('{{#each (split 2020 2)}}<li>{{this}}</li>{{/each}}');
  test.equal(actual(), expected, 'Converts a number to a string and splits it by another number');

  expected = "<li>1</li><li>35</li>";
  actual = Handlebars.compile('{{#each (split 1.35 ".")}}<li>{{this}}</li>{{/each}}');
  test.equal(actual(), expected, 'Converts a decimal to a string and splits it by a period');
});
