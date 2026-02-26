# 📱 WhatsApp Bulk Sender

A powerful **Windows Desktop Application** to send bulk messages, APKs, and files to multiple WhatsApp contacts at once.

![WhatsApp Bulk Sender](https://img.shields.io/badge/WhatsApp-Bulk%20Sender-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

## 🌐 Website

**Live Demo & Download:** https://kishan7878.github.io/whatsapp-bulk-sender/

## ✨ Features

- 📤 **Bulk Messaging** - Send messages to hundreds of contacts
- 📎 **File Sharing** - Share APKs, PDFs, images, and documents
- 📊 **CSV Import** - Import contacts from CSV or Excel files
- ⏱️ **Smart Delays** - Configurable delays to prevent rate limiting
- ✅ **Delivery Tracking** - Real-time progress and delivery status
- 🖥️ **Desktop App** - Beautiful Windows application with GUI
- 🔐 **100% Secure** - Everything runs locally on your machine
- 🆓 **Free & Open Source** - No hidden costs or subscriptions

## 🖥️ Windows Desktop App

### Download & Install

1. **Download the installer:**
   - Visit: https://kishan7878.github.io/whatsapp-bulk-sender/
   - Click "Download for Windows"
   - Or download from [GitHub Releases](https://github.com/kishan7878/whatsapp-bulk-sender/releases)

2. **Install:**
   - Run `WhatsApp Bulk Sender Setup.exe`
   - Follow the installation wizard
   - Launch from Start Menu or Desktop shortcut

3. **First Time Setup:**
   - Open the app
   - Scan QR code with WhatsApp mobile app
   - Start sending!

### Screenshots

**Dashboard:**
- Clean, modern interface
- Real-time connection status
- Statistics and analytics

**Send Messages:**
- Import contacts from CSV
- Type your message
- Set delay and send

**Send Files:**
- Select any file (APK, PDF, images)
- Add optional caption
- Bulk send to all contacts

## 🚀 Quick Start (Command Line)

If you prefer command line or want to build from source:

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- WhatsApp account

### Installation

```bash
# Clone the repository
git clone https://github.com/kishan7878/whatsapp-bulk-sender.git

# Navigate to project directory
cd whatsapp-bulk-sender

# Install dependencies
npm install
```

### Usage

**Desktop App:**
```bash
npm start
```

**Command Line:**
```bash
# Send bulk messages
npm run send-message

# Send bulk files
npm run send-file
```

## 📋 CSV Format

Create a `contacts.csv` file with phone numbers:

```csv
phone
919876543210
918765432109
917654321098
```

**Important:**
- Include country code (e.g., 91 for India)
- One number per line
- Column name should be `phone` or `number`

## 🏗️ Build from Source

Want to build the Windows app yourself?

```bash
# Install dependencies
npm install

# Build for Windows
npm run build:win
```

Output: `dist/WhatsApp Bulk Sender Setup 1.0.0.exe`

**Detailed build guide:** See [BUILD.md](BUILD.md)

## 📁 Project Structure

```
whatsapp-bulk-sender/
├── desktop/              # Desktop app UI files
│   ├── index.html       # Main app interface
│   ├── style.css        # App styling
│   └── renderer.js      # Frontend logic
├── src/                 # CLI source files
│   ├── index.js         # WhatsApp client
│   ├── sender.js        # Bulk sending logic
│   └── utils.js         # Utility functions
├── electron-main.js     # Electron main process
├── package.json         # Dependencies & scripts
├── BUILD.md            # Build instructions
└── README.md           # This file
```

## ⚙️ Configuration

Edit `config.json` to customize:

```json
{
  "messageDelay": 5000,        // Delay between messages (ms)
  "maxRetries": 3,             // Retry failed messages
  "defaultCountryCode": "91",  // Default country code
  "maxMessagesPerDay": 200     // Daily limit
}
```

## ⚠️ Important Notes

### Rate Limiting
- **Recommended delay:** 5-10 seconds between messages
- **Daily limit:** Don't exceed 100-200 messages per day
- **Use responsibly:** Only send to people who have consented

### Account Safety
- WhatsApp may temporarily ban your number if you send too many messages
- Start with small batches (10-20 contacts)
- Gradually increase as you test
- Use proper delays

### Best Practices
- ✅ Get consent before sending
- ✅ Use meaningful, non-spam messages
- ✅ Test with small groups first
- ✅ Monitor delivery rates
- ❌ Don't send spam
- ❌ Don't exceed rate limits
- ❌ Don't use for illegal purposes

## 🛠️ Advanced Features

### Custom Message Templates

```javascript
const template = "Hello {name}, your order {orderId} is ready!";
```

### Scheduled Sending

```javascript
scheduleSend(phoneNumber, message, scheduledTime);
```

### Variable Replacement

Import CSV with multiple columns:
```csv
phone,name,orderId
919876543210,John,12345
918765432109,Jane,12346
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

See [LICENSE](LICENSE) file for details.

## ⚡ Tech Stack

- **Electron** - Desktop app framework
- **whatsapp-web.js** - WhatsApp Web API wrapper
- **Node.js** - Runtime environment
- **qrcode** - QR code generation
- **csv-parser** - CSV file parsing
- **xlsx** - Excel file support

## 🐛 Troubleshooting

### QR Code not showing?
- Check internet connection
- Restart the app
- Try a different terminal/app

### Messages not sending?
- Verify phone numbers have country codes
- Check WhatsApp Web is connected
- Ensure proper delays are set

### Session expired?
- Delete session folder
- Restart app and scan QR code again

### Build fails?
- Make sure Node.js v16+ is installed
- Delete `node_modules` and run `npm install`
- Check [BUILD.md](BUILD.md) for detailed troubleshooting

## 📞 Support

- **Issues:** https://github.com/kishan7878/whatsapp-bulk-sender/issues
- **Discussions:** https://github.com/kishan7878/whatsapp-bulk-sender/discussions
- **Website:** https://kishan7878.github.io/whatsapp-bulk-sender/

## 🎯 Roadmap

- [x] Windows Desktop App
- [x] Bulk message sending
- [x] Bulk file sending
- [x] CSV import
- [ ] Excel import with multiple columns
- [ ] Message templates
- [ ] Scheduled sending
- [ ] Contact groups
- [ ] Send history
- [ ] Analytics dashboard
- [ ] Mac & Linux versions
- [ ] Auto-update feature

## ⭐ Star this repo if you find it useful!

## 📸 Screenshots

### Desktop App Interface
- Modern, dark-themed UI
- Easy-to-use navigation
- Real-time progress tracking
- Beautiful QR code scanner

### Features in Action
- Import contacts with one click
- Type message and send
- Track delivery in real-time
- View statistics and history

---

**Disclaimer:** This tool is for educational purposes. Use responsibly and in accordance with WhatsApp's Terms of Service. The developers are not responsible for any misuse of this tool.

**Made with ❤️ by Shree Kishan Mishra**

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

[![GitHub stars](https://img.shields.io/github/stars/kishan7878/whatsapp-bulk-sender?style=social)](https://github.com/kishan7878/whatsapp-bulk-sender/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/kishan7878/whatsapp-bulk-sender?style=social)](https://github.com/kishan7878/whatsapp-bulk-sender/network/members)