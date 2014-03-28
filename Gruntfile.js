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
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify']);

};