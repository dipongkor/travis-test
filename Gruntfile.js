//
// http://24ways.org/2013/grunt-is-not-weird-and-hard/
//
var process = require('process');


module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    version: {
      dest: 'version.js'
    },
    browserify: {
      dist: {
        files: {
          "browser.js": "index.js"
        },
        options: {
          exclude: [],
          browserifyOptions: {
            "standalone": "travistest",
            "insert-globals": true
          }
        }
      }
    }
  });


  /**
   * Simple task to read the version out of the node process and write to a file
   */
  grunt.task.registerMultiTask('version', 'Write version.', function() {
    var versionData = {
      "version": process.version,
      "versions": process.versions
    };
    grunt.file.write(this.data, "module.exports = " + JSON.stringify(versionData) + ";");
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.registerTask("default", ["version", "browserify"]);
};
