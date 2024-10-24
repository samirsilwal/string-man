const core = require('@actions/core');

try {
  const inputString = core.getInput('input');
  const operator = core.getInput('func');
  const params = core.getInput('params');

  function manipulateString(operator, ...params) {
    // For instance methods
    if (typeof String.prototype[operator] === 'function') {
      const targetString = params[0];
      return String.prototype[operator].apply(targetString, params.slice(1));
    }

    // For instance properties
    switch (operator) {
      case 'equals':
        return params[0] === params[1];

      case 'identity':
        return params[0];

      case 'concat':
        return params.join('');

      case 'length':
        return params[0].length;

      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }

  const output = manipulateString(operator, inputString, ...params);

  core.setOutput('value', output);
} catch (error) {
  core.setFailed(error.message);
}
