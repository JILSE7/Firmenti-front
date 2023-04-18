const esModules = ['axios']
module.exports = {

  testEnvironment: "jsdom",
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/test/_mocks_/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [`/node_modules/(?!axios)/`],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}