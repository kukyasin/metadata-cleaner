#!/usr/bin/env node

const path = require('path');

// ANSI color codes
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

const print = {
  info: (msg) => console.log(`${colors.green}[INFO]${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}[WARNING]${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}[ERROR]${colors.reset} ${msg}`)
};

function checkSystemDependencies() {
  const { spawnSync } = require('child_process');
  const fs = require('fs');

  const requiredTools = ['exiftool', 'ffmpeg'];
  const missingTools = [];

  for (const tool of requiredTools) {
    try {
      const result = spawnSync('which', [tool], { stdio: 'pipe' });
      if (result.status !== 0) {
        missingTools.push(tool);
      }
    } catch (error) {
      missingTools.push(tool);
    }
  }

  if (missingTools.length > 0) {
    print.warning(`This tool requires the following dependencies: ${missingTools.join(', ')}`);
    print.info('Installation instructions:');

    if (process.platform === 'darwin') {
      console.log('  brew install exiftool ffmpeg');
    } else if (process.platform === 'linux') {
      console.log('  Ubuntu/Debian: sudo apt install libimage-exiftool-perl ffmpeg');
      console.log('  CentOS/RHEL: sudo yum install perl-Image-ExifTool ffmpeg');
    } else if (process.platform === 'win32') {
      console.log('  Windows: Download from https://exiftool.org/ and https://ffmpeg.org/download.html');
      console.log('  Or use Chocolatey: choco install exiftool ffmpeg');
    }

    console.log();
    print.info('After installing dependencies, you can use the tool with:');
    console.log('  ai-metadata-cleaner --help');
    console.log('  ai-metadata-cleaner -b image.jpg');
    console.log('  ai-metadata-cleaner -d /path/to/images');
  } else {
    print.info('All dependencies are installed! You can now use the tool.');
    console.log();
    print.info('Usage examples:');
    console.log('  ai-metadata-cleaner --help');
    console.log('  ai-metadata-cleaner -b image.jpg');
    console.log('  ai-metadata-cleaner -d /path/to/images');
  }
}

// Run the post-installation check
checkSystemDependencies();