
module.exports = {
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/setupTests.ts', './jest.polyfills.js'],
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};