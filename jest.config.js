module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
        "^.+\\.css$": "jest-transform-css",
        ".+\\.(scss|png|jpg|svg)$": "jest-transform-stub"
      },
}

