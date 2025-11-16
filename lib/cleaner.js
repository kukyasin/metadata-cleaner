/**
 * AI Metadata Cleaner Library
 * A JavaScript library for removing metadata from AI-generated images and videos
 */

const AIMetadataCleaner = require('../index.js');

/**
 * Clean metadata from a single file
 * @param {string} filePath - Path to the file
 * @param {Object} options - Cleaning options
 * @returns {Promise} - Promise that resolves when done
 */
async function cleanFile(filePath, options = {}) {
  const cleaner = new AIMetadataCleaner();
  return cleaner.cleanFiles([filePath], options);
}

/**
 * Clean metadata from multiple files
 * @param {Array} filePaths - Array of file paths
 * @param {Object} options - Cleaning options
 * @returns {Promise} - Promise that resolves when done
 */
async function cleanFiles(filePaths, options = {}) {
  const cleaner = new AIMetadataCleaner();
  return cleaner.cleanFiles(filePaths, options);
}

/**
 * Clean metadata from all files in a directory
 * @param {string} directoryPath - Path to the directory
 * @param {Object} options - Cleaning options
 * @returns {Promise} - Promise that resolves when done
 */
async function cleanDirectory(directoryPath, options = {}) {
  const cleaner = new AIMetadataCleaner();
  return cleaner.cleanDirectory(directoryPath, options);
}

/**
 * Check if required dependencies are available
 * @returns {Object} - Dependency status
 */
function checkDependencies() {
  const cleaner = new AIMetadataCleaner();
  return cleaner.checkDependencies();
}

module.exports = {
  AIMetadataCleaner,
  cleanFile,
  cleanFiles,
  cleanDirectory,
  checkDependencies
};