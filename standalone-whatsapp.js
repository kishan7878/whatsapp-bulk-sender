/**
 * Standalone WhatsApp QR Code Generator
 * Run this separately to test WhatsApp connection
 * 
 * Usage:
 * 1. npm install whatsapp-web.js qrcode-terminal
 * 2. node standalone-whatsapp.js
 */

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

console.log('🚀 Starting WhatsApp Client...\n');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

// QR Code Event
client.on('qr', (qr) => {
    console.log('📱 QR Code Generated!\n');
    console.log('Scan this QR code with WhatsApp:\n');
    qrcode.generate(qr, { small: true });
    console.log('\n✅ Waiting for scan...\n');
});

// Ready Event
client.on('ready', () => {
    console.log('✅ WhatsApp Client is Ready!\n');
    console.log('🎉 Successfully connected to WhatsApp!\n');
    console.log('You can now close this and use the main app.\n');
});

// Authenticated Event
client.on('authenticated', () => {
    console.log('🔐 Authenticated successfully!\n');
});

// Authentication Failure
client.on('auth_failure', (msg) => {
    console.error('❌ Authentication failed:', msg);
});

// Disconnected Event
client.on('disconnected', (reason) => {
    console.log('⚠️ WhatsApp disconnected:', reason);
    console.log('Restarting...\n');
    client.initialize();
});

// Loading Screen
client.on('loading_screen', (percent, message) => {
    console.log('Loading:', percent, message);
});

// Initialize
console.log('Initializing WhatsApp Web.js...\n');
client.initialize();