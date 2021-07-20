module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: [{
          // Set to true for recursive search
          expand: true,
          cwd: 'resources/scss/',
          src: ['style.scss'],
          dest: 'dist/css/',
          ext: '.css'
        }]
      }
    },
    concat: {
      options: {
        separator: ";",
        stringBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        src: ['resources/js/*.js'],
        dest: 'dist/js/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    uglify: {
      options: {
        manage: false
      },
      my_target: {
        files: [{
          'dist/js/main.min.js': ['resources/js/custom.js']
        }]
      }
    },
    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css', '!*.min.css'],
          dest: 'css/',
          ext: '.min.scss'
        }]
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass'],
        options: {
          livereload: {
            host: 'localhost',
            port: 8080,
          }
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['uglify', 'cssmin', 'sass', 'concat']);
};

