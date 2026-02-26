const fs = require('fs-extra');
const csv = require('csv-parser');
const XLSX = require('xlsx');

/**
 * Parse CSV file and return array of contacts
 */
async function parseCSV(filePath) {
    const contacts = [];
    
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(filePath)) {
            reject(new Error('CSV file not found'));
            return;
        }

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Support both 'phone' and 'number' column names
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
}

/**
 * Parse Excel file and return array of contacts
 */
function parseExcel(filePath) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    return data.map(row => ({
        phone: (row.phone || row.number || row.Phone || row.Number).toString().trim()
    }));
}

/**
 * Format phone number to international format
 */
function formatPhoneNumber(phone) {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    
    // If doesn't start with country code, assume India (+91)
    if (!cleaned.startsWith('91') && cleaned.length === 10) {
        cleaned = '91' + cleaned;
    }
    
    return cleaned;
}

/**
 * Delay execution for specified milliseconds
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Validate phone number format
 */
function isValidPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Generate random delay between min and max seconds
 */
function randomDelay(minSeconds, maxSeconds) {
    const min = minSeconds * 1000;
    const max = maxSeconds * 1000;
    const randomMs = Math.floor(Math.random() * (max - min + 1)) + min;
    return delay(randomMs);
}

/**
 * Read file and return base64
 */
async function fileToBase64(filePath) {
    const file = await fs.readFile(filePath);
    return file.toString('base64');
}

/**
 * Get file extension
 */
function getFileExtension(filePath) {
    return filePath.split('.').pop().toLowerCase();
}

/**
 * Check if file is an APK
 */
function isAPK(filePath) {
    return getFileExtension(filePath) === 'apk';
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Log with timestamp
 */
function logWithTime(message) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`);
}

module.exports = {
    parseCSV,
    parseExcel,
    formatPhoneNumber,
    delay,
    isValidPhoneNumber,
    randomDelay,
    fileToBase64,
    getFileExtension,
    isAPK,
    formatFileSize,
    logWithTime
};
