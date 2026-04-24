param(
  [int]$TargetWidth = 576,
  [int]$TargetHeight = 768,
  [double]$Zoom = 1.25,
  [string]$SourceDir = (Join-Path $PSScriptRoot '..\public\developer_photos')
)

Add-Type -AssemblyName System.Drawing

$resolvedSourceDir = Resolve-Path $SourceDir
$files = Get-ChildItem -Path $resolvedSourceDir -Filter *.png -File

foreach ($file in $files) {
  $sourceImage = [System.Drawing.Image]::FromFile($file.FullName)
  try {
    $sourceRatio = [double]$sourceImage.Width / [double]$sourceImage.Height
    $targetRatio = [double]$TargetWidth / [double]$TargetHeight

    if ($sourceRatio -gt $targetRatio) {
      $cropWidth = [Math]::Round($sourceImage.Height * $targetRatio)
      $cropHeight = $sourceImage.Height
      $cropX = [Math]::Floor(($sourceImage.Width - $cropWidth) / 2)
      $cropY = 0
    }
    else {
      $cropWidth = $sourceImage.Width
      $cropHeight = [Math]::Round($sourceImage.Width / $targetRatio)
      $cropX = 0
      $cropY = [Math]::Floor(($sourceImage.Height - $cropHeight) / 2)
    }

    # Apply extra crop so same-aspect images still get tighter framing.
    # Keep horizontal centering, but preserve the original image bottom.
    $zoomedCropWidth = [Math]::Round($cropWidth / $Zoom)
    $zoomedCropHeight = [Math]::Round($cropHeight / $Zoom)
    $zoomedCropX = $cropX + [Math]::Floor(($cropWidth - $zoomedCropWidth) / 2)
    $zoomedCropY = $cropY + ($cropHeight - $zoomedCropHeight)

    if ($zoomedCropWidth -lt 1) { $zoomedCropWidth = 1 }
    if ($zoomedCropHeight -lt 1) { $zoomedCropHeight = 1 }

    if ($zoomedCropX -lt 0) { $zoomedCropX = 0 }
    if ($zoomedCropY -lt 0) { $zoomedCropY = 0 }
    if (($zoomedCropX + $zoomedCropWidth) -gt $sourceImage.Width) {
      $zoomedCropX = $sourceImage.Width - $zoomedCropWidth
    }
    if (($zoomedCropY + $zoomedCropHeight) -gt $sourceImage.Height) {
      $zoomedCropY = $sourceImage.Height - $zoomedCropHeight
    }

    $cropRect = New-Object System.Drawing.Rectangle($zoomedCropX, $zoomedCropY, $zoomedCropWidth, $zoomedCropHeight)
    $targetBitmap = New-Object System.Drawing.Bitmap($TargetWidth, $TargetHeight)
    $tempPath = [System.IO.Path]::ChangeExtension($file.FullName, '.cropped.png')

    try {
      $graphics = [System.Drawing.Graphics]::FromImage($targetBitmap)
      try {
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($sourceImage, (New-Object System.Drawing.Rectangle(0, 0, $TargetWidth, $TargetHeight)), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
      }
      finally {
        $graphics.Dispose()
      }

      $targetBitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
      $targetBitmap.Dispose()
    }
  }
  finally {
    $sourceImage.Dispose()
  }

  Remove-Item $file.FullName -Force
  Move-Item $tempPath $file.FullName -Force
  Write-Host "Cropped $($file.Name) to ${TargetWidth}x${TargetHeight} (Zoom: $Zoom)"
}
