module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: '',      // Src matches are relative to this path.
            src: ['public/js/ihappy.js'], // Actual pattern(s) to match.
            dest: 'build/js/',   // Destination path prefix.
            ext: '.min.js',   // Dest filepaths will have this extension.
            flatten: true
          }
        ]
      }
    },

    less: {
      development: {
        options: {
          // compress: true,
          // cleancss: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "public/css/<%= pkg.name %>-debug.css": "public/less/<%= pkg.name %>.less"
        }
      }
    },

    watch: {
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['public/less/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      }
    }
  });

  // 加载插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['watch']);

};