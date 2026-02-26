const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    },
    icon: path.join(__dirname, 'assets/icon.png'),
    backgroundColor: '#1a1a2e',
    show: false
  });

  mainWindow.loadFile(path.join(__dirname, 'desktop', 'index.html'));

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers for WhatsApp functionality
ipcMain.handle('initialize-whatsapp', async () => {
  try {
    // WhatsApp initialization will be handled in renderer
    return { success: true, message: 'WhatsApp client ready' };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('send-bulk-messages', async (event, data) => {
  try {
    const { contacts, message, delay } = data;
    // Bulk message sending logic will be in renderer
    return { success: true, sent: contacts.length };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

ipcMain.handle('send-bulk-files', async (event, data) => {
  try {
    const { contacts, filePath, delay } = data;
    // Bulk file sending logic will be in renderer
    return { success: true, sent: contacts.length };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

console.log('WhatsApp Bulk Sender - Electron App Started');