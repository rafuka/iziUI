module.exports = function(grunt) {

  grunt.initConfig({
  
    watch: {
      sass: {
        files: '**/*.scss', 
        tasks: ['sass', 'cssmin']
      },
      js: {
        files: 'scripts/**/*.js',
        tasks: ['concat', 'uglify']
      }
    },

    sass: {
      dev: {
        files: {
          'css/main.css' : 'scss/main.scss'
        }
      }
    },

    cssmin: {
      build: {
        src: 'css/main.css',
        dest: 'css/main.min.css'
      }    
    },

    concat: {
      options: {
        separator: '\n/*next file*/\n\n'
      },
      dist: {
        src: ['scripts/*.js'],
        dest: 'scripts/built.js'
      }
    },

    uglify: {
      build: {
        files: {
          'scripts/built.min.js': ['scripts/built.js']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'uglify']);

};