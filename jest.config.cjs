/** @type {import('jest').Config} */
const config = {
  verbose: true,
  // silent: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testRegex: '\\.test\\.js?$',
  detectOpenHandles: true

  // collectCoverage: true,
  // collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  // coverageReporters: ['lcov', 'text']
}

global.__dirname = __dirname

module.exports = config
