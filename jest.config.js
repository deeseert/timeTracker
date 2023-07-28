/** @type {import('jest').Config} */

const config = {
  verbose: true,
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  testEnvironment: 'jsdom'
};

module.exports = config;