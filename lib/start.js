var fs = require('fs');
var prompt = require('prompt');
var project = require('./project');

function validateProjectName(name) {
    if (!String(name).match(/^[$A-Z_][0-9A-Z_$]*$/i)) {
        console.error(
          '"%s" is not a valid name for a project. Please use a valid identifier ' +
            'name (alphanumeric).',
          name,
        );
        process.exit(1);
    }
    
    if (name === 'React') {
        console.error(
            '"%s" is not a valid name for a project. Please do not use the ' +
            'reserved word "React".',
            name,
        );
        process.exit(1);
    }
}
function createAfterConfirmation(name){
    console.log(`Directory ${name} already exists`);
    process.exit();
    
    // 用prompt 顯示一段訊息，你可以輸入內容，根據內容進行下去
    // prompt.start();
    // var property = {
    //   name: 'yesno',
    //   message: 'Directory ' + name + ' already exists. Continue?',
    //   validator: /y[es]*|n[o]?/,
    //   warning: 'Must respond yes or no',
    //   default: 'no',
    // };
    // prompt.get(property, function(err, result) {
    //   if (result.yesno[0] === 'y') {
    //     project.create(name);
    //   } else {
    //     console.log('Project initialization canceled');
    //     process.exit();
    //   }
    // });
}
module.exports = {
    enter: () => {
        /* 
        * process.argv.slice(2) 會將前面兩個參數去掉 
        * ex: node . my-repo 'my-repo-description' => 只取到my-repo & my-repo-description
        * 
        * 目前沒用到argv
        * 可以設計成
        * 1.zest-rhino init zest-rhino-starter 直接輸入的方式
        * 2.直接用checkbox來選 - 目前先用這個
        * optinos = { _: [], help: 'helpZest' }
        */
        var options = require('minimist')(process.argv.slice(2));
        var commands = options._;

        if (options._.length === 0 && (options.h || options.help)) {
            console.log(
              [
                '',
                '  Usage: zest-rhino [command] [options]',
                '',
                '',
                '  Commands:',
                '',
                '    init <ProjectName> [options]  generates a new project and installs its dependencies',
                '',
                '  Options:',
                '',
                '    -h, --help    output usage information',
                '    -v, --version use a specific version of React Native',
                '',
              ].join('\n'),
            );
            process.exit(0);
        }
        if (options._.length === 0 && (options.v || options.version)) {
            console.log('zest-rhino-cli: ' + require('../package.json').version);
          }
        if (commands.length === 0) {
            console.error(
              'You did not pass any commands, run `zest-rhino --help` to see a list of all available commands.',
            );
            process.exit(1);
        }
        return commands;
    },
    init: (name) => {
        validateProjectName(name);
        if (fs.existsSync(name)) {
            createAfterConfirmation(name);
          } else {
            project.create(name);
        }
    }
}