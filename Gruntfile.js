module.exports = function(grunt) {

  grunt.initConfig({
  
    watch: {
      sass: {
        files: 'dev/scss/**/*.scss', 
        tasks: ['sass', 'cssmin']
      },
      js_concat: {
        files: 'dev/scripts/**/*.js',
        tasks: ['concat']
      },
      js_uglify: {
        files: 'dist/scripts/built.js',
        tasks: ['uglify']
      }
    },

    sass: {
      dev: {
        files: {
          'dist/css/main.css' : 'dev/scss/main.scss'
        }
      }
    },

    cssmin: {
      build: {
        src: 'dist/css/main.css',
        dest: 'dist/css/main.min.css'
      }    
    },

    concat: {
      options: {
        separator: '\n\n\n'
      },
      dist: {
        src: ['dev/scripts/*.js'],
        dest: 'dist/scripts/built.js'
      }
    },

    uglify: {
      build: {
        files: {
          'dist/scripts/built.min.js': ['dist/scripts/built.js']
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