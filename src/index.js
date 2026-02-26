const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const chalk = require('chalk');
const ora = require('ora');

console.log(chalk.green.bold('\n🚀 WhatsApp Bulk Sender\n'));

const spinner = ora('Initializing WhatsApp client...').start();

// Initialize WhatsApp client with local authentication
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './session'
    }),
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

// QR Code generation
client.on('qr', (qr) => {
    spinner.stop();
    console.log(chalk.yellow('\n📱 Scan this QR code with your WhatsApp app:\n'));
    qrcode.generate(qr, { small: true });
    console.log(chalk.cyan('\nGo to WhatsApp > Settings > Linked Devices > Link a Device\n'));
});

// Authentication successful
client.on('authenticated', () => {
    spinner.succeed(chalk.green('✅ Authentication successful!'));
});

// Client ready
client.on('ready', () => {
    console.log(chalk.green.bold('\n✅ WhatsApp client is ready!\n'));
    console.log(chalk.cyan('You can now use the bulk sender features.'));
    console.log(chalk.yellow('\nAvailable commands:'));
    console.log(chalk.white('  npm run send-message  - Send bulk messages'));
    console.log(chalk.white('  npm run send-file     - Send bulk files/APKs\n'));
});

// Authentication failure
client.on('auth_failure', (msg) => {
    spinner.fail(chalk.red('❌ Authentication failed!'));
    console.error(chalk.red('Error:', msg));
});

// Disconnected
client.on('disconnected', (reason) => {
    console.log(chalk.yellow('⚠️  Client was disconnected:', reason));
});

// Error handling
client.on('error', (error) => {
    console.error(chalk.red('❌ Error occurred:'), error);
});

// Initialize the client
client.initialize();

// Export client for use in other modules
module.exports = client;
