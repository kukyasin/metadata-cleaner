#!/usr/bin/env node

const { AIMetadataCleaner, cleanFile, cleanFiles, cleanDirectory, checkDependencies } = require('../lib/cleaner');
const path = require('path');
const fs = require('fs');

async function runTests() {
  // Test configuration
  const testDir = path.join(__dirname, 'test-files');
  const testImage = path.join(testDir, 'test.jpg');
  const testVideo = path.join(testDir, 'test.mp4');

  console.log('🧪 Running AI Metadata Cleaner Tests\n');

  // Test 1: Check dependencies
  console.log('Test 1: Checking dependencies...');
  const deps = checkDependencies();
  console.log(`✓ Dependencies check: ${deps.hasDependencies ? 'OK' : 'MISSING'}`);
  if (deps.missing.length > 0) {
    console.log(`  Missing: ${deps.missing.join(', ')}`);
  }

  // Test 2: Create test files
  console.log('\nTest 2: Creating test files...');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }

  // Create a dummy test image file (1x1 pixel)
  const jpegHeader = Buffer.from([
    0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01,
    0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43
  ]);
  fs.writeFileSync(testImage, jpegHeader);
  console.log(`✓ Created test image: ${testImage}`);

  // Create a dummy test video file (just a minimal container)
  fs.writeFileSync(testVideo, Buffer.from('dummy video content'));
  console.log(`✓ Created test video: ${testVideo}`);

  // Test 3: Test file cleaning
  console.log('\nTest 3: Testing file cleaning...');
  if (deps.hasDependencies) {
    try {
      await cleanFile(testImage, { dryRun: true });
      console.log('✓ File cleaning test passed');
    } catch (error) {
      console.log(`✗ File cleaning test failed: ${error.message}`);
    }
  } else {
    console.log('⚠ Skipping file cleaning test (missing dependencies)');
  }

  // Test 4: Test directory cleaning
  console.log('\nTest 4: Testing directory cleaning...');
  if (deps.hasDependencies) {
    try {
      await cleanDirectory(testDir, { dryRun: true });
      console.log('✓ Directory cleaning test passed');
    } catch (error) {
      console.log(`✗ Directory cleaning test failed: ${error.message}`);
    }
  } else {
    console.log('⚠ Skipping directory cleaning test (missing dependencies)');
  }

  // Test 5: Test class instantiation
  console.log('\nTest 5: Testing class instantiation...');
  try {
    const cleaner = new AIMetadataCleaner();
    console.log('✓ AIMetadataCleaner class instantiated successfully');
  } catch (error) {
    console.log(`✗ Class instantiation failed: ${error.message}`);
  }

  // Cleanup test files
  console.log('\nCleanup: Removing test files...');
  try {
    if (fs.existsSync(testImage)) {
      fs.unlinkSync(testImage);
    }
    if (fs.existsSync(testVideo)) {
      fs.unlinkSync(testVideo);
    }
    if (fs.existsSync(testDir)) {
      fs.rmdirSync(testDir);
    }
    console.log('✓ Test files cleaned up');
  } catch (error) {
    console.log(`⚠ Cleanup failed: ${error.message}`);
  }

  console.log('\n🎉 Tests completed!');
}

// Run the tests
runTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});