Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap(800, 450)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::FromArgb(15, 23, 42))

# Gold accent rectangle
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 255, 204, 0), 2)
$g.DrawRectangle($pen, 20, 20, 760, 410)

# Center text
$font = New-Object System.Drawing.Font("Segoe UI", 20, [System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(120, 255, 204, 0))
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center
$rect = New-Object System.Drawing.RectangleF(0, 0, 800, 450)
$g.DrawString("Project Preview", $font, $brush, $rect, $sf)

$bmp.Save("D:\portfolio-website\public\images\projects\placeholder.webp", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
Write-Host "Placeholder image created"
