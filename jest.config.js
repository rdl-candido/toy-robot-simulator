module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["/**/*.spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
};
