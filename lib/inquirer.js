/**
 * inquirer
 * 用來問問題
 */
const inquirer   = require('inquirer');
const files      = require('./files');

module.exports = {
    askInitReactNativeProject: () => {
        const argv = require('minimist')(process.argv.slice(2));
        const projectName = argv._[0];
        const projectPackageName = argv._[1];

        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the project',
                default: projectName || files.getCurrentDirectoryBase(),
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a name for the project.';
                    }
                }
            },
            {
                type: 'input',
                name: 'package',
                message: 'Enter package of the project:',
                default: projectPackageName || 'com.rhino',
            },
            {
                type: 'list',
                name: 'starter',
                message: 'Choose a zest-rhino starter:',
                choices: [ 'zest-rhino-singleScreenApp', 'zest-rhino-tabBasedApp' ],
                default: 'zest-rhino-singleScreenApp'
            }
          ];
        return inquirer.prompt(questions);
    }
}