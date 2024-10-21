const core = require('@actions/core');


try {
  const inputString = core.getInput('input');


  core.setOutput('value', inputString);

} catch (error) {
  core.setFailed(error.message);
}
