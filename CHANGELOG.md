# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Note that while the version stays below `1.0.0`, the **minor** number carries
breaking changes — `^0.11.0` will not pick up `0.12.0`.

Everything below `Unreleased` was reconstructed after the fact from git history,
release tags, and the `@since` annotations in `lib/`. Those entries record which
helpers arrived in which release rather than every change each one contained, and
releases before `0.6.1` predate this package's move to the `@cloudfour` scope, so
they are not on npm under its current name. `0.9.0` and `0.10.0` were published
but never tagged, so their links point at the version-bump commits instead.

## [Unreleased]

### Fixed

- **Breaking.** `compare`'s `typeof` operator ignored its right operand
  entirely. `R.type` takes one argument, so the `R.type(R.__)` it was built from
  was not a partial application waiting on a second value — it was a function
  that returned the type name of the left operand and discarded the right one.
  Because any non-empty type name is truthy, the block always rendered:

  ```hbs
  {{#compare items "typeof" "Number"}}✔︎{{else}}✘{{/compare}}
  ```

  With `items` an Array, that produced `✔︎`. It now produces `✘`. Templates
  whose type checks were wrong rendered anyway and will now take the `{{else}}`
  branch. Used inline, `{{compare items "typeof" "Array"}}` returned the string
  `"Array"` and now returns a boolean, so it can no longer be used to print the
  type of a value.

### Changed

- Test coverage for `and`, `or`, `compare`, and `maybe` now exercises the
  inverse (`{{else}}`) branch of each helper, which nothing had asserted before.
  `maybe` forces both outcomes through a stubbed `Math.random` rather than
  accepting either, and `timestamp` checks its non-UTC offset against fixed
  values under an explicitly non-UTC timezone, which CI never exercised.

## [0.11.0] - 2019-07-30

### Added

- `all` and `any` helpers, which accept any number of values and work both as
  block helpers and inline.

### Deprecated

- `and` and `or`, in favor of `all` and `any`.

## [0.10.0] - 2019-03-29

### Added

- `split` helper, returning an array that can be iterated over.
- `replaceAll` helper.

## [0.9.0] - 2017-01-11

### Changed

- `compare` works as an inline helper, returning `true`/`false` when used as a
  subexpression instead of only rendering a block.

## [0.8.0] - 2016-08-23

### Added

- `concat` helper.

## [0.7.0] - 2016-06-29

### Added

- Block form of the `svg` helper, so content can be prepended inside the SVG
  root element.

## [0.6.1] - 2016-06-08

### Changed

- Published as `@cloudfour/hbs-helpers`. This is the earliest release available
  on npm under that name.

## [0.6.0] - 2016-05-25

### Added

- `svg` helper, inlining an SVG file's contents with attributes from the hash.

## [0.5.0] - 2016-05-16

### Added

- `math` helper, including the exponentiation operator `**`.

## [0.4.0] - 2016-05-06

### Added

- `capitalize` and `capitalizeWords` helpers.
- `random` helper, backed by [Chance.js](https://chancejs.com).

### Changed

- The previous `random` helper was renamed to `randomItem` to make room for the
  Chance-backed one.

## [0.3.1] - 2016-04-29

### Changed

- Documentation for `dummyImgSrc`.

## [0.3.0] - 2016-04-28

### Added

- `dummyImgSrc` helper, returning a data URI for a placeholder image.

## [0.2.0] - 2016-04-25

### Changed

- `defaultTo` accepts any number of values rather than exactly two.

## [0.1.1] - 2016-04-21

### Added

- `iterate` helper.

## [0.1] - 2015-11-16

Initial release.

### Added

- `and`, `around`, `average`, `compare`, `defaultTo`, `maybe`, `or`,
  `randomItem`, `timestamp`, `toFixed`, `toFraction`, `toJSON`, `toSlug`, and
  `toTitle` helpers.

[unreleased]: https://github.com/cloudfour/core-hbs-helpers/compare/0.11.0...HEAD
[0.11.0]: https://github.com/cloudfour/core-hbs-helpers/compare/5d1f7e7...0.11.0
[0.10.0]: https://github.com/cloudfour/core-hbs-helpers/compare/690688a...5d1f7e7
[0.9.0]: https://github.com/cloudfour/core-hbs-helpers/compare/0.8.0...690688a
[0.8.0]: https://github.com/cloudfour/core-hbs-helpers/compare/0.7.0...0.8.0
[0.7.0]: https://github.com/cloudfour/core-hbs-helpers/compare/0.6.1...0.7.0
[0.6.1]: https://github.com/cloudfour/core-hbs-helpers/compare/v0.6.0...0.6.1
[0.6.0]: https://github.com/cloudfour/core-hbs-helpers/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/cloudfour/core-hbs-helpers/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/cloudfour/core-hbs-helpers/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/cloudfour/core-hbs-helpers/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/cloudfour/core-hbs-helpers/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/cloudfour/core-hbs-helpers/compare/v0.1.1...v0.2.0
[0.1.1]: https://github.com/cloudfour/core-hbs-helpers/compare/v0.1...v0.1.1
[0.1]: https://github.com/cloudfour/core-hbs-helpers/releases/tag/v0.1
