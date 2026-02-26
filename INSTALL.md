# 🚀 Easy Installation Guide

## Option 1: Download Pre-built EXE (Coming Soon)

We're building the Windows installer. It will be available at:
- **GitHub Releases:** https://github.com/kishan7878/whatsapp-bulk-sender/releases

## Option 2: Build Yourself (5 Minutes)

### Prerequisites
1. **Node.js** - Download from https://nodejs.org/ (v16 or higher)
2. **Git** - Download from https://git-scm.com/

### Build Steps

```bash
# Step 1: Open Command Prompt or PowerShell

# Step 2: Clone the repository
git clone https://github.com/kishan7878/whatsapp-bulk-sender.git

# Step 3: Navigate to folder
cd whatsapp-bulk-sender

# Step 4: Install dependencies (takes 2-3 minutes)
npm install

# Step 5: Build the app (takes 5-7 minutes)
npm run build:win
```

### Output Location
After build completes, find your installer at:
```
dist/WhatsApp Bulk Sender Setup 1.0.0.exe
```

### Install & Run
1. Double-click the `.exe` file
2. Follow installation wizard
3. Launch from Start Menu or Desktop
4. Scan QR code with WhatsApp
5. Start sending!

## Option 3: Run Without Building (Development Mode)

If you just want to test without building:

```bash
# After cloning and npm install
npm start
```

This opens the app directly without creating an installer.

## Troubleshooting

### Build Fails?
```bash
# Clean install
rm -rf node_modules
npm install
npm run build:win
```

### Node.js Not Found?
- Install from https://nodejs.org/
- Restart Command Prompt
- Try again

### Permission Errors?
- Run Command Prompt as Administrator
- Try build again

## Need Help?

- **Issues:** https://github.com/kishan7878/whatsapp-bulk-sender/issues
- **Discussions:** https://github.com/kishan7878/whatsapp-bulk-sender/discussions

---

**Made with ❤️ by Shree Kishan Mishra**