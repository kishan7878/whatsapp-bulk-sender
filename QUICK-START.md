# ⚡ Quick Start Guide

## 🎯 Sabse Easy Method (Recommended)

### Windows Users:

1. **Download Repository:**
   - Click green "Code" button
   - Select "Download ZIP"
   - Extract ZIP file

2. **Double-click `build.bat`**
   - Ye automatically sab kuch kar dega:
     - Dependencies install
     - App build
     - Installer create

3. **Wait 10-15 minutes**
   - Build complete hone ka wait karo

4. **Install & Run:**
   - `dist` folder mein jao
   - `WhatsApp Bulk Sender Setup 1.0.0.exe` run karo
   - Install karo
   - App launch karo!

---

## 🚀 Alternative Methods

### Method 1: GitHub Actions (No Local Setup)

1. Go to: https://github.com/kishan7878/whatsapp-bulk-sender/actions
2. Click "Build Windows App"
3. Click "Run workflow"
4. Wait 10-15 minutes
5. Download artifact from completed run

### Method 2: Command Line

```bash
# Clone
git clone https://github.com/kishan7878/whatsapp-bulk-sender.git
cd whatsapp-bulk-sender

# Install
npm install

# Build
npm run build:win
```

### Method 3: Portable Version (No Installation)

```bash
npm run build:portable
```

Output: `dist-portable/WhatsApp Bulk Sender.exe` (portable, no install needed)

### Method 4: Development Mode (Test Only)

```bash
npm install
npm start
```

---

## 📋 Prerequisites

**Required:**
- Windows 7 or higher
- Node.js v16+ (download from https://nodejs.org/)

**Optional:**
- Git (for cloning)

---

## 🎯 Choose Your Method:

| Method | Time | Difficulty | Best For |
|--------|------|------------|----------|
| `build.bat` | 15 min | ⭐ Easy | Windows users |
| GitHub Actions | 15 min | ⭐ Easy | No local setup |
| Command Line | 15 min | ⭐⭐ Medium | Developers |
| Portable | 15 min | ⭐⭐ Medium | No install needed |
| Dev Mode | 2 min | ⭐⭐⭐ Advanced | Testing only |

---

## ✅ After Build

**Installer Location:**
```
dist/WhatsApp Bulk Sender Setup 1.0.0.exe
```

**Portable Location:**
```
dist-portable/WhatsApp Bulk Sender.exe
```

---

## 🐛 Troubleshooting

### Node.js not found?
```bash
# Install from: https://nodejs.org/
# Restart terminal
# Try again
```

### Build fails?
```bash
# Clean install
rm -rf node_modules
npm install
npm run build:win
```

### Permission error?
- Run Command Prompt as Administrator
- Try again

---

## 📞 Need Help?

- **Issues:** https://github.com/kishan7878/whatsapp-bulk-sender/issues
- **Full Guide:** See [BUILD.md](BUILD.md)
- **Installation:** See [INSTALL.md](INSTALL.md)

---

**Happy Building! 🚀**