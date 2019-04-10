# Core Handlebars Helpers

[![NPM version](https://img.shields.io/npm/v/@cloudfour/hbs-helpers.svg)](https://www.npmjs.com/package/@cloudfour/hbs-helpers) [![Latest Documentation](https://doxdox.org/images/badge-flat.svg)](https://doxdox.org/cloudfour/core-hbs-helpers/)

## Usage

```
npm install --save-dev @cloudfour/hbs-helpers
```

### Using vanilla Handlebars
```js
var helpers = require('@cloudfour/hbs-helpers');
var Handlebars = require('handlebars');

Object.keys(helpers).forEach(function (key) {
  Handlebars.registerHelper(key, helpers[key]);
});
```

### Using `gulp-compile-handlebars`
```js
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var helpers = require('@cloudfour/hbs-helpers');

gulp.task('default', function () {
  return gulp.src('*.hbs')
    .pipe(handlebars({
      helpers: helpers
    }))
    .pipe(gulp.dest('./dist'));
});
```

## Documenation

See our [doxdox site](https://doxdox.org/cloudfour/core-hbs-helpers/) for complete documentation of each helper.
