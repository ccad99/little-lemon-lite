export default {
   testEnvironment: "jsdom",
   setupFilesAfterEnv: ["./jest.setup.js"], // Setup file for Jest-DOM
   moduleFileExtensions: ["js", "jsx"],
   moduleNameMapper: {
      "\\.(css|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js", // Mock static files
   },
   transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transform JS/TS files using Babel
   },
   testMatch: ["<rootDir>/src/**/__tests__/**/*.test.{js,jsx}"],
};
