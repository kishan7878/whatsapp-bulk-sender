@echo off
echo ========================================
echo WhatsApp Bulk Sender - Windows Builder
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [1/4] Checking Node.js version...
node --version
echo.

echo [2/4] Installing dependencies...
echo This may take 2-3 minutes...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo.

echo [3/4] Building Windows installer...
echo This may take 5-10 minutes...
call npm run build:win
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo.

echo [4/4] Build Complete!
echo.
echo ========================================
echo SUCCESS! Your installer is ready!
echo ========================================
echo.
echo Location: dist\WhatsApp Bulk Sender Setup 1.0.0.exe
echo.
echo You can now:
echo 1. Install the app by running the .exe file
echo 2. Share the installer with others
echo.
pause