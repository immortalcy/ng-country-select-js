module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        minified : {
            files: {
                src: [
                    'src/*.js'
                ],
                dest: 'dist/'
            },
            options : {
                uglifyOpts: {
                    mangle: false,
                    compress: false
                },
                ext: '.min.js'
            }
        }
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-minified');

    // Default task(s).
    grunt.registerTask('default', ['minified']);
};
