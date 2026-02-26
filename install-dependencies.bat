@echo off
echo ========================================
echo WhatsApp Bulk Sender - Dependency Installer
echo ========================================
echo.

echo This will install all required dependencies for QR code functionality.
echo.
pause

echo [1/3] Checking Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo.

echo [2/3] Installing WhatsApp Web.js and dependencies...
echo This may take 5-10 minutes (downloading Chromium)...
echo.
call npm install whatsapp-web.js qrcode qrcode-terminal
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Installation failed!
    echo.
    echo Try manual installation:
    echo npm install whatsapp-web.js
    echo npm install qrcode qrcode-terminal
    pause
    exit /b 1
)
echo.

echo [3/3] Testing WhatsApp connection...
echo.
echo Running standalone test...
echo You should see a QR code in terminal.
echo.
pause
node standalone-whatsapp.js

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Now rebuild the app:
echo npm run build:win
echo.
pause