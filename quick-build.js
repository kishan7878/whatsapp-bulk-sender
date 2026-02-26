#!/usr/bin/env node

/**
 * Quick Build Script - Creates EXE in 5 minutes
 * Run: node quick-build.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Quick Build Starting...\n');

// Minimal package.json for quick build
const minimalPackage = {
  "name": "whatsapp-bulk-sender",
  "version": "1.0.0",
  "main": "electron-main.js",
  "scripts": {
    "build": "electron-builder --win --x64"
  },
  "build": {
    "appId": "com.whatsapp.bulksender",
    "productName": "WhatsApp Bulk Sender",
    "files": ["electron-main.js", "desktop/**/*"],
    "win": {
      "target": "nsis"
    }
  },
  "devDependencies": {
    "electron": "^28.0.0",
    "electron-builder": "^24.9.1"
  }
};

const steps = [
  {
    name: 'Creating minimal package.json',
    action: () => {
      fs.writeFileSync('package-minimal.json', JSON.stringify(minimalPackage, null, 2));
      console.log('✅ Minimal package created');
    }
  },
  {
    name: 'Installing only required dependencies',
    action: () => {
      console.log('📦 Installing electron and electron-builder...');
      execSync('npm install --save-dev electron@28.0.0 electron-builder@24.9.1', { stdio: 'inherit' });
      console.log('✅ Dependencies installed');
    }
  },
  {
    name: 'Building Windows EXE',
    action: () => {
      console.log('🔨 Building EXE (this takes 5-7 minutes)...');
      execSync('npx electron-builder --win --x64', { stdio: 'inherit' });
      console.log('✅ Build complete!');
    }
  }
];

async function build() {
  try {
    for (let i = 0; i < steps.length; i++) {
      console.log(`\n[${i + 1}/${steps.length}] ${steps[i].name}...`);
      steps[i].action();
    }

    console.log('\n🎉 SUCCESS! Your EXE is ready!\n');
    console.log('📁 Location: dist/WhatsApp Bulk Sender Setup 1.0.0.exe\n');
    console.log('💡 You can now:');
    console.log('   1. Install the app');
    console.log('   2. Share with others');
    console.log('   3. Upload to GitHub Releases\n');

  } catch (error) {
    console.error('\n❌ Build failed:', error.message);
    console.log('\n💡 Try manual build:');
    console.log('   npm install');
    console.log('   npm run build:win\n');
    process.exit(1);
  }
}

build();