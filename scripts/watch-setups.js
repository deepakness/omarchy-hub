#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { generateSetupsMarkdown } = require('./generate-setups.js');

/**
 * File watcher for automatic SETUPS.md generation
 * This script monitors setups.json for changes and automatically regenerates SETUPS.md
 * 
 * Usage:
 *   node scripts/watch-setups.js
 *   npm run watch-setups
 */

class SetupsWatcher {
  constructor() {
    this.setupsPath = path.join(__dirname, '..', 'data', 'setups.json');
    this.lastModified = null;
    this.watchInterval = 2000; // Check every 2 seconds
    this.isRunning = false;
  }

  start() {
    console.log('🔍 Starting setups watcher...');
    console.log(`📁 Watching: ${this.setupsPath}`);
    console.log('⏱️  Check interval: 2 seconds');
    console.log('🛑 Press Ctrl+C to stop\n');

    this.isRunning = true;
    this.checkFile();
  }

  stop() {
    console.log('\n🛑 Stopping setups watcher...');
    this.isRunning = false;
  }

  checkFile() {
    if (!this.isRunning) return;

    try {
      const stats = fs.statSync(this.setupsPath);
      const currentModified = stats.mtime.getTime();

      if (this.lastModified === null) {
        // First run - set initial timestamp
        this.lastModified = currentModified;
        console.log('✅ Initial check complete. Waiting for changes...');
      } else if (currentModified > this.lastModified) {
        // File has been modified
        console.log('📝 setups.json has been modified!');
        console.log('🔄 Regenerating SETUPS.md...');
        
        try {
          generateSetupsMarkdown();
          console.log('✅ SETUPS.md updated successfully!\n');
        } catch (error) {
          console.error('❌ Error updating SETUPS.md:', error.message);
        }
        
        this.lastModified = currentModified;
      }

      // Schedule next check
      setTimeout(() => this.checkFile(), this.watchInterval);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(`❌ File not found: ${this.setupsPath}`);
        console.log('💡 Make sure setups.json exists in the data directory');
      } else {
        console.error('❌ Error checking file:', error.message);
      }
      
      // Continue checking even if there's an error
      setTimeout(() => this.checkFile(), this.watchInterval);
    }
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  watcher.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  watcher.stop();
  process.exit(0);
});

// Start the watcher
const watcher = new SetupsWatcher();
watcher.start();
