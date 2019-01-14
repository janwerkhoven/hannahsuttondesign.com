module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'dist',
          hostname: 'localhost',
          livereload: true,
          open: false
        }
      }
    },

    watch: {
      handlebars: {
        files: ['src/templates/**/*.hbs', 'src/**/*.json', 'src/templates/layout.html '],
        tasks: ['build-HTML']
      },
      sass: {
        files: ['src/styles/**/*.scss'],
        tasks: ['build-CSS']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['build-JS']
      },
      assets: {
        files: ['src/public/**/*'],
        tasks: ['copy']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['build']
      },
      options: {
        livereload: true,
      }
    },

    handlebarslayouts: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/templates/',
          src: ['**/*.hbs', '!partials/*'],
          dest: 'dist/',
          ext: '.html',
        }],
        options: {
          partials: ['src/templates/partials/*.hbs', 'src/templates/layout.html'],
          basePath: 'src/templates/',
          modules: ['src/templates/helpers/helpers-*.js'],
          context: [
            "src/public/assets/data/features.json",
          ]
        }
      }
    },

    sass: {
      options: {
        sourcemap: 'none',
        noCache: true
      },
      raw: {
        options: {
          style: 'expanded',
        },
        files: {
          'dist/assets/css/main.css': ['src/styles/main.scss']
        }
      },
      minified: {
        options: {
          style: 'compressed',
        },
        files: {
          'dist/assets/css/main.min.css': ['src/styles/main.scss']
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['> 1% in AU', 'Explorer > 9', 'Firefox >= 17', 'Chrome >= 10', 'Safari >= 6', 'iOS >= 6']
          })
        ]
      },
      raw: {
        src: 'dist/assets/css/main.css'
      },
      minified: {
        src: 'dist/assets/css/main.min.css'
      }
    },

    // jshint: {
    //   files: ['src/js/main.js'],
    //   options: {
    //     force: false,
    //     globals: {
    //       jQuery: true,
    //       console: true,
    //       module: true,
    //       document: true
    //     }
    //   }
    // },

    // eslint: {
    //   all: ['src/js/main.js']
    // },

    eslint: {

      files: {
        options: {
          configFile: 'eslint.json',
          fix: true,
          rulesdir: ['eslint_rules']
        },
        src: ['src/js/main.js']
      }

      // options: {
      //   config: 'eslint.json',
      //   silent: true
      // },
      // src: ['src/js/main.js']
    },

    // eslint: {
    //   src: ['src/js/main.js']
    // },

    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015']
      },
      dist: {
        files: {
          'temp/js/main.js': 'src/js/main.js'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          'temp/js/main.min.js': ['temp/js/main.js'],
          'temp/js/localstorage_safari_private_shim.min.js': ['src/js/localstorage_safari_private_shim.js'],
          'dist/assets/js/outdated-browser.min.js': ['src/js/outdated-browser.js']
        }
      }
    },

    concat: {
      options: {
        separator: ';\n\n',
      },
      raw: {
        files: {
          'dist/assets/js/main.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/velocity/velocity.min.js',
            'bower_components/instafeed.js/instafeed.min.js',
            'bower_components/countUp.js/dist/countUp.min.js',
            'src/js/main.js'
          ]
        }
      },
      minified: {
        files: {
          'dist/assets/js/main.min.js': [
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/velocity/velocity.min.js',
            'bower_components/instafeed.js/instafeed.min.js',
            'bower_components/countUp.js/dist/countUp.min.js',
            'temp/js/main.min.js'
          ]
        }
      }
    },

    clean: {
      dist: {
        src: ['dist/']
      },
      temp: {
        src: ['temp/']
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/public/',
          src: ['**'],
          dest: 'dist/'
        }]
      }
    },

    // BUG: Adds /dist to every URL...
    xml_sitemap: {
      custom_options: {
        options: {
          siteRoot: 'https://www.hannahsuttondesign.com/',
          changefreq: 'monthly',
          priority: '0.5',
          dest: 'dist/'
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**/*.html', '!**/google*.html', '!**/emails/*.html'],
        }]
      }
    },

    // Temporary until sitemap bug is fixed
    replace: {
      sitemap_dist: {
        src: 'dist/sitemap.xml',
        dest: 'dist/sitemap.xml',
        replacements: [{
          from: '/dist/',
          to: '/'
        }, {
          from: '<feed>',
          to: ''
        }, {
          from: '</feed>',
          to: ''
        }]
      }
    },

    // inlinecss: {
    //   main: {
    //     options: {
    //       removeStyleTags: false
    //     },
    //     files: [{
    //       src: 'dist/emails/letter-of-authority.html',
    //       dest: 'dist/emails/letter-of-authority-inline.html'
    //     }, {
    //       src: 'dist/emails/confirmation-email.html',
    //       dest: 'dist/emails/confirmation-email-inline.html'
    //     }]
    //   }
    // }

  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('gruntify-eslint');
  // grunt.loadNpmTasks("grunt-contrib-eslint");
  // grunt.loadNpmTasks('eslint-grunt');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-html-prettyprinter');
  // grunt.loadNpmTasks('grunt-inline-css');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-xml-sitemap');
  grunt.loadNpmTasks("grunt-handlebars-layouts");

  // Available commands
  grunt.registerTask('default', ['build', 'serve']);
  grunt.registerTask('build', ['clean', 'copy', 'build-HTML', 'build-CSS', 'build-JS', 'sitemap']);
  grunt.registerTask('build-HTML', ['handlebarslayouts']);
  grunt.registerTask('build-CSS', ['sass', 'postcss']);
  grunt.registerTask('build-JS', ['babel', 'uglify', 'concat', 'clean:temp']);
  grunt.registerTask('sitemap', ['xml_sitemap', 'replace:sitemap_dist']);
  grunt.registerTask('serve', ['connect', 'watch']);

};
