# 📱 WhatsApp Bulk Sender

A powerful **Windows Desktop Application** to send bulk messages, APKs, and files to multiple WhatsApp contacts at once.

![WhatsApp Bulk Sender](https://img.shields.io/badge/WhatsApp-Bulk%20Sender-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🌐 Website

**Live Demo:** https://kishan7878.github.io/whatsapp-bulk-sender/

---

## ⚠️ IMPORTANT: QR Code Fix

**If QR code shows "Waiting for QR code..."**, you need to install dependencies first!

### Quick Fix:

```bash
# 1. Clone repository
git clone https://github.com/kishan7878/whatsapp-bulk-sender.git
cd whatsapp-bulk-sender

# 2. Install ALL dependencies (includes WhatsApp Web.js)
npm install

# 3. Build complete app
npm run build:win

# 4. Install from dist folder
```

**📖 Detailed Fix:** [FIX-QR-CODE.md](FIX-QR-CODE.md)  
**🔧 Troubleshooting:** [TROUBLESHOOT.md](TROUBLESHOOT.md)

---

## ⚡ Quick Start

### 🎯 Complete Installation (Recommended):

```bash
# Clone repository
git clone https://github.com/kishan7878/whatsapp-bulk-sender.git
cd whatsapp-bulk-sender

# Install dependencies (IMPORTANT!)
npm install

# Test WhatsApp connection (optional)
node standalone-whatsapp.js

# Build app
npm run build:win

# Install from dist folder
```

**Output:** `dist/WhatsApp Bulk Sender Setup 1.0.0.exe`

---

## ✨ Features

- 📤 **Bulk Messaging** - Send messages to hundreds of contacts
- 📎 **File Sharing** - Share APKs, PDFs, images, and documents
- 📊 **CSV Import** - Import contacts from CSV or Excel files
- ⏱️ **Smart Delays** - Configurable delays to prevent rate limiting
- ✅ **Delivery Tracking** - Real-time progress and delivery status
- 🖥️ **Desktop App** - Beautiful Windows application with GUI
- 🔐 **100% Secure** - Everything runs locally on your machine
- 🆓 **Free & Open Source** - No hidden costs or subscriptions

---

## 📥 Installation Methods

### Method 1: Complete Build (RECOMMENDED)

```bash
git clone https://github.com/kishan7878/whatsapp-bulk-sender.git
cd whatsapp-bulk-sender
npm install
npm run build:win
```

### Method 2: Quick Dependency Install

```bash
# If you already have the source
cd whatsapp-bulk-sender
install-dependencies.bat
npm run build:win
```

### Method 3: One-Click Build

```bash
# Just double-click
build.bat
```

---

## 🎯 Usage

### First Time Setup:

1. **Install the app** from the `.exe` file
2. **Launch** from Start Menu or Desktop
3. **Wait for QR code** (10-30 seconds)
4. **Scan QR code** with WhatsApp mobile app
5. **Import contacts** from CSV file
6. **Send messages or files!**

### CSV Format:

```csv
phone
919876543210
918765432109
917654321098
```

**Important:**
- Include country code (e.g., 91 for India)
- Column name: `phone` or `number`

---

## 🐛 Troubleshooting

### QR Code Not Showing?

**Problem:** Shows "Waiting for QR code..."

**Solution:**
```bash
# Install dependencies
npm install whatsapp-web.js qrcode qrcode-terminal

# Rebuild
npm run build:win
```

**📖 Full Guide:** [FIX-QR-CODE.md](FIX-QR-CODE.md)

### Build Fails?

```bash
# Clean install
rm -rf node_modules dist
npm cache clean --force
npm install
npm run build:win
```

### Test Connection First:

```bash
# Run standalone test
node standalone-whatsapp.js
```

If QR code appears in terminal → Dependencies working!

**📖 More Help:** [TROUBLESHOOT.md](TROUBLESHOOT.md)

---

## 📁 Project Structure

```
whatsapp-bulk-sender/
├── desktop/                    # Desktop app UI
│   ├── index.html             # Main interface
│   ├── style.css              # Styling
│   └── renderer.js            # Frontend logic
├── electron-main.js           # Electron main process
├── standalone-whatsapp.js     # Test script
├── install-dependencies.bat   # Dependency installer
├── build.bat                  # Build script
├── package.json               # Dependencies
├── FIX-QR-CODE.md            # QR code fix guide
├── TROUBLESHOOT.md           # Troubleshooting guide
└── README.md                 # This file
```

---

## ⚙️ Configuration

Edit `config.json`:

```json
{
  "messageDelay": 5000,
  "maxRetries": 3,
  "defaultCountryCode": "91",
  "maxMessagesPerDay": 200
}
```

---

## ⚠️ Important Notes

### Rate Limiting
- **Recommended delay:** 5-10 seconds between messages
- **Daily limit:** 100-200 messages per day
- **Use responsibly:** Only send to consenting contacts

### Account Safety
- Start with small batches (10-20 contacts)
- Use proper delays
- Monitor delivery rates
- Don't send spam

### Dependencies
- **whatsapp-web.js** - Required for WhatsApp connectivity
- **puppeteer** - Auto-installed with whatsapp-web.js (~100MB)
- **qrcode** - QR code generation

---

## 🛠️ Development

### Run in Development Mode:

```bash
npm install
npm start
```

### Build Options:

```bash
# Windows installer
npm run build:win

# Portable version (no install)
npm run build:portable

# Test WhatsApp connection
node standalone-whatsapp.js
```

---

## 📖 Documentation

- **Quick Start:** [QUICK-START.md](QUICK-START.md)
- **Build Guide:** [BUILD.md](BUILD.md)
- **QR Code Fix:** [FIX-QR-CODE.md](FIX-QR-CODE.md)
- **Troubleshooting:** [TROUBLESHOOT.md](TROUBLESHOOT.md)
- **Website:** https://kishan7878.github.io/whatsapp-bulk-sender/

---

## 📊 Build Size

| Version | Size | Features |
|---------|------|----------|
| Without dependencies | ~100 MB | ❌ QR code doesn't work |
| With dependencies | ~200 MB | ✅ Full functionality |

**Recommended:** Build with dependencies for full functionality!

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

MIT License - Free for personal and commercial use.

See [LICENSE](LICENSE) file for details.

---

## ⚡ Tech Stack

- **Electron** - Desktop framework
- **whatsapp-web.js** - WhatsApp API
- **Puppeteer** - Browser automation
- **Node.js** - Runtime
- **qrcode** - QR generation

---

## 📞 Support

- **QR Code Issues:** [FIX-QR-CODE.md](FIX-QR-CODE.md)
- **General Issues:** [TROUBLESHOOT.md](TROUBLESHOOT.md)
- **GitHub Issues:** https://github.com/kishan7878/whatsapp-bulk-sender/issues
- **Discussions:** https://github.com/kishan7878/whatsapp-bulk-sender/discussions

---

## 🎯 Roadmap

- [x] Windows Desktop App
- [x] Bulk messaging
- [x] Bulk file sending
- [x] CSV import
- [x] QR code authentication
- [x] Standalone test script
- [ ] Pre-built installers with dependencies
- [ ] Auto-update
- [ ] Message templates
- [ ] Scheduled sending
- [ ] Mac & Linux versions

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

[![GitHub stars](https://img.shields.io/github/stars/kishan7878/whatsapp-bulk-sender?style=social)](https://github.com/kishan7878/whatsapp-bulk-sender/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kishan7878/whatsapp-bulk-sender?style=social)](https://github.com/kishan7878/whatsapp-bulk-sender/network/members)

---

**Disclaimer:** This tool is for educational purposes. Use responsibly and in accordance with WhatsApp's Terms of Service.

**Made with ❤️ by Shree Kishan Mishra**