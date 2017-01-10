# Core Handlebars Helpers

[![Latest Documentation](https://doxdox.org/images/badge-flat.svg)](https://doxdox.org/cloudfour/core-hbs-helpers/)

## Usage

```
npm install --save-dev cloudfour/core-hbs-helpers.git
```

### Using vanilla Handlebars
```js
var helpers = require('core-hbs-helpers');
var Handlebars = require('handlebars');

helpers.forEach(function (helper) {
  Handlebars.registerHelper(helper.name, helper);
});
```

### Using `gulp-compile-handlebars`
```js
var gulp = require('gulp');
var handlebars = require('gulp-compile-handlebars');
var helpers = require('core-hbs-helpers');

gulp.task('default', function () {
  return gulp.src('*.hbs')
    .pipe(handlebars({
      helpers: helpers
    }))
    .pipe(gulp.dest('./dist'));
});
```

