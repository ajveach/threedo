module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      js: {
        options: {
          sourceMap : true
        },
        files : {
          'build/threedo.min.js' : [
            'js/threedo.base.js',
            'js/core/_package.js',
            'js/core/_onResize.js',
            'js/core/_update.js',
            'js/core/_loading.js',
            'js/core/_Model.js',
            'js/core/Models/_Module.js',
            'js/core/_extend.js',
            'js/core/Models/_Renderer.js',
            'js/core/Models/_Scene.js',
            'js/core/Models/_Node.js',
            'js/core/Models/_UI.js',
            'js/core/Models/_Node3D.js',
            'js/core/Models/_Camera.js',
            'js/core/Models/_Light.js',
            'js/core/Models/_Mesh.js',
            'js/core/Models/_Cube.js',
            'js/core/Models/_Sphere.js',
            'js/core/Models/_UI.text.js',
            'js/core/Models/_UI.select.js',
            'js/utility/*.js'
          ]
        }
      }
    },
    compass: {
      threedo : {
        options : {
          sourcemap : true,
          cssDir : "build",
          sassDir : "sass"
        }
      }
    },
    watch : {
      files : ['js/**/*.js','sass/**/*.scss'],
      tasks : ['uglify','compass']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify','compass']);

};