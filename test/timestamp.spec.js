'use strict';

const process = require('node:process');

const Handlebars = require('handlebars');
const moment = require('moment');
const tape = require('tape');

const timestamp = require('../').timestamp;

Handlebars.registerHelper(timestamp.name, timestamp);

tape('timestamp', (test) => {
  let template;
  let actual;
  let expected;
  const today = new Date();
  const realTz = process.env.TZ;

  test.plan(9);

  test.teardown(() => {
    setTimezone(realTz);
  });

  template = Handlebars.compile('{{timestamp}}');
  test.ok(moment(template()).isValid(), 'Works');

  template = Handlebars.compile('{{timestamp format="YYYY"}}');
  expected = today.getFullYear().toString();
  actual = template();
  test.equal(actual, expected, 'Works with a specified format');

  template = Handlebars.compile('{{timestamp date format="MMM Do YY"}}');
  expected = 'Aug 9th 95';
  actual = template({ date: new Date('Aug 9, 1995') });
  test.equal(actual, expected, 'Works with Date input');

  template = Handlebars.compile('{{timestamp date format="MMM Do, YYYY"}}');
  expected = 'Oct 21st, 2015';
  actual = template({ date: '2015-10-21' });
  test.equal(actual, expected, 'Works with string input');

  template = Handlebars.compile('{{timestamp date inputFormat="MMM DD YY" format="YYYY-MM-DD"}}');
  expected = '2015-10-21';
  actual = template({ date: 'Oct 21 15' });
  test.equal(actual, expected, 'Works with custom input format');

  // CI runners are UTC, so `utc=false` has to be exercised under an explicitly
  // non-UTC zone or it proves nothing. Both zones below are chosen for having
  // no daylight saving, which keeps the expected offsets fixed year-round.
  // Expected values are hard-coded rather than recomputed, so that a shared
  // misunderstanding of moment's `ZZ` format can't pass silently.
  template = Handlebars.compile('{{timestamp format="ZZ" utc=false}}');

  setTimezone('America/Phoenix');
  actual = template();
  test.equal(actual, '-0700', 'Maintains a whole-hour timezone offset in non-UTC mode');

  setTimezone('Asia/Kolkata');
  actual = template();
  test.equal(actual, '+0530', 'Maintains a half-hour timezone offset in non-UTC mode');

  template = Handlebars.compile('{{timestamp format="ZZ"}}');
  actual = template();
  test.equal(actual, '+0000', 'Ignores the local timezone in the default UTC mode');

  setTimezone(realTz);

  template = Handlebars.compile('{{timestamp date}}');
  test.throws(
    () => {
      template({ date: 'abc123' });
    },
    /valid Date-like value\.$/v,
    'Errors when passed an invalid date value'
  );
});

// Node re-reads `process.env.TZ` when the next Date is constructed, so the zone
// can be swapped mid-run without spawning a child process.
function setTimezone (tz) {
  if (tz === undefined) {
    delete process.env.TZ;
  } else {
    process.env.TZ = tz;
  }
}

