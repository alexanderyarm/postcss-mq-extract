// Generated on 2015-06-17 using generator-jhipster 2.16.0
'use strict';
var gruntConfig = {};
var mqExtract = require('./index');

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
  dist: {
    src: [
      'css/source/test.css'
    ]
  }
};

module.exports = function (grunt) {
    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-postcss');
    grunt.registerTask('default', [
        'postcss'
    ]);
};
