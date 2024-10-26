const core = require('@actions/core');

function isValidJSON(str) {
  try {
    const parsed = JSON.parse(str);

    return !!Array.isArray(parsed);
  } catch (e) {
    return false;
  }
}

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

  let output = '';

  if (isValidJSON(operator)) {
    core.info('Parsing operator as JSON');
    const operatorObj = JSON.parse(operator);

    let finalOutput = inputString;

    for (const operatorInfo of operatorObj) {
      const op = operatorInfo[0];

      core.info(`Applying operator: ${op}`);
      const strOutput = manipulateString(op, finalOutput, ...operatorInfo.slice(1));

      if (typeof strOutput !== 'string') {
        break;
      }
      core.info(`intermediate output: ${strOutput}`);

      finalOutput = strOutput;
    }

    output = finalOutput;

  } else {
    output = manipulateString(operator, inputString, ...params);
  }

  core.setOutput('value', output);
} catch (error) {
  core.setFailed(error.message);
}
