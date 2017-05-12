/*
 * @overview: Grunt配置
 */

module.exports = function(grunt){

    // 统计各个任务运行时间
    require('time-grunt')(grunt);
    // Load multiple grunt tasks(plugins)
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Config
        pkg: grunt.file.readJSON('package.json'),
        archive_name: grunt.option('name') || '<%= pkg.name %>',
        author: 'sara',

        // task configuration
        // 
        // 清除不需要的文件
        clean: {
            tmp: ['.tmp'],
            build: ['.tmp', 'build'],
            release: ['.tmp', '*.zip']
        },
        // 准备（分析页面需要压缩的css/js）
        useminPrepare: {
            html: 'index.php',
            options: {
                dest: 'build'
            }
        },
        // 执行
        usemin: {
            html: ['build/index.php']
        },
        // 合并
        concat: {
            options: {
                separator: ';'
            }
        },
        // css压缩
        cssmin: {
            options: {
                report: 'gzip',
                banner: '/** \n' +
                    ' * -------------------------------------------------------------\n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= author %> All rights reserved. \n' +
                    ' * ------------------------------------------------------------- \n' +
                    ' */ \n\n'
            }
        },
        // js压缩
        uglify: {
            options: {
                mangle: true,  // 混淆
                banner: '/** \n' +
                    ' * -------------------------------------------------------------\n' +
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= author %> All rights reserved. \n' +
                    ' * ------------------------------------------------------------- \n' +
                    ' */ \n\n',
                compress: {
                    drop_console: true  // 去掉console.*
                },
                report: 'gzip'
            }
        },
        // 压缩图片
        imagemin: {
            dynamic: {
              files: [{
                expand: true,
                cwd: 'assets/images/',
                src: ['**/*.{jpg, jpeg, png, gif}'],
                dest: 'assets/images/'
              }]
            }
        },
        // 刷新静态资源
        filerev: {
            build: {
                src: [
                    'build/assets/images/**/*.{jpg, jpeg, gif, png, webp}',
                    'build/assets/css/*.css',
                    'build/assets/js/*.js',
                    'build/assets/libs/*.js'
                ]
            }
        },
        // 压缩HTML
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true
                },
                files: {
                    'build/index.php': 'build/index.php'
                }
            }
        },
        // 复制文件
        copy: {
            build: {
                files: [
                    { expand: true, src: ['index.php'], dest: 'build/' },
                    { expand: true, src: ['assets/images/**'], dest: 'build/' },
                    {
                        expand: true,
                        src: [
                            '*',
                            '!.DS_Store',
                            '!bower_components',
                            '!bower.json',
                            '!node_modules',
                            '!Gruntfile.js',
                            '!package.json',
                            '!LICENSE-MIT',
                            '!README.md',
                            '!build',
                            '!*.zip'
                        ],
                        dest: 'build/'
                    }
                ]
            }
        },
        // 生成zip、tar、gzip包
        compress: {
            release: {
                options: {
                    archive: '<%= archive_name %>-<%= grunt.template.today("yyyy") %><%= grunt.template.today("mm") %><%= grunt.template.today("dd") %><%= grunt.template.today("HH") %><%= grunt.template.today("MM") %>.zip'
                },
                expand: true,
                cwd: 'build/',
                src: ['**/*'],
                dest: ''
            }
        },
    });

    // Compress images task(s)
    grunt.registerTask('img', ['imagemin']);

    // Build task(s)
    grunt.registerTask('default', [
        'clean:build',
        'copy:build',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'filerev',
        'usemin',
        'htmlmin:build',
        'clean:tmp'
    ]);

    // Generation package task(s)
    grunt.registerTask('package', ['clean:release', 'compress:release', 'clean:build']);
};
