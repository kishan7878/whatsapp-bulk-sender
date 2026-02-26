# 📱 WhatsApp Bulk Sender

A powerful Node.js tool to send bulk messages, APKs, and files to multiple WhatsApp contacts at once.

## ✨ Features

- 📤 Send bulk messages to multiple contacts
- 📎 Send APK files and documents
- 📊 Import contacts from CSV/Excel
- 🔄 Queue management for reliable delivery
- 📝 Message templates support
- 🖼️ Send images and media files
- ✅ Delivery status tracking
- 🔐 Secure and easy to use

## 🚀 Quick Start

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

1. **First Time Setup**
   ```bash
   npm start
   ```
   - Scan the QR code with your WhatsApp mobile app
   - Go to WhatsApp > Settings > Linked Devices > Link a Device

2. **Prepare Your Contact List**
   - Create a `contacts.csv` file with phone numbers
   - Format: One number per line (with country code)
   ```
   919876543210
   918765432109
   917654321098
   ```

3. **Send Bulk Messages**
   ```bash
   npm run send-message
   ```

4. **Send APK/Files**
   ```bash
   npm run send-file
   ```

## 📋 Configuration

Edit `config.json` to customize:

```json
{
  "messageDelay": 3000,
  "maxRetries": 3,
  "sessionPath": "./session"
}
```

## 📁 Project Structure

```
whatsapp-bulk-sender/
├── src/
│   ├── index.js           # Main application
│   ├── sender.js          # Message sending logic
│   ├── fileHandler.js     # File handling
│   └── utils.js           # Utility functions
├── contacts.csv           # Your contact list
├── config.json            # Configuration
├── package.json
└── README.md
```

## ⚠️ Important Notes

- **Rate Limiting**: WhatsApp may temporarily ban your number if you send too many messages too quickly
- **Recommended Delay**: Keep at least 3-5 seconds between messages
- **Daily Limit**: Don't send more than 100-200 messages per day
- **Use Responsibly**: Only send messages to people who have consented

## 🛠️ Advanced Features

### Custom Message Templates

Create message templates with variables:

```javascript
const template = "Hello {name}, your order {orderId} is ready!";
```

### Scheduled Sending

Schedule messages for later:

```javascript
scheduleSend(phoneNumber, message, scheduledTime);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## ⚡ Tech Stack

- **whatsapp-web.js** - WhatsApp Web API wrapper
- **qrcode-terminal** - QR code display in terminal
- **csv-parser** - CSV file parsing
- **xlsx** - Excel file support

## 🐛 Troubleshooting

### QR Code not showing?
- Make sure your terminal supports QR code display
- Try running in a different terminal

### Messages not sending?
- Check your internet connection
- Verify phone numbers have correct country codes
- Ensure WhatsApp Web is connected

### Session expired?
- Delete the `session` folder and scan QR code again

## 📞 Support

For issues and questions, please open an issue on GitHub.

## ⭐ Star this repo if you find it useful!

---

**Disclaimer**: This tool is for educational purposes. Use responsibly and in accordance with WhatsApp's Terms of Service.
