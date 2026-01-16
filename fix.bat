@echo off
echo Fixing portfolio website...

echo Step 1: Cleaning...
rmdir /s /q .next 2>nul
rmdir /s /q node_modules 2>nul
del package-lock.json 2>nul
del postcss.config.mjs 2>nul

echo Step 2: Creating folders...
mkdir src\components\ui 2>nul

echo Step 3: Installing packages...
call npm install
call npm install -D tailwindcss@next @tailwindcss/postcss autoprefixer

echo.
echo DONE! Make sure nav.tsx is in src\components\ui\
echo Then run: npm run dev
pause