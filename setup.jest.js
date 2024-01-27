
const matchers = require('jest-extended');
const {toBeInTheConsole ,toHaveErrorMessage} = require('cli-testing-library/extend-expect')
expect.extend(matchers);

afterEach(() => {
  jest.useRealTimers();
});