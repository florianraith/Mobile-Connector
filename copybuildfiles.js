const fs = require('fs-extra');
const path = require('path')

async function copyBuildFiles() {
  try {
    await fs.copyFile(path.join(__dirname, 'config.js'), path.join(__dirname, 'dist', 'config.js'));
    await fs.copy(path.join(__dirname, 'public'), path.join(__dirname, 'dist', 'public'));
    await fs.copy(path.join(__dirname, 'views'), path.join(__dirname, 'dist', 'views'));
    console.log('copied build files');
  } catch(e) {
    console.log(e);
  }
}
copyBuildFiles();

