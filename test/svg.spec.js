'use strict';

const Handlebars = require('handlebars');
const tape = require('tape');

const svg = require('../').svg;

const relativeSvg = svg.create({ basePath: './test/fixtures/svg' });

Handlebars.registerHelper('svg', svg);
Handlebars.registerHelper('relativeSvg', relativeSvg);

tape('svg', (test) => {
  let template;
  let actual;
  let expected = '<svg viewBox="0 0 1 1"><g/></svg>';

  test.plan(8);

  template = Handlebars.compile('{{svg "test/fixtures/svg/test.svg"}}');
  actual = template();
  test.equal(actual, expected, 'Works');

  template = Handlebars.compile('{{svg "test/fixtures/svg/test"}}');
  actual = template();
  test.equal(actual, expected, 'Works with extension omitted');

  template = Handlebars.compile('{{relativeSvg "test.svg"}}');
  actual = template();
  test.equal(actual, expected, 'Works with custom base path');

  template = Handlebars.compile('{{svg "test/fixtures/svg/test" class="icon" width="10" height="10"}}');
  actual = template();
  expected = '<svg viewBox="0 0 1 1" height="10" width="10" class="icon"><g/></svg>';
  test.equal(actual, expected, 'Works with attributes in hash');

  template = Handlebars.compile('{{#svg "test/fixtures/svg/test"}}<title>foo</title>{{/svg}}');
  actual = template();
  expected = '<svg viewBox="0 0 1 1"><title>foo</title><g/></svg>';
  test.equal(actual, expected, 'Works with content');

  template = Handlebars.compile('{{svg}}');
  test.throws(
    () => {
      template();
    },
    /requires a file path\.$/v,
    'Errors when file path is omitted'
  );

  template = Handlebars.compile('{{svg "blah.svg"}}');
  test.throws(
    () => {
      template();
    },
    /no such file or directory/v,
    'Errors when file does not exist'
  );

  template = Handlebars.compile('{{svg "test/fixtures/svg/test.html"}}');
  test.throws(
    () => {
      template();
    },
    /only supports SVG files\.$/v,
    'Errors when path is not an SVG'
  );
});
