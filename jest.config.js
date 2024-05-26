module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^firebase/(.*)$': '<rootDir>/__mocks__/firebase.js',
    '\\.(css|less)$': 'identity-obj-proxy',
    '^pages/admin$': '<rootDir>/__mocks__/admin.js', // Ensure this path matches your structure
  },
};
