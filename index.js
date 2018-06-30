const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer  = require('./lib/inquirer');
const start = require('./lib/start');
var path = require('path');
var fs = require('fs');
var execSync = require('child_process').execSync;
const project = require('./lib/project');

// clear terminal
clear();
// show your name of cli
console.log(
  chalk.yellow(
    figlet.textSync('zest-rhino', { horizontalLayout: 'full' })
  )
);


const run = async () => {
    // 複製檔案
    // project.create('zestProject4');

    const commands = start.enter();
    const command = commands[0];

    // switch (command) {
    //     case 'init':
    //       if (!commands[1]) {
    //         console.error('Usage: zest-rhino init <ProjectName> [--verbose]');
    //         process.exit(1);
    //       } else {
    //         start.init(commands[1]);
    //       }
    //       break;
    //     default:
    //       console.error(
    //         'Command `%s` unrecognized. ' +
    //           'Make sure that you have run `npm install` and that you are inside a react-native project.',
    //         command,
    //       );
    //       process.exit(1);
    //       break;
    //   }
    // inquirer.askInitReactNativeProject();

    // const questions = [

    //     {
    //       type: 'list',
    //       name: 'visibility',
    //       message: 'Choose a zest-rhino starter:',
    //       choices: [ 'zest-rhino-starter', 'zest-rhino-counter' ],
    //       default: 'zest-rhino-starter'
    //     }
    //   ];
    // return inquirer.prompt(questions);
}
run();