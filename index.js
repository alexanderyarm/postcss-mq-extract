var postcss  = require('postcss');
var writeFile = require('write');
var path     = require('path');

module.exports = postcss.plugin('postcss-mq-extract', function(opts) {
    return function(css, result) {
        // get fileinfo
        var fileinfo = path.parse(result.opts.to);

        // define new file name
        var fileDir = (opts.dest) ? opts.dest : fileinfo.dir;
        var fileName = fileDir + '/' + fileinfo.name + opts.postfix + fileinfo.ext;

        // create new css to write on new file
        var newCss = postcss.parse('@charset "UTF-8"');

        // let's loop through all rules and extract all @media print
        css.walkAtRules(function(rule) {
            if (rule.name.match(/^media/) && rule.params.match(opts.match)) {
                // add the rule to the new css
                newCss.append(rule);
                rule.remove();
            }
        });

        // write final css with extracted to new file
        return new Promise(function (resolve, reject) {
            writeFile(fileName, newCss.toString(), function(err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    };
});