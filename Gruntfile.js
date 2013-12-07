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
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'dot'
        },
        src: ['test/**/*.js']
      }
    },
    cucumberjs: {
      src: 'features',
      options: {
        steps: "features/step_definitions"
      }
    },
    watch: {
      scripts: {
        files: ['lib/*.js', 'test/*.js', 'features/*.feature', 'features/**/*.js'],
        tasks: ['jshint', 'mochaTest', 'cucumberjs'],
        options: {
          debounceDelay: 250,
        },
      },
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-cucumber');
  grunt.registerTask('default', ['jshint', 'mochaTest', 'cucumberjs']);
};
