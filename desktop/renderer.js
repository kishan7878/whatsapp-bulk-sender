const { ipcRenderer } = require('electron');
const QRCode = require('qrcode');

// State management
let whatsappClient = null;
let isConnected = false;
let currentView = 'dashboard';
let messageHistory = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeWhatsApp();
    updateStats();
});

// Navigation
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.dataset.view;
            switchView(view);
        });
    });
}

function switchView(view) {
    // Hide all views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    
    // Show selected view
    document.getElementById(`${view}-view`).classList.add('active');
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.view === view) {
            item.classList.add('active');
        }
    });
    
    currentView = view;
}

// WhatsApp Integration
async function initializeWhatsApp() {
    updateConnectionStatus('Initializing WhatsApp...');
    
    try {
        // Use whatsapp-web.js via CDN or bundled version
        const { Client, LocalAuth } = require('whatsapp-web.js');
        
        whatsappClient = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            }
        });

        // QR Code event
        whatsappClient.on('qr', async (qr) => {
            console.log('QR Code received:', qr);
            updateConnectionStatus('Scan QR Code');
            await displayQRCode(qr);
        });

        // Ready event
        whatsappClient.on('ready', () => {
            console.log('WhatsApp client is ready!');
            isConnected = true;
            updateConnectionStatus('Connected');
            hideQRCode();
            showSuccessMessage('WhatsApp connected successfully!');
        });

        // Authenticated event
        whatsappClient.on('authenticated', () => {
            console.log('WhatsApp authenticated');
            updateConnectionStatus('Authenticated');
        });

        // Disconnected event
        whatsappClient.on('disconnected', (reason) => {
            console.log('WhatsApp disconnected:', reason);
            isConnected = false;
            updateConnectionStatus('Disconnected');
            showErrorMessage('WhatsApp disconnected. Please reconnect.');
        });

        // Initialize client
        await whatsappClient.initialize();
        
    } catch (error) {
        console.error('WhatsApp initialization error:', error);
        updateConnectionStatus('Connection Failed');
        showErrorMessage('Failed to initialize WhatsApp: ' + error.message);
        
        // Fallback: Show demo QR code
        showDemoQRCode();
    }
}

async function displayQRCode(qrData) {
    try {
        const qrContainer = document.getElementById('qr-code');
        const canvas = document.createElement('canvas');
        
        await QRCode.toCanvas(canvas, qrData, {
            width: 300,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        });
        
        qrContainer.innerHTML = '';
        qrContainer.appendChild(canvas);
        
        // Update status
        document.querySelector('.qr-status').textContent = 'Scan this QR code with WhatsApp';
        
    } catch (error) {
        console.error('QR Code display error:', error);
        showErrorMessage('Failed to display QR code');
    }
}

function showDemoQRCode() {
    // Show a demo QR code with instructions
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 20px;">📱</div>
            <h3 style="color: #25D366; margin-bottom: 10px;">WhatsApp Web.js Required</h3>
            <p style="color: #7f8c8d; margin-bottom: 20px;">
                To use this feature, you need to install WhatsApp Web.js library.
            </p>
            <div style="background: #2c3e50; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <code style="color: #25D366; font-size: 14px;">
                    npm install whatsapp-web.js
                </code>
            </div>
            <p style="color: #95a5a6; font-size: 12px;">
                After installation, restart the application.
            </p>
        </div>
    `;
    
    document.querySelector('.qr-status').textContent = 'Installation Required';
}

function hideQRCode() {
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <i class="fas fa-check-circle" style="font-size: 64px; color: #25D366;"></i>
            <h3 style="color: #25D366; margin-top: 20px;">Connected!</h3>
            <p style="color: #7f8c8d;">WhatsApp is ready to use</p>
        </div>
    `;
}

function updateConnectionStatus(status) {
    const statusElement = document.querySelector('.connection-status');
    if (statusElement) {
        statusElement.textContent = status;
        
        // Update color based on status
        if (status.includes('Connected')) {
            statusElement.style.color = '#25D366';
        } else if (status.includes('Failed') || status.includes('Disconnected')) {
            statusElement.style.color = '#e74c3c';
        } else {
            statusElement.style.color = '#f39c12';
        }
    }
}

// Message Sending
async function sendBulkMessages() {
    if (!isConnected) {
        showErrorMessage('Please connect WhatsApp first!');
        return;
    }

    const messageText = document.getElementById('message-text').value;
    const fileInput = document.getElementById('contacts-file');
    const delay = parseInt(document.getElementById('message-delay').value) || 5000;

    if (!messageText) {
        showErrorMessage('Please enter a message');
        return;
    }

    if (!fileInput.files[0]) {
        showErrorMessage('Please select a contacts file');
        return;
    }

    try {
        const contacts = await parseContactsFile(fileInput.files[0]);
        
        if (contacts.length === 0) {
            showErrorMessage('No valid contacts found in file');
            return;
        }

        // Show progress
        showProgress('Sending messages...', 0, contacts.length);

        let sent = 0;
        let failed = 0;

        for (let i = 0; i < contacts.length; i++) {
            try {
                const number = formatPhoneNumber(contacts[i]);
                await whatsappClient.sendMessage(number, messageText);
                sent++;
                
                // Update progress
                showProgress(`Sending messages... (${sent}/${contacts.length})`, sent, contacts.length);
                
                // Log to history
                addToHistory('message', number, 'success');
                
                // Delay before next message
                if (i < contacts.length - 1) {
                    await sleep(delay);
                }
                
            } catch (error) {
                console.error('Failed to send to:', contacts[i], error);
                failed++;
                addToHistory('message', contacts[i], 'failed');
            }
        }

        hideProgress();
        showSuccessMessage(`Messages sent! Success: ${sent}, Failed: ${failed}`);
        updateStats();

    } catch (error) {
        hideProgress();
        showErrorMessage('Error sending messages: ' + error.message);
    }
}

