module.exports = function(grunt) {

    grunt.initConfig({
    jshint: {
      src: ['Gruntfile.js', 'lib/*.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        node: true,
        curly: false,
        evil:true,
        expr:true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          require: true,
          define: true,
          requirejs: true,
          describe: true,
          expect: true,
          it: true,
          before: false,
          beforeEach: false,
          after: false,
          afterEach: false
        }
      }
    }
  });

  // Load JSHint task
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', 'jshint');
    
};
