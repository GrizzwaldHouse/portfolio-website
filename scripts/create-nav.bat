@echo off
echo Creating nav component...

REM Create directory structure
if not exist "src\components\ui" mkdir src\components\ui

REM Create nav.tsx
(
echo 'use client';
echo.
echo import Link from 'next/link';
echo import { usePathname } from 'next/navigation';
echo.
echo export function MainNav^(^) {
echo   const pathname = usePathname^(^);
echo.
echo   const navItems = [
echo     { href: '/', label: 'Home' },
echo     { href: '/projects', label: 'Projects' },
echo     { href: '/about', label: 'About' },
echo     { href: '/contact', label: 'Contact' },
echo   ];
echo.
echo   return ^(
echo     ^<nav className="flex gap-6"^>
echo       {navItems.map^(^(item^) =^> ^(
echo         ^<Link
echo           key={item.href}
echo           href={item.href}
echo           className={`text-sm font-medium transition-colors hover:text-primary ${
echo             pathname === item.href
echo               ? 'text-foreground'
echo               : 'text-muted-foreground'
echo           }`}
echo         ^>
echo           {item.label}
echo         ^</Link^>
echo       ^)^)}
echo     ^</nav^>
echo   ^);
echo }
) > src\components\ui\nav.tsx

echo.
echo nav.tsx created successfully!
echo Location: src\components\ui\nav.tsx
echo.
pause