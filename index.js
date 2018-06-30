#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer  = require('./lib/inquirer');
const project = require('./lib/project');
const files = require('./lib/files');

// clear terminal
clear();
// show your name of cli
console.log(
  chalk.yellow(
    figlet.textSync('zest-rhino', { horizontalLayout: 'full' })
  )
);

const run = async () => {
    // { name: 'testProject', package: 'com.rhino', 'starter': 'zest-rhino-singleScreenApp' }
    const answers = await inquirer.askInitReactNativeProject();
    if(answers.starter === 'zest-rhino-tabBasedApp') {
      console.log(chalk.yellow('tabBasedApp is creating. Please wait for next zest-rhino-cli release.'));
      process.exit();
    }
    if(!files.directoryExists(answers.name)) {
      project.create(answers.name);
    }
}
run();