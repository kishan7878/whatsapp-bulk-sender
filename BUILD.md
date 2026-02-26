# 🏗️ Building WhatsApp Bulk Sender for Windows

This guide will help you build the Windows desktop application.

## 📋 Prerequisites

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/

3. **Windows Build Tools** (for native modules)
   ```bash
   npm install --global windows-build-tools
   ```

## 🚀 Build Steps

### 1. Clone the Repository

```bash
git clone https://github.com/kishan7878/whatsapp-bulk-sender.git
cd whatsapp-bulk-sender
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Electron and WhatsApp Web.js.

### 3. Test the App (Development Mode)

Before building, test if everything works:

```bash
npm start
```

This will open the app in development mode. You should see:
- The app window opens
- QR code appears for WhatsApp connection
- You can scan and test the functionality

### 4. Build for Windows

To create the Windows installer:

```bash
npm run build:win
```

This will:
- Create a Windows installer (.exe)
- Package all dependencies
- Create shortcuts
- Generate installation wizard

**Build output location:** `dist/WhatsApp Bulk Sender Setup 1.0.0.exe`

### 5. Build Options

**NSIS Installer (Recommended for Windows):**
```bash
npm run build:win
```
- Creates a professional installer
- Allows custom installation directory
- Creates desktop and start menu shortcuts
- Supports uninstallation

**Portable Version:**
Edit `package.json` and change:
```json
"win": {
  "target": "portable"
}
```
Then run: `npm run build:win`

## 📦 Build Output

After successful build, you'll find in the `dist` folder:

- `WhatsApp Bulk Sender Setup 1.0.0.exe` - Installer (recommended)
- `win-unpacked/` - Unpacked application files

## 🎯 Distribution

### For End Users:

1. **Share the installer:**
   - Upload `WhatsApp Bulk Sender Setup 1.0.0.exe` to your website
   - Users download and run the installer
   - Follow installation wizard
   - App installs to `C:\Program Files\WhatsApp Bulk Sender\`

2. **Installation Requirements:**
   - Windows 7 or higher
   - 200 MB free disk space
   - Internet connection (for WhatsApp Web)

### For GitHub Releases:

1. Create a new release on GitHub
2. Upload the `.exe` file as a release asset
3. Users can download directly from GitHub

## 🔧 Customization

### Change App Icon

1. Create/get an icon file:
   - Windows: `.ico` format (256x256 recommended)
   - Place in `assets/icon.ico`

2. Update `package.json`:
   ```json
   "win": {
     "icon": "assets/icon.ico"
   }
   ```

### Change App Name

Edit `package.json`:
```json
"build": {
  "productName": "Your App Name"
}
```

### Change Version

Edit `package.json`:
```json
"version": "1.0.0"
```

## 🐛 Troubleshooting

### Build Fails

**Error: "Cannot find module 'electron'"**
```bash
npm install electron --save-dev
```

**Error: "node-gyp rebuild failed"**
```bash
npm install --global windows-build-tools
npm rebuild
```

**Error: "ENOENT: no such file or directory"**
- Make sure you're in the project root directory
- Run `npm install` again

### App Doesn't Start

**White screen or crash:**
- Check if all dependencies are installed
- Try: `npm install --force`
- Delete `node_modules` and run `npm install` again

**QR code doesn't appear:**
- Check internet connection
- Disable antivirus temporarily
- Check firewall settings

## 📊 Build Size

Expected sizes:
- Installer: ~150-200 MB
- Installed app: ~250-300 MB
- Session data: ~50-100 MB (after WhatsApp connection)

## 🚀 Advanced: Auto-Update

To add auto-update functionality:

1. Install electron-updater:
   ```bash
   npm install electron-updater
   ```

2. Add to `electron-main.js`:
   ```javascript
   const { autoUpdater } = require('electron-updater');
   
   app.on('ready', () => {
     autoUpdater.checkForUpdatesAndNotify();
   });
   ```

3. Configure in `package.json`:
   ```json
   "publish": {
     "provider": "github",
     "owner": "kishan7878",
     "repo": "whatsapp-bulk-sender"
   }
   ```

## 📝 Build Checklist

Before distributing:

- [ ] Test app in development mode (`npm start`)
- [ ] Update version number in `package.json`
- [ ] Add/update app icon
- [ ] Test build locally
- [ ] Test installer on clean Windows machine
- [ ] Create GitHub release
- [ ] Upload installer to release
- [ ] Update website download link
- [ ] Write release notes

## 🎉 Success!

Your Windows app is now ready for distribution!

Users can:
1. Download the installer from your website
2. Run the `.exe` file
3. Follow installation wizard
4. Launch "WhatsApp Bulk Sender" from Start Menu or Desktop
5. Scan QR code and start sending!

## 📞 Support

For build issues:
- Check GitHub Issues: https://github.com/kishan7878/whatsapp-bulk-sender/issues
- Electron Builder Docs: https://www.electron.build/

---

**Happy Building! 🚀**