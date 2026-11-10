#!/bin/bash
# Compress reflect.app clone media assets: 56MB -> target < 8MB
set -e
VID=/home/z/my-project/public/reflect/videos
IMG=/home/z/my-project/public/reflect/images

# --- Videos: VP9 WebM, no audio for background loops ---
# 2nd-page (portrait radar tunnel 1080x1920) -> 720x1280
ffmpeg -y -i "$VID/2nd-page-video.mp4" -vf "scale=720:1280:flags=lanczos" \
  -c:v libvpx-vp9 -crf 40 -b:v 0 -an -r 24 -deadline good -cpu-used 4 -row-mt 1 -threads 4 \
  "$VID/2nd-page-video.webm" 2>/dev/null &

# 4rd-page (globe 1920x1080) -> 1280x720
ffmpeg -y -i "$VID/4rd-page-video.mp4" -vf "scale=1280:720:flags=lanczos" \
  -c:v libvpx-vp9 -crf 40 -b:v 0 -an -r 24 -deadline good -cpu-used 4 -row-mt 1 -threads 4 \
  "$VID/4rd-page-video.webm" 2>/dev/null &

# click-video (demo, HAS audio, 60fps) -> 1280x720 @30fps, keep audio as opus
ffmpeg -y -i "$VID/click-video.mp4" -vf "scale=1280:720:flags=lanczos" \
  -c:v libvpx-vp9 -crf 38 -b:v 0 -r 30 -deadline good -cpu-used 4 -row-mt 1 -threads 4 \
  -c:a libopus -b:a 96k \
  "$VID/click-video.webm" 2>/dev/null &

# 1st-page hero black hole: 4K -> 1080p for fast decode
ffmpeg -y -i "$VID/1st-page-video.webm" -vf "scale=1920:-2:flags=lanczos" \
  -c:v libvpx-vp9 -crf 36 -b:v 0 -an -deadline good -cpu-used 4 -row-mt 1 -threads 4 \
  "$VID/1st-page-video-1080.webm" 2>/dev/null &

wait
echo "--- videos done ---"
ls -la "$VID"

# --- Images via sharp ---
cd /home/z/my-project
node -e "
const sharp = require('sharp');
(async () => {
  await sharp('$IMG/Backgorund.png').webp({ quality: 80, effort: 6 }).toFile('$IMG/Backgorund.webp');
  await sharp('$IMG/Ist-page-image.png').webp({ quality: 88, effort: 6 }).toFile('$IMG/Ist-page-image.webp');
  console.log('images done');
})().catch(e => { console.error(e); process.exit(1); });
"
ls -la "$IMG"
echo "=== TOTAL SIZES ==="
du -sh "$VID" "$IMG"
