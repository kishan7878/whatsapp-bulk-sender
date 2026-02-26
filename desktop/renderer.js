const { ipcRenderer } = require('electron');
const QRCode = require('qrcode');

let csvFilePath = null;
let csvFilePathFile = null;
let selectedFilePath = null;
let contacts = [];
let contactsFile = [];

// Tab switching
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = item.dataset.tab;
        switchTab(tab);
    });
});

function switchTab(tabName) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Update page title
    const titles = {
        'dashboard': 'Dashboard',
        'send-message': 'Send Messages',
        'send-file': 'Send Files',
        'history': 'History',
        'settings': 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[tabName];
}

// QR Code handling
ipcRenderer.on('qr-code', async (event, qr) => {
    const qrCodeDiv = document.getElementById('qrCode');
    qrCodeDiv.innerHTML = '';
    
    try {
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, qr, { width: 300 });
        qrCodeDiv.appendChild(canvas);
    } catch (error) {
        console.error('Error generating QR code:', error);
        qrCodeDiv.innerHTML = '<p>Error generating QR code</p>';
    }
});

// Status updates
ipcRenderer.on('status', (event, status) => {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');
    const qrSection = document.getElementById('qrSection');
    const dashboardContent = document.getElementById('dashboardContent');

    switch (status) {
        case 'authenticated':
            statusText.textContent = 'Authenticated';
            statusDot.className = 'status-dot';
            break;
        case 'ready':
            statusText.textContent = 'Connected';
            statusDot.className = 'status-dot connected';
            qrSection.style.display = 'none';
            dashboardContent.style.display = 'block';
            break;
        case 'auth_failure':
            statusText.textContent = 'Authentication Failed';
            statusDot.className = 'status-dot disconnected';
            break;
        case 'disconnected':
            statusText.textContent = 'Disconnected';
            statusDot.className = 'status-dot disconnected';
            qrSection.style.display = 'flex';
            dashboardContent.style.display = 'none';
            break;
    }
});

// CSV file selection for messages
document.getElementById('selectCsvBtn').addEventListener('click', async () => {
    csvFilePath = await ipcRenderer.invoke('select-csv-file');
    if (csvFilePath) {
        document.getElementById('csvFileName').textContent = csvFilePath.split(/[\\/]/).pop();
        contacts = await ipcRenderer.invoke('parse-csv', csvFilePath);
        
        document.getElementById('contactsPreview').style.display = 'block';
        document.getElementById('contactCount').textContent = contacts.length;
        document.getElementById('contactsList').innerHTML = contacts.slice(0, 10).map(c => c.phone).join(', ') + 
            (contacts.length > 10 ? '...' : '');
        
        updateSendButton();
    }
});

// CSV file selection for files
document.getElementById('selectCsvBtnFile').addEventListener('click', async () => {
    csvFilePathFile = await ipcRenderer.invoke('select-csv-file');
    if (csvFilePathFile) {
        document.getElementById('csvFileNameFile').textContent = csvFilePathFile.split(/[\\/]/).pop();
        contactsFile = await ipcRenderer.invoke('parse-csv', csvFilePathFile);
        updateSendFileButton();
    }
});

// File selection
document.getElementById('selectFileBtn').addEventListener('click', async () => {
    selectedFilePath = await ipcRenderer.invoke('select-file');
    if (selectedFilePath) {
        document.getElementById('selectedFileName').textContent = selectedFilePath.split(/[\\/]/).pop();
        updateSendFileButton();
    }
});

// Character count
document.getElementById('messageText').addEventListener('input', (e) => {
    document.getElementById('charCount').textContent = e.target.value.length + ' characters';
    updateSendButton();
});

function updateSendButton() {
    const message = document.getElementById('messageText').value.trim();
    const btn = document.getElementById('sendMessagesBtn');
    btn.disabled = !(csvFilePath && contacts.length > 0 && message.length > 0);
}

function updateSendFileButton() {
    const btn = document.getElementById('sendFilesBtn');
    btn.disabled = !(csvFilePathFile && contactsFile.length > 0 && selectedFilePath);
}

// Send messages
document.getElementById('sendMessagesBtn').addEventListener('click', async () => {
    const message = document.getElementById('messageText').value.trim();
    const delay = parseInt(document.getElementById('messageDelay').value);

    if (!message || contacts.length === 0) return;

    const progressCard = document.getElementById('messageProgress');
    const progressBar = document.getElementById('messageProgressBar');
    const log = document.getElementById('messageLog');
    
    progressCard.style.display = 'block';
    log.innerHTML = '';
    
    document.getElementById('sendMessagesBtn').disabled = true;

    try {
        const result = await ipcRenderer.invoke('send-bulk-messages', {
            contacts,
            message,
            delay
        });

        log.innerHTML += `<div class="log-entry success">✅ Completed! Sent: ${result.sent}, Failed: ${result.failed}</div>`;
        
        // Update stats
        document.getElementById('totalSent').textContent = parseInt(document.getElementById('totalSent').textContent) + result.sent;
        
    } catch (error) {
        log.innerHTML += `<div class="log-entry failed">❌ Error: ${error.message}</div>`;
    } finally {
        document.getElementById('sendMessagesBtn').disabled = false;
    }
});

// Send files
document.getElementById('sendFilesBtn').addEventListener('click', async () => {
    const caption = document.getElementById('fileCaption').value.trim();
    const delay = parseInt(document.getElementById('fileDelay').value);

    if (!selectedFilePath || contactsFile.length === 0) return;

    const progressCard = document.getElementById('fileProgress');
    const progressBar = document.getElementById('fileProgressBar');
    const log = document.getElementById('fileLog');
    
    progressCard.style.display = 'block';
    log.innerHTML = '';
    
    document.getElementById('sendFilesBtn').disabled = true;

    try {
        const result = await ipcRenderer.invoke('send-bulk-files', {
            contacts: contactsFile,
            filePath: selectedFilePath,
            caption,
            delay
        });

        log.innerHTML += `<div class="log-entry success">✅ Completed! Sent: ${result.sent}, Failed: ${result.failed}</div>`;
        
        // Update stats
        document.getElementById('filesSent').textContent = parseInt(document.getElementById('filesSent').textContent) + result.sent;
        
    } catch (error) {
        log.innerHTML += `<div class="log-entry failed">❌ Error: ${error.message}</div>`;
    } finally {
        document.getElementById('sendFilesBtn').disabled = false;
    }
});

// Progress updates
ipcRenderer.on('send-progress', (event, data) => {
    const { current, total, sent, failed, contact, status, error } = data;
    
    // Update progress bar
    const percentage = (current / total) * 100;
    const progressBar = document.getElementById('messageProgressBar') || document.getElementById('fileProgressBar');
    progressBar.style.width = percentage + '%';
    progressBar.textContent = Math.round(percentage) + '%';
    
    // Update stats
    document.getElementById('msgSent').textContent = sent;
    document.getElementById('msgFailed').textContent = failed;
    document.getElementById('msgTotal').textContent = total;
    
    document.getElementById('fileSent').textContent = sent;
    document.getElementById('fileFailed').textContent = failed;
    document.getElementById('fileTotal').textContent = total;
    
    // Update log
    const log = document.getElementById('messageLog') || document.getElementById('fileLog');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${status}`;
    logEntry.textContent = `${status === 'success' ? '✅' : '❌'} ${contact} - ${status === 'success' ? 'Sent' : error}`;
    log.appendChild(logEntry);
    log.scrollTop = log.scrollHeight;
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
    if (confirm('Are you sure you want to logout?')) {
        await ipcRenderer.invoke('logout');
    }
});