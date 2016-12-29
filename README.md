# postcss-mq-extract
PostCSS plugin which extracts matched media queries to the separate file

## What is it for?
This plugin looks through your css file, cut specific media queries and put them to the separate file with defined postfix.

### Example
**Before**

*source.css*
```css
@media (min-width: 768px) {
    .ngdialog-open {
        position:static
    }
}

.overlay--legacy__caption {
    font-weight: 700;
}

@media (min-width: 768px) {
    .overlay--ngdialog .ngdialog-content {
        width: 670px;
    }
}

.overlay--ngdialog .ngdialog-content {
    display: none;
}
```

**After**

*source.css*
```css
.overlay--legacy__caption {
    font-weight: 700;
}

.overlay--ngdialog .ngdialog-content {
    display: none;
}
```

*source-tablet.css*
```css
@media (min-width: 768px) {
    .ngdialog-open {
        position:static
    }
}

@media (min-width: 768px) {
    .overlay--ngdialog .ngdialog-content {
        width: 670px;
    }
}
```

## Usage
```javascript
npm install postcss-mq-extract --save-dev
```
### Gulp
```javascript
var postcss = require('gulp-postcss');
var mqExtract = require('postcss-mq-extract');

gulp.task('default', function () {
    var processors = [
        mqExtract({
            dest: 'css/generated',
            match: '(min-width: 768px)', 
            postfix: '-tablet',
        })
    ];
    return gulp.src('./css/source/test.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css/generated'));
});
```

### Grunt
```javascript
var mqExtract = require('postcss-mq-extract');

gruntConfig.postcss = {
  options: {
    processors: [
        mqExtract({
            dest: 'css/generated', 
            match: '(min-width: 768px)', 
            postfix: '-tablet' 
        })
    ],
  },
  ...
};

```

## Options
#### match
*String*

Regular expression to match media query rule
```javascript
{
  match: '(min-width: 768px)'
}
```
#### postfix
*String*

Postfix which will be added to current filename. New file will be created with this name.
```javascript
{
  postfix: '-tablet'
}
```

#### dest
*String*

Path to directory where new file should be created. By default new file is created in the same directory as original file.
```javascript
{
  dest: 'css/generated'
}
```




