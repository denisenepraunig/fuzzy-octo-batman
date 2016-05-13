'use strict';

module.exports = function(grunt) {

	grunt.initConfig({

		dir: {
			webapp: 'webapp',
			dist: 'dist'
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= dir.webapp %>',
					src: [
						'**',
						'!test/**'
					],
					dest: '<%= dir.dist %>'
				}]
			}
		},

		clean: {
			dist: '<%= dir.dist %>/'
		},

		openui5_preload: {
			component: {
				options: {
					resources: {
						cwd: 'webapp',
						prefix: 'test/minification'
					},
					dest: 'dist'
				},
				components: 'test/minification'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-openui5');

	// Build task
	grunt.registerTask('build', ['openui5_preload', 'copy']);

	// Default task
	grunt.registerTask('default', [
		'clean',
		'build'
	]);
};