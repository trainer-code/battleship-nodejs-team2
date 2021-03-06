module.exports = {
    preset: 'ts-jest',
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?",
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: [
        "node_modules",
        "test-config",
        "interfaces",
        "jestGlobalMocks.ts",
        "testing.*.ts",
        ".enum.ts",
        "models",
        "<rootDir>/src/themes",
        ".module.ts",
        ".css.ts",
        "<rootDir>/src/index.tsx",
        ".mock.ts",
        "<rootDir>/src/serviceWorker.ts",
        "mocks"
    ]
};