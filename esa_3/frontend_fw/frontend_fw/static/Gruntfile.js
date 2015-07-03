module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                /* string defined to put between each file in the concatenated output */
                separator: ';'
            },
            basic: {
                src: ['script/module/_prj_head.js'],
                dest: 'js/head.js'
            },
            extras: {
                src: [
                    'script/lib/jquery-1.11.3.min.js',
                    'script/lib/bootstrap/transition.js',
                    'script/lib/bootstrap/alert.js',
                    'script/lib/bootstrap/button.js',
                    'script/lib/bootstrap/carousel.js',
                    'script/lib/bootstrap/collapse.js',
                    'script/lib/bootstrap/dropdown.js',
                    'script/lib/bootstrap/modal.js',
                    'script/lib/bootstrap/tooltip.js',
                    'script/lib/bootstrap/popover.js',
                    'script/lib/bootstrap/scrollspy.js',
                    'script/lib/bootstrap/tab.js',
                    'script/lib/bootstrap/affix.js',
                    'script/module/_prj_body.js'
                ],
                dest: 'js/body.js'
            }
        },
        watch: {
            concat: {
                files: ['script/module/*.js'],
                tasks: "concat"
            },
            less: {
                files: ['less/**/*.less'],
                tasks: "less:dist"
            }
        },
        uglify: {
            options: {
                banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                files: {
                    '../../src/<%= pkg.name %>/static/js/body.js' : 'js/body.js',
                    '../../src/<%= pkg.name %>/static/js/head.js' : 'js/head.js'
                }
            }
        },
        less: {
            dist: {
                options: {
                    paths: ["static/less"],
                    compress: false,
                    cleancss: false,
                    ieCompat: true
                },
                files: {
                    "css/style.css": "less/style.less",
                    "css/noscript.css": "less/noscript.less"
                }
            },
            build: {
                options: {
                    paths: ["static/less"],
                    compress: true,
                    cleancss: false,
                    ieCompat: true
                },
                files: {
                    "../../src/<%= pkg.name %>/static/css/style.css": "less/style.less",
                    "../../src/<%= pkg.name %>/static/css/noscript.css": "less/noscript.less"
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');


    grunt.registerTask('default', ['concat', 'less:dist']);
    grunt.registerTask('build', ['concat', 'uglify', 'less:build']);
    grunt.registerTask('watchdev', ['watch']);

};
