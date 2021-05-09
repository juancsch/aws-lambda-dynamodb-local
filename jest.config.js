module.exports = {
	'setupFilesAfterEnv': ['jest-extended'],
	'verbose': true,
	'testEnvironment': 'node',
	'transform': {
	'^.+\\.ts?$': 'ts-jest'
	},
	'testMatch': ['<rootDir>/test/**/*.test.ts'],
	'coverageDirectory': 'coverage',
	'coveragePathIgnorePatterns': ['<rootDir>/test', '<rootDir>/node_modules']
};
