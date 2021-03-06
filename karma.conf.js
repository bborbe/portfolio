// Karma configuration
// Generated on Tue Aug 18 2015 15:31:40 GMT+0200 (CEST)

module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [
			'./files/libs/angularjs/1.4.12/angular.min.js',
			'./files/libs/angularjs/1.4.12/angular-route.min.js',
			'./files/libs/angularjs/1.4.12/angular-cookies.min.js',
			'./files/libs/angularjs/1.4.12/angular-resource.min.js',
			'./files/libs/angularjs/1.4.12/angular-mocks.js',
			'./files/*.js',
			'./files/js/*.js',
		],


		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'./files/js/**/!(*spec).js': ['coverage']
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage', 'junit'],

		junitReporter: {
			outputDir: 'target/karma-results',
			outputFile: 'target/karma-results.xml'
		},

		coverageReporter: {
			//type: 'cobertura',
			dir: 'target/coverage-reports/'
		},

		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// list of karma plugins
		plugins: [
			'karma-jasmine',
			'karma-phantomjs-launcher',
			'karma-coverage',
			'karma-junit-reporter',
			'karma-jenkins-reporter'
		]
	})
}
