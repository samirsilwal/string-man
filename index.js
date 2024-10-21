const core = require('@actions/core');

try {
  const inputString = core.getInput('input');
  const operator = core.getInput('func');
  const params = core.getInput('params');

  function manipulateString(operator, ...params) {
    switch (operator) {
      case 'identity':
        return params[0];

      case 'length':
        return params[0].length;

      case 'charAt':
        return params[0].charAt(params[1]);

      case 'charCodeAt':
        return params[0].charCodeAt(params[1]);

      case 'at':
        return params[0].at(params[1]);

      case 'indexOf':
        return params[0].indexOf(params[1]);

      case 'lastIndexOf':
        return params[0].lastIndexOf(params[1]);

      case 'includes':
        return params[0].includes(params[1]);

      case 'startsWith':
        return params[0].startsWith(params[1]);

      case 'endsWith':
        return params[0].endsWith(params[1]);

      case 'concat':
        return params.join('');

      case 'replace':
        return params[0].replace(params[1], params[2]);

      case 'replaceAll':
        return params[0].replaceAll(params[1], params[2]);

      case 'slice':
        return params[0].slice(params[1], params[2]);

      case 'substring':
        return params[0].substring(params[1], params[2]);

      case 'substr':
        return params[0].substr(params[1], params[2]);

      case 'padStart':
        return params[0].padStart(params[1], params[2]);

      case 'padEnd':
        return params[0].padEnd(params[1], params[2]);

      case 'trim':
        return params[0].trim();

      case 'trimStart':
      case 'trimLeft':
        return params[0].trimStart();

      case 'trimEnd':
      case 'trimRight':
        return params[0].trimEnd();

      case 'toUpperCase':
        return params[0].toUpperCase();

      case 'toLowerCase':
        return params[0].toLowerCase();

      case 'toLocaleUpperCase':
        return params[0].toLocaleUpperCase();

      case 'toLocaleLowerCase':
        return params[0].toLocaleLowerCase();

      case 'split':
        return params[0].split(params[1]);

      case 'repeat':
        return params[0].repeat(params[1]);

      case 'localeCompare':
        return params[0].localeCompare(params[1]);

      default:
        core.error('Invalid operator' + operator);
        return `Invalid operator: ${operator}`;
    }
  }


  const output = manipulateString(operator, inputString, ...params.split(','));

  core.setOutput('value', output);

} catch (error) {
  core.setFailed(error.message);
}
