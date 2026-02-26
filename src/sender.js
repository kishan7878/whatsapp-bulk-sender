const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const { parseCSV, delay, formatPhoneNumber } = require('./utils');

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './session'
    }),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let isReady = false;

client.on('ready', () => {
    isReady = true;
    console.log(chalk.green('✅ WhatsApp client is ready!\n'));
});

client.on('qr', (qr) => {
    const qrcode = require('qrcode-terminal');
    console.log(chalk.yellow('\n📱 Scan this QR code:\n'));
    qrcode.generate(qr, { small: true });
});

async function sendBulkMessages() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'csvPath',
            message: 'Enter path to CSV file with phone numbers:',
            default: './contacts.csv'
        },
        {
            type: 'input',
            name: 'message',
            message: 'Enter message to send:'
        },
        {
            type: 'number',
            name: 'delay',
            message: 'Delay between messages (seconds):',
            default: 5
        }
    ]);

    const contacts = await parseCSV(answers.csvPath);
    const spinner = ora('Sending messages...').start();

    let sent = 0;
    let failed = 0;

    for (const contact of contacts) {
        try {
            const phoneNumber = formatPhoneNumber(contact.phone);
            const chatId = phoneNumber + '@c.us';

            await client.sendMessage(chatId, answers.message);
            sent++;
            spinner.text = `Sent: ${sent} | Failed: ${failed} | Remaining: ${contacts.length - sent - failed}`;

            await delay(answers.delay * 1000);
        } catch (error) {
            failed++;
            console.error(chalk.red(`\n❌ Failed to send to ${contact.phone}:`, error.message));
        }
    }

    spinner.succeed(chalk.green(`\n✅ Completed! Sent: ${sent} | Failed: ${failed}`));
    process.exit(0);
}

async function sendBulkFiles() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'csvPath',
            message: 'Enter path to CSV file with phone numbers:',
            default: './contacts.csv'
        },
        {
            type: 'input',
            name: 'filePath',
            message: 'Enter path to file (APK/PDF/Image):',
        },
        {
            type: 'input',
            name: 'caption',
            message: 'Enter caption (optional):',
            default: ''
        },
        {
            type: 'number',
            name: 'delay',
            message: 'Delay between sends (seconds):',
            default: 5
        }
    ]);

    if (!fs.existsSync(answers.filePath)) {
        console.error(chalk.red('❌ File not found!'));
        process.exit(1);
    }

    const contacts = await parseCSV(answers.csvPath);
    const media = MessageMedia.fromFilePath(answers.filePath);
    const spinner = ora('Sending files...').start();

    let sent = 0;
    let failed = 0;

    for (const contact of contacts) {
        try {
            const phoneNumber = formatPhoneNumber(contact.phone);
            const chatId = phoneNumber + '@c.us';

            await client.sendMessage(chatId, media, { caption: answers.caption });
            sent++;
            spinner.text = `Sent: ${sent} | Failed: ${failed} | Remaining: ${contacts.length - sent - failed}`;

            await delay(answers.delay * 1000);
        } catch (error) {
            failed++;
            console.error(chalk.red(`\n❌ Failed to send to ${contact.phone}:`, error.message));
        }
    }

    spinner.succeed(chalk.green(`\n✅ Completed! Sent: ${sent} | Failed: ${failed}`));
    process.exit(0);
}

async function main() {
    console.log(chalk.green.bold('\n🚀 WhatsApp Bulk Sender\n'));

    client.initialize();

    // Wait for client to be ready
    await new Promise((resolve) => {
        const checkReady = setInterval(() => {
            if (isReady) {
                clearInterval(checkReady);
                resolve();
            }
        }, 1000);
    });

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                { name: '📤 Send Bulk Messages', value: 'message' },
                { name: '📎 Send Bulk Files/APKs', value: 'file' },
                { name: '❌ Exit', value: 'exit' }
            ]
        }
    ]);

    if (action === 'message') {
        await sendBulkMessages();
    } else if (action === 'file') {
        await sendBulkFiles();
    } else {
        console.log(chalk.yellow('👋 Goodbye!'));
        process.exit(0);
    }
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { sendBulkMessages, sendBulkFiles };
