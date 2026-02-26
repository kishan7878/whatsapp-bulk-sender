const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs-extra');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

let mainWindow;
let whatsappClient;
let isClientReady = false;

// Create the browser window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        icon: path.join(__dirname, 'assets/icon.png'),
        title: 'WhatsApp Bulk Sender',
        autoHideMenuBar: true
    });

    mainWindow.loadFile('desktop/index.html');

    // Open DevTools in development
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
        if (whatsappClient) {
            whatsappClient.destroy();
        }
    });
}

// Initialize WhatsApp Client
function initializeWhatsApp() {
    whatsappClient = new Client({
        authStrategy: new LocalAuth({
            dataPath: path.join(app.getPath('userData'), 'session')
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

    // QR Code event
    whatsappClient.on('qr', (qr) => {
        console.log('QR Code received');
        mainWindow.webContents.send('qr-code', qr);
    });

    // Authenticated event
    whatsappClient.on('authenticated', () => {
        console.log('Authenticated');
        mainWindow.webContents.send('status', 'authenticated');
    });

    // Ready event
    whatsappClient.on('ready', () => {
        console.log('WhatsApp client is ready');
        isClientReady = true;
        mainWindow.webContents.send('status', 'ready');
    });

    // Auth failure event
    whatsappClient.on('auth_failure', (msg) => {
        console.error('Authentication failed:', msg);
        mainWindow.webContents.send('status', 'auth_failure');
    });

    // Disconnected event
    whatsappClient.on('disconnected', (reason) => {
        console.log('Client disconnected:', reason);
        isClientReady = false;
        mainWindow.webContents.send('status', 'disconnected');
    });

    whatsappClient.initialize();
}

// App ready event
app.whenReady().then(() => {
    createWindow();
    initializeWhatsApp();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// IPC Handlers

// Select CSV file
ipcMain.handle('select-csv-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'CSV Files', extensions: ['csv'] },
            { name: 'Excel Files', extensions: ['xlsx', 'xls'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });

    if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
    }
    return null;
});

// Select file to send
ipcMain.handle('select-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'All Files', extensions: ['*'] },
            { name: 'APK Files', extensions: ['apk'] },
            { name: 'PDF Files', extensions: ['pdf'] },
            { name: 'Images', extensions: ['jpg', 'jpeg', 'png', 'gif'] }
        ]
    });

    if (!result.canceled && result.filePaths.length > 0) {
        return result.filePaths[0];
    }
    return null;
});

// Parse CSV file
ipcMain.handle('parse-csv', async (event, filePath) => {
    try {
        const csv = require('csv-parser');
        const contacts = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    const phone = row.phone || row.number || row.Phone || row.Number;
                    if (phone) {
                        contacts.push({ phone: phone.toString().trim() });
                    }
                })
                .on('end', () => {
                    resolve(contacts);
                })
                .on('error', reject);
        });
    } catch (error) {
        console.error('Error parsing CSV:', error);
        throw error;
    }
});

// Send bulk messages
ipcMain.handle('send-bulk-messages', async (event, { contacts, message, delay }) => {
    if (!isClientReady) {
        throw new Error('WhatsApp client is not ready');
    }

    const results = {
        sent: 0,
        failed: 0,
        total: contacts.length
    };

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        try {
            let phoneNumber = contact.phone.replace(/\D/g, '');
            
            // Add country code if not present
            if (!phoneNumber.startsWith('91') && phoneNumber.length === 10) {
                phoneNumber = '91' + phoneNumber;
            }

            const chatId = phoneNumber + '@c.us';
            await whatsappClient.sendMessage(chatId, message);
            
            results.sent++;
            
            // Send progress update
            mainWindow.webContents.send('send-progress', {
                current: i + 1,
                total: contacts.length,
                sent: results.sent,
                failed: results.failed,
                contact: contact.phone,
                status: 'success'
            });

            // Delay between messages
            if (i < contacts.length - 1) {
                await new Promise(resolve => setTimeout(resolve, delay * 1000));
            }
        } catch (error) {
            console.error(`Failed to send to ${contact.phone}:`, error);
            results.failed++;
            
            mainWindow.webContents.send('send-progress', {
                current: i + 1,
                total: contacts.length,
                sent: results.sent,
                failed: results.failed,
                contact: contact.phone,
                status: 'failed',
                error: error.message
            });
        }
    }

    return results;
});

// Send bulk files
ipcMain.handle('send-bulk-files', async (event, { contacts, filePath, caption, delay }) => {
    if (!isClientReady) {
        throw new Error('WhatsApp client is not ready');
    }

    const results = {
        sent: 0,
        failed: 0,
        total: contacts.length
    };

    const media = MessageMedia.fromFilePath(filePath);

    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        try {
            let phoneNumber = contact.phone.replace(/\D/g, '');
            
            if (!phoneNumber.startsWith('91') && phoneNumber.length === 10) {
                phoneNumber = '91' + phoneNumber;
            }

            const chatId = phoneNumber + '@c.us';
            await whatsappClient.sendMessage(chatId, media, { caption: caption || '' });
            
            results.sent++;
            
            mainWindow.webContents.send('send-progress', {
                current: i + 1,
                total: contacts.length,
                sent: results.sent,
                failed: results.failed,
                contact: contact.phone,
                status: 'success'
            });

            if (i < contacts.length - 1) {
                await new Promise(resolve => setTimeout(resolve, delay * 1000));
            }
        } catch (error) {
            console.error(`Failed to send to ${contact.phone}:`, error);
            results.failed++;
            
            mainWindow.webContents.send('send-progress', {
                current: i + 1,
                total: contacts.length,
                sent: results.sent,
                failed: results.failed,
                contact: contact.phone,
                status: 'failed',
                error: error.message
            });
        }
    }

    return results;
});

// Check client status
ipcMain.handle('check-status', async () => {
    return {
        ready: isClientReady,
        state: whatsappClient ? whatsappClient.info : null
    };
});

// Logout
ipcMain.handle('logout', async () => {
    if (whatsappClient) {
        await whatsappClient.logout();
        isClientReady = false;
        return true;
    }
    return false;
});