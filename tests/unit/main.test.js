const core = require("@actions/core");
const { main } = require("../../index"); // Adjust the import path

jest.mock("@actions/core");

describe('Main function execution', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should parse operator as JSON and apply multiple transformations', () => {
    core.getInput.mockImplementation((inputName) => {
      if (inputName === 'input') return 'hello';
      if (inputName === 'func') return '[["concat", "hello", " world"], ["length"]]';
      return '';
    });

    main();

    expect(core.info).toHaveBeenCalledWith('Parsing operator as JSON');
    expect(core.info).toHaveBeenCalledWith('Applying operator: concat');
    expect(core.info).toHaveBeenCalledWith('Applying operator: length');
  });

  it('should handle operator directly if not JSON', () => {
    core.getInput.mockImplementation((inputName) => {
      if (inputName === 'input') return 'hello';
      if (inputName === 'func') return 'length';
      return '';
    });

    main();

    expect(core.setOutput).toHaveBeenCalledWith('value', 5);
  });

  it('should set failure for invalid operator in JSON parsing', () => {
    core.getInput.mockImplementation((inputName) => {
      if (inputName === 'input') return 'hello';
      if (inputName === 'func') return '[["invalidOp"]]';
      return '';
    });

    main();

    expect(core.setFailed).toHaveBeenCalledWith('Invalid operator: invalidOp');
  });

  it('should set failure if JSON parsing throws an error', () => {
    core.getInput.mockImplementation((inputName) => {
      if (inputName === 'func') return '[invalidJSON]';
      return '';
    });

    main();

    expect(core.setFailed).toHaveBeenCalled();
  });
});
