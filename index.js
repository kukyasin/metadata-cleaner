#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * AI Metadata Cleaner - Main module
 * Removes EXIF data and metadata from AI-generated images and videos
 */

class AIMetadataCleaner {
  constructor() {
    this.scriptPath = path.join(__dirname, 'scripts', 'clean_metadata.sh');
  }

  /**
   * Check if required dependencies are installed
   * @returns {Object} - { hasDependencies: boolean, missing: string[] }
   */
  checkDependencies() {
    const { spawnSync } = require('child_process');
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

    return {
      hasDependencies: missingTools.length === 0,
      missing: missingTools
    };
  }

  /**
   * Clean metadata from files
   * @param {Array} files - Array of file paths
   * @param {Object} options - Options object
   * @returns {Promise} - Promise that resolves when done
   */
  cleanFiles(files, options = {}) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.scriptPath)) {
        reject(new Error('Script not found'));
        return;
      }

      const args = [];

      // Add options
      if (options.backup) {
        args.push('-b');
      }

      if (options.dryRun) {
        args.push('--dry-run');
      }

      // Add files
      args.push(...files);

      const child = spawn('bash', [this.scriptPath, ...args], {
        stdio: options.silent ? 'pipe' : 'inherit',
        cwd: process.cwd()
      });

      let stdout = '';
      let stderr = '';

      if (options.silent) {
        child.stdout?.on('data', (data) => {
          stdout += data.toString();
        });

        child.stderr?.on('data', (data) => {
          stderr += data.toString();
        });
      }

      child.on('exit', (code) => {
        if (code === 0) {
          resolve({
            success: true,
            stdout: stdout,
            stderr: stderr
          });
        } else {
          reject(new Error(`Script exited with code ${code}: ${stderr}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Clean metadata from directory
   * @param {string} directory - Directory path
   * @param {Object} options - Options object
   * @returns {Promise} - Promise that resolves when done
   */
  cleanDirectory(directory, options = {}) {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.scriptPath)) {
        reject(new Error('Script not found'));
        return;
      }

      if (!fs.existsSync(directory)) {
        reject(new Error('Directory not found'));
        return;
      }

      const args = ['-d', directory];

      // Add options
      if (options.backup) {
        args.push('-b');
      }

      if (options.recursive) {
        args.push('-r');
      }

      if (options.dryRun) {
        args.push('--dry-run');
      }

      const child = spawn('bash', [this.scriptPath, ...args], {
        stdio: options.silent ? 'pipe' : 'inherit',
        cwd: process.cwd()
      });

      let stdout = '';
      let stderr = '';

      if (options.silent) {
        child.stdout?.on('data', (data) => {
          stdout += data.toString();
        });

        child.stderr?.on('data', (data) => {
          stderr += data.toString();
        });
      }

      child.on('exit', (code) => {
        if (code === 0) {
          resolve({
            success: true,
            stdout: stdout,
            stderr: stderr
          });
        } else {
          reject(new Error(`Script exited with code ${code}: ${stderr}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Get help information
   * @returns {Promise} - Promise that resolves with help text
   */
  getHelp() {
    return this.cleanFiles([], { silent: true })
      .then(() => {})
      .catch((error) => {
        // The script will exit with error when run without args,
        // but it will print help first
        return error.message;
      });
  }
}

// Export for use as a module
module.exports = AIMetadataCleaner;

// If run directly, use CLI interface
if (require.main === module) {
  const { checkDependencies } = require('./bin/ai-metadata-cleaner');

  // Check dependencies first
  if (!checkDependencies()) {
    process.exit(1);
  }

  // Run the CLI version
  require('./bin/ai-metadata-cleaner');
}