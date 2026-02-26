# 📱 WhatsApp Bulk Sender

A powerful **Windows Desktop Application** to send bulk messages, APKs, and files to multiple WhatsApp contacts at once.

![WhatsApp Bulk Sender](https://img.shields.io/badge/WhatsApp-Bulk%20Sender-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🌐 Website

**Live Demo:** https://kishan7878.github.io/whatsapp-bulk-sender/

---

## ⚡ Quick Start

### 🎯 Easiest Method (Windows):

1. **Download this repository** (Click green "Code" → "Download ZIP")
2. **Extract ZIP file**
3. **Double-click `build.bat`**
4. **Wait 10-15 minutes**
5. **Install from `dist` folder**

**📖 Detailed Guide:** [QUICK-START.md](QUICK-START.md)

---

## 🚀 All Build Methods

| Method | Time | Difficulty | Guide |
|--------|------|------------|-------|
| 🖱️ **build.bat** (Windows) | 15 min | ⭐ Easy | Just double-click! |
| 🤖 **GitHub Actions** | 15 min | ⭐ Easy | [See below](#github-actions-build) |
| 💻 **Command Line** | 15 min | ⭐⭐ Medium | [BUILD.md](BUILD.md) |
| 📦 **Portable Version** | 15 min | ⭐⭐ Medium | `npm run build:portable` |

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

## 📥 Download & Install

### Option 1: Pre-built Installer (Coming Soon)

Download from [GitHub Releases](https://github.com/kishan7878/whatsapp-bulk-sender/releases)

### Option 2: Build Yourself

#### Windows (Easiest):
```bash
# Just double-click build.bat file!
# Or use command line:
git clone https://github.com/kishan7878/whatsapp-bulk-sender.git
cd whatsapp-bulk-sender
build.bat
```

#### Command Line:
```bash
git clone https://github.com/kishan7878/whatsapp-bulk-sender.git
cd whatsapp-bulk-sender
npm install
npm run build:win
```

**Output:** `dist/WhatsApp Bulk Sender Setup 1.0.0.exe`

### Option 3: GitHub Actions Build

1. Go to [Actions](https://github.com/kishan7878/whatsapp-bulk-sender/actions)
2. Click "Build Windows App"
3. Click "Run workflow"
4. Download artifact after completion

---

## 🎯 Usage

### First Time Setup:

1. **Install the app** from the `.exe` file
2. **Launch** from Start Menu or Desktop
3. **Scan QR code** with WhatsApp mobile app
4. **Import contacts** from CSV file
5. **Send messages or files!**

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

## 📁 Project Structure

```
whatsapp-bulk-sender/
├── desktop/              # Desktop app UI
│   ├── index.html       # Main interface
│   ├── style.css        # Styling
│   └── renderer.js      # Frontend logic
├── src/                 # CLI source
│   ├── index.js         # WhatsApp client
│   ├── sender.js        # Bulk sending
│   └── utils.js         # Utilities
├── electron-main.js     # Electron main process
├── build.bat           # Windows build script
├── package.json        # Dependencies
├── QUICK-START.md      # Quick start guide
├── BUILD.md           # Detailed build guide
├── INSTALL.md         # Installation guide
└── README.md          # This file
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

### Best Practices
- ✅ Get consent before sending
- ✅ Use meaningful messages
- ✅ Test with small groups first
- ❌ Don't send spam
- ❌ Don't exceed rate limits

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

# Mac (on Mac only)
npm run build:mac

# Linux
npm run build:linux
```

---

## 📖 Documentation

- **Quick Start:** [QUICK-START.md](QUICK-START.md)
- **Build Guide:** [BUILD.md](BUILD.md)
- **Installation:** [INSTALL.md](INSTALL.md)
- **Website:** https://kishan7878.github.io/whatsapp-bulk-sender/

---

## 🐛 Troubleshooting

### QR Code not showing?
- Check internet connection
- Restart the app

### Messages not sending?
- Verify phone numbers have country codes
- Check delays are set properly

### Build fails?
```bash
rm -rf node_modules
npm install
npm run build:win
```

**More help:** [BUILD.md](BUILD.md#troubleshooting)

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
- **Node.js** - Runtime
- **qrcode** - QR generation
- **csv-parser** - CSV parsing
- **xlsx** - Excel support

---

## 📞 Support

- **Issues:** https://github.com/kishan7878/whatsapp-bulk-sender/issues
- **Discussions:** https://github.com/kishan7878/whatsapp-bulk-sender/discussions
- **Website:** https://kishan7878.github.io/whatsapp-bulk-sender/

---

## 🎯 Roadmap

- [x] Windows Desktop App
- [x] Bulk messaging
- [x] Bulk file sending
- [x] CSV import
- [x] One-click build script
- [ ] Pre-built installers
- [ ] Excel multi-column import
- [ ] Message templates
- [ ] Scheduled sending
- [ ] Analytics dashboard
- [ ] Mac & Linux versions
- [ ] Auto-update

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

[![GitHub stars](https://img.shields.io/github/stars/kishan7878/whatsapp-bulk-sender?style=social)](https://github.com/kishan7878/whatsapp-bulk-sender/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kishan7878/whatsapp-bulk-sender?style=social)](https://github.com/kishan7878/whatsapp-bulk-sender/network/members)

---

**Disclaimer:** This tool is for educational purposes. Use responsibly and in accordance with WhatsApp's Terms of Service.

**Made with ❤️ by Shree Kishan Mishra**