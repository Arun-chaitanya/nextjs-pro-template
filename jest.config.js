module.exports = {
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/__mocks__/fileMock.js",

    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^@hocs/(.*)$": "<rootDir>/src/hocs/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@icons/(.*)$": "<rootDir>/src/icons/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@types": "<rootDir>/src/types",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@views/(.*)$": "<rootDir>/src/views/$1",
  },
  globalSetup: "<rootDir>/__tests__/globalSetup.ts",
  setupFilesAfterEnv: ["<rootDir>/__tests__/setupTests.ts"],
  testMatch: ["**/__tests__/**/*.(test|spec).[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
};
