/* eslint-env es2018 */
const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

process.env.TZ = 'UTC';

module.exports = {
  ...jestConfig,
  modulePathIgnorePatterns: ['<rootDir>/.localdevserver']
};
