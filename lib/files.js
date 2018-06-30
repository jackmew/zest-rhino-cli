const fs = require('fs');
const path = require('path');

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

module.exports = {
  //get the current directory (to get a default repo name)
  getCurrentDirectoryBase : () => {
    // making our console application available globally
    return path.basename(process.cwd());
  },
  //check whether a directory exists (to determine whether the current folder is already a Git repository by looking for a folder named .git).
  directoryExists : (name) => {
    validateProjectName(name);
    if (fs.existsSync(name)) {
        console.log(`Directory ${name} already exists`);
        process.exit();
    }
    return false;
  }
};