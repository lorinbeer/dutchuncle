
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-forever');
  grunt.loadNpmTasks('grunt-shell');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sink : {
        one: ['rand'],
        two: 'om',
        three:'data',
    },



    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
    

  build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    forever: {
        options: {
            index: 'src/init.js',
            logDir: 'logs'
        }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

  grunt.registerMultiTask('sink', 'kitchen et al', function() {
    grunt.log.writeln(this.target+':'+this.data);
  });

};
