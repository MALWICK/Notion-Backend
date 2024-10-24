/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}]
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json"
    }
  }
};