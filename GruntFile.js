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
              'site/build/js/scripts.js': ['site/scripts/*.coffee'] // compile and concat into single file
            }
          }        
      },
      stylus:{
        compile: {
          files: {
            'site/build/css/styles.css': ['site/styles/*.styl'] // compile and concat into single file
          }
        }

      },
      jade:{
        compile: {
          options: {
            data: {
              debug: false
            }
          },
          files: {
            "site/build/index.html": ["site/*.jade"]
          }
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
            dest:   'site/build/img/'
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
};
