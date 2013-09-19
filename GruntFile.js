module.exports =function(grunt){
     //Configure your tasks
     grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),//load properties from the package as a JSON object
      watch: {
        options:{
          livereload: true
        },
        js: {
          files:   ['site/scripts/*.coffee'],
          tasks:   ['coffee']
        },
        css:{
          files:   ['site/styles/*.styl'],
          tasks:   ['stylus']
        },
        html:{
          files:   ['site/*.jade'],
          tasks:   ['jade']
        },
        img:{
          files: ['site/images/*'],
          tasks: ['imagemin']
        }       
      },
      coffee:{
        compile: {
            files: {
              'build/js/scripts.js': ['site/scripts/*.coffee'] // compile and concat into single file
            }
          }        
      },
      stylus:{
        compile: {
          files: {
            'build/css/styles.css': ['site/styles/*.styl'] // compile and concat into single file
          }
        }

      },
      jade:{
        compile:{
          options: {pretty:true},
          files:[{
            expand: true,
            cwd:    'site/',
            src:    "*.jade",
            ext:    ".html",
            dest:   "build/"
          }]
        }
      },
      imagemin:{
        options: {                  
          optimizationLevel: 7
        },        
        dynamic:{
          files:[{
            expand: true,
            cwd:    'site/images/',
            src:    ['**/*.{jpg,gif}'],
            dest:   'build/img/'
          }]
        }
      }
     });
     
     //Register (load) the plugins to make them available in Grunt
     grunt.loadNpmTasks('grunt-contrib-watch');
     grunt.loadNpmTasks('grunt-contrib-coffee');
     grunt.loadNpmTasks('grunt-contrib-stylus');
     grunt.loadNpmTasks('grunt-contrib-jade');
     grunt.loadNpmTasks('grunt-contrib-imagemin');
     
     //Run the task
     grunt.registerTask('default', ['watch','coffee', 'stylus', 'jade','imagemin']);
     grunt.registerTask('build', ['coffee', 'stylus', 'jade','imagemin']);
};
