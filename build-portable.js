#!/usr/bin/env node

/**
 * Portable Build Script
 * Creates a portable version that runs without installation
 */

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

console.log('🚀 Building Portable Version...\n');

// Build configuration for portable
const portableConfig = {
  appId: 'com.whatsapp.bulksender',
  productName: 'WhatsApp Bulk Sender',
  directories: {
    output: 'dist-portable'
  },
  win: {
    target: 'portable'
  }
};

// Save temporary config
const configPath = path.join(__dirname, 'electron-builder-portable.json');
fs.writeJsonSync(configPath, portableConfig, { spaces: 2 });

try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('\n🔨 Building portable executable...');
  execSync(`npx electron-builder --config ${configPath} --win portable`, { 
    stdio: 'inherit' 
  });

  console.log('\n✅ Build Complete!');
  console.log('\n📁 Output Location:');
  console.log('   dist-portable/WhatsApp Bulk Sender.exe');
  console.log('\n💡 This is a portable version - no installation needed!');
  console.log('   Just copy the .exe file and run it anywhere.\n');

} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Cleanup
  if (fs.existsSync(configPath)) {
    fs.removeSync(configPath);
  }
}