# Core Handlebars Helpers

[![NPM version](https://img.shields.io/npm/v/@cloudfour/hbs-helpers.svg)](https://www.npmjs.com/package/@cloudfour/hbs-helpers) [![CI](https://github.com/cloudfour/core-hbs-helpers/actions/workflows/ci.yml/badge.svg)](https://github.com/cloudfour/core-hbs-helpers/actions/workflows/ci.yml) [![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)

Handlebars helpers used for various Cloud Four projects. Every helper is
documented below, with a runnable example.

## Usage

```sh
npm install --save-dev @cloudfour/hbs-helpers
```

### Using vanilla Handlebars

```js
const helpers = require('@cloudfour/hbs-helpers');
const Handlebars = require('handlebars');

for (const [name, helper] of Object.entries(helpers)) {
  Handlebars.registerHelper(name, helper);
}
```

### Using `gulp-compile-handlebars`

```js
const gulp = require('gulp');
const handlebars = require('gulp-compile-handlebars');
const helpers = require('@cloudfour/hbs-helpers');

gulp.task('default', () =>
  gulp
    .src('*.hbs')
    .pipe(handlebars({ helpers }))
    .pipe(gulp.dest('./dist'))
);
```

Examples below use `//=>` to show what a helper renders.

## Helpers

- [`all`](#all) — Output a block (or its inverse) based on whether or not all of the supplied arguments are truthy
- [`and`](#and) — Output a block (or its inverse) based on whether or not both of the supplied arguments are truthy
- [`any`](#any) — Output a block (or its inverse) based on whether or not any of the supplied arguments are truthy
- [`around`](#around) — Slices a list based on a center-point and a maximum amount of "padding" before and after
- [`average`](#average) — Average an array of numeric values
- [`capitalize`](#capitalize) — Capitalize the first letter of a String
- [`capitalizeWords`](#capitalizewords) — Capitalize each word in a String
- [`compare`](#compare) — Compare two values using logical operators
- [`concat`](#concat) — Concatenate items into a single string
- [`defaultTo`](#defaultto) — Output the first provided value that exists, or fallback to a default if none do
- [`dummyImgSrc`](#dummyimgsrc) — Returns an escaped data URI for a placeholder image that can be used as the src attribute of an img element
- [`iterate`](#iterate) — Repeat a block a given amount of times
- [`math`](#math) — Perform mathematical operations on one or two values
- [`maybe`](#maybe) — Output a block randomly (50% chance of being output)
- [`or`](#or) — Output a block (or its inverse) based on whether or not either of the supplied arguments are truthy
- [`random`](#random) — Generate a random integer or any other type of random content supported by [Chance.js](https://chancejs.com)
- [`randomItem`](#randomitem) — Return only one random item
- [`replaceAll`](#replaceall) — Replace all occurrences of a string in another string
- [`split`](#split) — Splits a string or number by a separator string or number
- [`svg`](#svg) — Returns the contents of the SVG at the specified path, with any attributes passed along via the hash included on the root element
- [`timestamp`](#timestamp) — Format a date or time using [Moment.js](https://momentjs.com/)
- [`toFixed`](#tofixed) — Format number to two fixed decimal points (like a price)
- [`toFraction`](#tofraction) — Format a decimal as a fractional HTML entity if possible
- [`toJSON`](#tojson) — Converts a string to JSON; useful when used in helper sub-expressions
- [`toSlug`](#toslug) — Format a string as a lowercase, URL-friendly value
- [`toTitle`](#totitle) — Strip leading alphanumeric characters plus spaces from a string

### `all`

Output a block (or its inverse) based on whether or not all of the supplied
arguments are truthy.

```hbs
var a = true;
var b = 1;
var c = false;

{{#all a b}}✔︎{{else}}✘{{/all}} //=> ✔︎
{{#all b c}}✔︎{{else}}✘{{/all}} //=> ✘

{{#if (all a b)}}
  Also works inline!
{{/if}}
```

- **Parameters:** `values` `...*` — One or more values to test against.
- **Returns:** `string | boolean`
- **Since:** v0.11.0

### `and`

> **Deprecated.** Use the more flexible `all` helper instead.

Output a block (or its inverse) based on whether or not both of the supplied
arguments are truthy.

```hbs
var a = true;
var b = 1;
var c = false;

{{#and a b}}✔︎{{else}}✘{{/and}} //=> ✔︎
{{#and b c}}✔︎{{else}}✘{{/and}} //=> ✘
```

- **Parameters:** `left` `any` · `right` `any`
- **Returns:** `string`
- **Throws:** `Error` — An error is thrown unless exactly two values are supplied.
- **Since:** v0.0.1

### `any`

Output a block (or its inverse) based on whether or not any of the supplied
arguments are truthy.

```hbs
var a = true;
var b = 0;
var c = false;

{{#any a b}}✔︎{{else}}✘{{/all}} //=> ✔︎
{{#any b c}}✔︎{{else}}✘{{/all}} //=> ✘

{{#if (any a b)}}
  Also works inline!
{{/if}}
```

- **Parameters:** `values` `...*` — One or more values to test against.
- **Returns:** `string | boolean`
- **Since:** v0.11.0

### `around`

Slices a list based on a center-point and a maximum amount of "padding"
before and after. Useful for pagination.

Supports an optional `offset` hash option in case your center
value isn't matching up with your array indexes.

```hbs
<ul>
  {{#around pages 5 2 offset=-1}}
    <li><a href="/page/{{num}}">Page {{num}}</a></li>
  {{/around}}
</ul>

{{! Output: }}
<ul>
  <li><a href="/page/3">Page 3</a></li>
  <li><a href="/page/4">Page 4</a></li>
  <li><a href="/page/5">Page 5</a></li>
  <li><a href="/page/6">Page 6</a></li>
  <li><a href="/page/7">Page 7</a></li>
</ul>
```

- **Parameters:** `items` `Array` — Collection to iterate over. · `center` `number` — The center-point of the collection (for example, current page). · `padding` `number` — The amount of items to allow before or after the center.
- **Returns:** `string`
- **Since:** v0.0.1

### `average`

Average an array of numeric values.

```hbs
var numbers = [1, 2, 3];
var products = [{rating: 1}, {rating: 2}, {rating: 3}];

{{average ratings}} //=> 2
{{average products key="rating"}} //=> 2
```

- **Parameters:** `arr` `Array`
- **Returns:** `number` — Returns the average of all values.
- **Since:** v0.0.1

### `capitalize`

Capitalize the first letter of a String.

```hbs
{{capitalize "hello world"}} //=> "Hello world"
```

- **Parameters:** `str` `string | *` — String to capitalize. Other types will be converted.
- **Returns:** `string`
- **Throws:** `TypeError` — An error is thrown when no value is supplied.
- **Since:** v0.4.0

### `capitalizeWords`

Capitalize each word in a String. Works with punctuation and international
characters.

```hbs
{{capitalizeWords "hello world"}} //=> "Hello World"
{{capitalizeWords "hello-cañapolísas"}} //=> "Hello-Cañapolísas"
{{capitalizeWords "it's a nice day"}} //=> "It's A Nice Day"
```

- **Parameters:** `str` `string | *` — String to capitalize. Other types will be converted.
- **Returns:** `string`
- **Throws:** `TypeError` — An error is thrown when no value is supplied.
- **Since:** v0.4.0

### `compare`

Compare two values using logical operators.

The operators are named after JavaScript's, but the equality ones do not
behave like JavaScript's, so read this before reaching for `==`.

`==` and `!=` are **deep structural** equality. No coercion happens, so
`1 == "1"` is false where JavaScript would say true; and objects are compared
by contents, so two separate arrays holding the same values are equal where
JavaScript would say false. This matters most for values arriving from JSON,
front matter, or query strings, where a number may well be a string.

`===` and `!==` compare identity, matching JavaScript's `===` except that
`NaN` equals itself.

The relational operators (`<`, `>`, `<=`, `>=`) behave as expected, and
`typeof` compares against a type name such as `"Array"` or `"Number"`.

```hbs
{{#compare 1 "<" 2}}
  This is true.
{{else}}
  This is false.
{{/compare}}

{{#if (compare 1 "<" 2)}}
  Also works inline!
{{/if}}

{{#compare items "typeof" "Array"}}
  The "typeof" operator compares against a type name.
{{/compare}}

{{#compare 1 "==" "1"}}
  Not rendered: "==" does not coerce, unlike JavaScript's.
{{/compare}}

{{#compare listA "==" listB}}
  Rendered when both lists hold equal values, even as separate arrays.
{{/compare}}
```

- **Parameters:** `left` `any` · `operator` `string` · `right` `any`
- **Returns:** `(string | boolean)` — formatted html if block, true/false if inline
- **Adapted from:** github.com/assemble

### `concat`

Concatenate items into a single string.

```hbs
{{concat "foo" "bar"}} //=> "foobar"
```

- **Parameters:** `items` `...*`
- **Returns:** `string`
- **Since:** v0.8.0

### `defaultTo`

Output the first provided value that exists, or fallback to a default if
none do.

```hbs
var doesExist = 'Hello';

{{defaultTo doesExist "Goodbye"}} // => "Hello"
{{defaultTo doesNotExist "Goodbye"}} // => "Goodbye"
{{defaultTo doesNotExist}} // => ""
{{defaultTo doesNotExist doesExist "Goodbye"}} // => "Hello"
```

- **Parameters:** `value` `...*`
- **Returns:** `string`
- **Since:** v0.0.1

### `dummyImgSrc`

Returns an escaped data URI for a placeholder image that can be used as the
src attribute of an img element.

```hbs
<img src="{{dummyImgSrc 150 50}}">

<img src="{{dummyImgSrc 150 50 text="foo"}}">

<img src="{{dummyImgSrc 150 50 bg="#000"}}">

<img src="{{dummyImgSrc 150 50 fg="pink"}}">
```

- **Parameters:** `width` `number` · `height` `number`
- **Returns:** `string`
- **Since:** v0.3.0

### `iterate`

Repeat a block a given amount of times.

```hbs
{{#iterate 10}}
  <li>Index: {{@index}} Count: {{@count}}</li>
{{/iterate}}
```

- **Since:** v0.0.2
- **Adapted from:** https://github.com/fbrctr/fabricator-assemble

### `math`

Perform mathematical operations on one or two values.

```hbs
{{math 1 "+" 2}} //=> 3
{{math 2 "-" 1}} //=> 1
{{math 2 "*" 3}} //=> 6
{{math 9 "/" 3}} //=> 3
{{math 17 "%" 3}} //=> 2
{{math 2 "**" 3}} //=> 8
{{math 1 "++"}} //=> 2
{{math 2 "--"}} //=> 1
```

- **Parameters:** `left` `any` · `operator` `string` · `right` `any`
- **Returns:** `number`

### `maybe`

Output a block randomly (50% chance of being output). Useful for prototyping
multiple content scenarios, outputting one or two "dummy" blocks of markup.

```hbs
{{#maybe}}
  Heads!
{{else}}
  Tails!
{{/maybe}}
```

- **Since:** v0.0.1

### `or`

> **Deprecated.** Use the more flexible `any` helper instead.

Output a block (or its inverse) based on whether or not either of the supplied
arguments are truthy.

```hbs
var a = true;
var b = 1;
var c = false;
var d = 0;

{{#or a c}}✔︎{{else}}✘{{/or}} //=> ✔︎
{{#or b c}}✔︎{{else}}✘{{/or}} //=> ✔︎
{{#or c d}}✔︎{{else}}✘{{/or}} //=> ✘
```

- **Parameters:** `left` `any` · `right` `any`
- **Returns:** `string`
- **Throws:** `Error` — An error is thrown unless exactly two values are supplied.
- **Since:** v0.0.1

### `random`

Generate a random integer or any other type of random content supported by
[Chance.js](https://chancejs.com).

```hbs
{{random}} //=> 1839473434
{{random min=5 max=10}} //=> 7
{{random "state"}} //=> WA
{{random "dollar" max=20}} //=> $17.42
```

- **Parameters:** `method=integer` `string` — Chance method to use. · `options.hash` `object` — Additional options to pass to method.
- **Returns:** `any`
- **Since:** v0.4.0

### `randomItem`

Return only one random item. If only one argument is provided and it is an
array, it will return a random item from that array. Otherwise it will return
one of the arguments.

```hbs
var beatles = ["John", "Paul", "George", "Ringo"];
{{randomItem beatles}} //=> "George"

{{randomItem "John" "Paul" "George" "Ringo"}} //=> "Ringo"
```

- **Parameters:** `items` `...*`
- **Returns:** `any` — One random item.
- **Since:** v0.0.1

### `replaceAll`

Replace all occurrences of a string in another string.
Can also be used on numbers, though they'll be treated as strings.
Case sensitive.

```hbs
{{replaceAll "9:00" ":00" ""}} //=> "9"
{{replaceAll "excellent" "e" ""}} //=> xcllnt
{{replaceAll "She sells sea shells by the seashore" "sh" "barb"}} //=> "She sells sea barbells by the seabarbore"
{{replaceAll "30 bucks" 30, 1000000000}} //=> "1000000000 bucks"
```

- **Parameters:** `input` `number | string` · `find` `number | string` · `replace` `number | string`
- **Returns:** `string`
- **Since:** v0.6.1

### `split`

Splits a string or number by a separator string or number.
Returns an array that can be iterated over.

```hbs
{{split "hello" ""}} //=> ["h", "e", "l", "l", "o"]
{{split "hello world" " "}} //=> ["hello", "world"]
{{split "lions, tigers, and bears" ", "}} //=> ["lions", "tigers", "and bears"]
{{split 2020 2}} //=> ["", "0", "0"]
{{split 1.35 "."}} //=> ["1", "35"]
```

- **Parameters:** `input` `number | string` · `separator` `number | string`
- **Returns:** `Array`
- **Since:** v0.10.0

### `svg`

Returns the contents of the SVG at the specified path, with any attributes
passed along via the hash included on the root element.

Inspired by https://github.com/aredridel/npm-handlebars-helper-svg

```hbs
  {{svg "foo/test.svg"}}

  {{svg "foo/test"}}

  {{svg "foo/test" class="foo" width="24" height="24"}}

  {{#svg "foo/test" aria-labelledby="foo-title"}}
    <title id="foo-title">Hello world</title>
  {{/svg}}
```

- **Parameters:** `name` `string` — The path to the SVG. The extension may be omitted.
- **Returns:** `string`
- **Since:** v0.6.0

### `timestamp`

Format a date or time using [Moment.js](https://momentjs.com/).

Defaults to UTC mode since most use-cases in markup-land do not take
timezones into account, which results in some counter-intuitive output and
inconsistent behavior.

```hbs
{{timestamp "2015-10-21" format="MMM Do, YYYY"}} //=> "Oct 21st, 2015"

{{timestamp "Oct 21 15" inputFormat="MMM DD YY" format="YYYY-MM-DD"}} //=> "2015-10-21"

{{timestamp "2000-01-01" format="YYYY" utc=false}} //=> "1999"
```

- **Parameters:** `context` `Date | string | number | Array | object`
- **Returns:** `string`
- **Since:** v0.0.1

### `toFixed`

Format number to two fixed decimal points (like a price).

```hbs
{{toFixed 1}} //=> 1.00
```

- **Parameters:** `num` `number | string`
- **Returns:** `string`
- **Since:** v0.0.1

### `toFraction`

Format a decimal as a fractional HTML entity if possible.

```hbs
{{toFraction 1.25}} //=> "1¼"
{{toFraction 3.1666}} //=> "3⅙"
{{toFraction 2.7}} //=> 2.7
```

- **Parameters:** `value` `number`
- **Returns:** `string | number`
- **Since:** v0.0.1

### `toJSON`

Converts a string to JSON; useful when used in helper sub-expressions.

```hbs
{{#each (toJSON '[1,2,3]')}}{{this}}{{/each}} //=> '123'
```

- **Parameters:** `str` `string`
- **Returns:** `Array | object`
- **Since:** v0.0.1

### `toSlug`

Format a string as a lowercase, URL-friendly value.

```hbs
{{toSlug "Well, hello there!"}} //=> "well-hello-there"
```

- **Parameters:** `str` `string`
- **Returns:** `string`
- **Since:** v0.0.1

### `toTitle`

Strip leading alphanumeric characters plus spaces from a string. Useful for
converting filenames to more usable strings or IDs.

```hbs
{{toTitle "01 Introduction"}} //=> "Introduction"
```

- **Parameters:** `name` `string`
- **Returns:** `string`
- **Since:** v0.0.1

