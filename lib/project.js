var path = require('path');
var fs = require('fs');
const chalk = require('chalk');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

function initReactNative(root, projectName) {
    console.log(chalk.green('Installing react-native'));

    var spawn = require('child_process').spawn,
    initRN = spawn('react-native', ['init', projectName, '--version', '0.53.0']);

    initRN.stdout.on('data', function (data) {
        console.log(chalk.blue(data.toString()));
    });

    initRN.stderr.on('data', function (data) {
        console.log(chalk.yellow(data.toString()));
    });

    initRN.on('exit', function (code) {
        console.log(chalk.green(`init react-native done. code: ${code.toString()}`));
        setStarter(root, projectName);
    });
}
function setStarter(root, projectName) {
    process.chdir(root);
    // npm install 會自動找到package.json的位置，並裝進去node_modules/ => 我只要下載
    console.log(chalk.blue('download zest-rhino-starter for template'));
    execSync('npm v zest-rhino-starter dist.tarball | xargs curl | tar -xz', { stdio: 'inherit'});

    console.log(chalk.blue('set package.json'));
    const starterPackageJson = require(`${root}/package/package.json`);
    const packageJson = require(`${root}/package.json`);
    // 將starter上的package.json scripts 複製到新產生的package.json
    packageJson.scripts = starterPackageJson.scripts;
    packageJson.scripts = starterPackageJson.scripts;
    // 將starter上的package.json dependencies 複製到新產生的package.json
    packageJson.dependencies = starterPackageJson.dependencies;
    packageJson.devDependencies = starterPackageJson.devDependencies;

    fs.writeFileSync(
        path.join(root, 'package.json'),        // /Users/zestho/avnoProjectLib/zest-rhino/zestRhinoProject/package.json
        JSON.stringify(packageJson, null, 4),   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    );
    // 移動starter檔案
    console.log(chalk.blue('move files'));
    execSync(`mv ${root}/package/.babelrc ${root}/`, { stdio: 'inherit'});
    execSync(`mv ${root}/package/.eslintrc ${root}/`, { stdio: 'inherit'});
    execSync(`mv ${root}/package/jsconfig.json ${root}/`, { stdio: 'inherit'});
    execSync(`mv ${root}/package/tsconfig.json ${root}/`, { stdio: 'inherit'});
    execSync(`mv ${root}/package/index.js ${root}/`, { stdio: 'inherit'});
    // create src & mv
    execSync(`mkdir src`, { stdio: 'inherit'});
    execSync(`mv ${root}/package/app/ ${root}/src/`, { stdio: 'inherit'});
    execSync(`mv ${root}/package/screens/ ${root}/src/`, { stdio: 'inherit'});
    execSync(`mv ${root}/package/stores/ ${root}/src/`, { stdio: 'inherit'});
    // ios
    console.log(chalk.blue('move ios files'));
    execSync(`mv ${root}/package/ios/AppDelegate.m ${root}/ios/${projectName}/`, { stdio: 'inherit'});
    console.log(chalk.blue('move ios AppIcon & LaunchImage'));
    execSync(`rm -rf ${root}/ios/${projectName}/Images.xcassets/AppIcon.appiconset`, { stdio: 'inherit'});
    execSync(`mv ${root}/package/ios/AppIcon.appiconset ${root}/ios/${projectName}/Images.xcassets/`, { stdio: 'inherit'});
    execSync(`rm -rf ${root}/ios/${projectName}/Images.xcassets/LaunchImage.launchimage`, { stdio: 'inherit'});
    execSync(`mv ${root}/package/ios/LaunchImage.launchimage ${root}/ios/${projectName}/Images.xcassets/`, { stdio: 'inherit'});
    // android
    console.log(chalk.blue('move android files'));
    execSync(`mv ${root}/package/android/MainActivity.java ${root}/android/app/src/main/java/com/${projectName}/`, { stdio: 'inherit'});
    execSync(`mv ${root}/package/android/MainApplication.java ${root}/android/app/src/main/java/com/${projectName}/`, { stdio: 'inherit'});
    // rm
    console.log(chalk.blue('clear extra files'));
    execSync(`rm -rf ${root}/package/`, { stdio: 'inherit'});
    execSync(`rm -rf ${root}/App.js`, { stdio: 'inherit'});
    // start to install link
    execSync(`npm install`, { stdio: 'inherit'});
    link(root, projectName);
}
function link(root, projectName) {
    console.log(chalk.blue('reat-native link libraries'));
    var spawn = require('child_process').spawn,
    linkRN = spawn('react-native', ['link']);

    linkRN.stdout.on('data', function (data) {
        console.log(chalk.blue(data.toString()));
    });

    linkRN.stderr.on('data', function (data) {
        console.log(chalk.blue(data.toString()));
    });

    linkRN.on('exit', function (code) {
        console.log(chalk.green(`react-native link done. code: ${code.toString()}`));
        // setStarter(root, projectName);
        console.log(chalk.blue('Happly coding with reat-native, react-native-navigation, mobx.'));
    });
}
module.exports = {
    create: (name) => {
        var root = path.resolve(name);              // /Users/zestho/avnoProjectLib/zest-rhino/zestRhinoProject
        var projectName = path.basename(root);      // zestRhinoProject

        initReactNative(root, projectName);
    }
}