// File Sending
async function sendBulkFiles() {
    if (!isConnected) {
        showErrorMessage('Please connect WhatsApp first!');
        return;
    }

    const fileInput = document.getElementById('file-to-send');
    const contactsInput = document.getElementById('file-contacts');
    const delay = parseInt(document.getElementById('file-delay').value) || 5000;

    if (!fileInput.files[0]) {
        showErrorMessage('Please select a file to send');
        return;
    }

    if (!contactsInput.files[0]) {
        showErrorMessage('Please select a contacts file');
        return;
    }

    try {
        const contacts = await parseContactsFile(contactsInput.files[0]);
        const filePath = fileInput.files[0].path;

        showProgress('Sending files...', 0, contacts.length);

        let sent = 0;
        let failed = 0;

        for (let i = 0; i < contacts.length; i++) {
            try {
                const number = formatPhoneNumber(contacts[i]);
                const media = MessageMedia.fromFilePath(filePath);
                await whatsappClient.sendMessage(number, media);
                sent++;
                
                showProgress(`Sending files... (${sent}/${contacts.length})`, sent, contacts.length);
                addToHistory('file', number, 'success');
                
                if (i < contacts.length - 1) {
                    await sleep(delay);
                }
                
            } catch (error) {
                console.error('Failed to send file to:', contacts[i], error);
                failed++;
                addToHistory('file', contacts[i], 'failed');
            }
        }

        hideProgress();
        showSuccessMessage(`Files sent! Success: ${sent}, Failed: ${failed}`);
        updateStats();

    } catch (error) {
        hideProgress();
        showErrorMessage('Error sending files: ' + error.message);
    }
}

// Utility Functions
async function parseContactsFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const lines = text.split('\n');
                const contacts = [];
                
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (line) {
                        const number = line.split(',')[0].trim();
                        if (number && number.match(/^\d+$/)) {
                            contacts.push(number);
                        }
                    }
                }
                
                resolve(contacts);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

function formatPhoneNumber(number) {
    // Remove any non-digit characters
    let cleaned = number.replace(/\D/g, '');
    
    // Add country code if not present
    if (!cleaned.startsWith('91') && cleaned.length === 10) {
        cleaned = '91' + cleaned;
    }
    
    return cleaned + '@c.us';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addToHistory(type, contact, status) {
    messageHistory.push({
        type,
        contact,
        status,
        timestamp: new Date()
    });
    
    // Keep only last 100 entries
    if (messageHistory.length > 100) {
        messageHistory.shift();
    }
    
    updateHistoryView();
}

function updateHistoryView() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;
    
    historyList.innerHTML = messageHistory
        .slice(-20)
        .reverse()
        .map(item => `
            <div class="history-item ${item.status}">
                <i class="fas fa-${item.type === 'message' ? 'comment' : 'file'}"></i>
                <span>${item.contact}</span>
                <span class="status">${item.status}</span>
                <span class="time">${item.timestamp.toLocaleTimeString()}</span>
            </div>
        `)
        .join('');
}

function updateStats() {
    const totalSent = messageHistory.filter(h => h.status === 'success').length;
    const totalFailed = messageHistory.filter(h => h.status === 'failed').length;
    
    document.getElementById('total-sent').textContent = totalSent;
    document.getElementById('total-failed').textContent = totalFailed;
    document.getElementById('success-rate').textContent = 
        totalSent > 0 ? Math.round((totalSent / (totalSent + totalFailed)) * 100) + '%' : '0%';
}

function showProgress(message, current, total) {
    const modal = document.getElementById('progress-modal');
    const text = document.getElementById('progress-text');
    const bar = document.getElementById('progress-bar');
    
    text.textContent = message;
    bar.style.width = ((current / total) * 100) + '%';
    modal.style.display = 'flex';
}

function hideProgress() {
    document.getElementById('progress-modal').style.display = 'none';
}

function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Logout
function logout() {
    if (whatsappClient) {
        whatsappClient.destroy();
    }
    isConnected = false;
    updateConnectionStatus('Disconnected');
    initializeWhatsApp();
}

// Event Listeners
document.getElementById('send-messages-btn')?.addEventListener('click', sendBulkMessages);
document.getElementById('send-files-btn')?.addEventListener('click', sendBulkFiles);
document.getElementById('logout-btn')?.addEventListener('click', logout);