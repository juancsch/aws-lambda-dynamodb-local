const configBase = require('./jest.config');

module.exports = {
	...configBase,
	"testMatch": ['<rootDir>/test/**/*.e2e.ts']
};
