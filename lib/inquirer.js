/**
 * inquirer
 * 用來問問題
 */
const inquirer   = require('inquirer');

module.exports = {
    askInitReactNativeProject: () => {
        const questions = [
            {
              type: 'list',
              name: 'visibility',
              message: 'Choose a zest-rhino starter:',
              choices: [ 'zest-rhino-starter', 'zest-rhino-counter' ],
              default: 'zest-rhino-starter'
            }
          ];
        return inquirer.prompt(questions);
    }
}