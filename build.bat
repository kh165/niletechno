@echo off
cd /d "%~dp0"
echo === 1/3 Fixing imports ===
node fix-imports.mjs
echo === 2/3 Installing ===
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
call npm install
echo === 3/3 Building ===
call npm run build
echo.
echo Done. Open dist\index.html by double click.
pause