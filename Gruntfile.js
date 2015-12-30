'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.test.js']
      },
    },
    jscs: {
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.test.js']
      },
      options: {
        config: '.jscsrc'
      }
    },
    mochaTest: {
      src: ['test/**/*.test.js'],
      options: {
        reporter: 'spec'
      }
    },
    mocha_istanbul: { //jscs:ignore
      coverage: {
        src: ['test/**/*.test.js']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'jscs', 'mocha_istanbul:coverage']);
};
