#!/bin/bash
set -e

cmd=""
if command -v magick &> /dev/null; then
    cmd='magick'
elif command -v convert &> /dev/null; then
    cmd='convert'
else
    echo "ImageMagick cannot be found" >&2
    exit 1;
fi

FAVICON="public/favicon.svg"
FAVICON_SQUARE="public/favicon-square.svg"

# Generate an ico file for legacy browsers
${cmd} -background none "${FAVICON}" -define icon:auto-resize=16,32,48 'public/favicon.ico'

# Create icons if page is saved to mobile screens
${cmd} -background none -size 180x180 "${FAVICON_SQUARE}" 'public/thayen-dev-180.png'
${cmd} -background none -size 192x192 "${FAVICON_SQUARE}" 'public/thayen-dev-192.png'
${cmd} -background none -size 384x384 "${FAVICON_SQUARE}" 'public/thayen-dev-384.png'
${cmd} -background none -size 512x512 "${FAVICON_SQUARE}" 'public/thayen-dev-512.png'
${cmd} -background none -size 1024x1024 "${FAVICON_SQUARE}" 'public/thayen-dev-1024.png'
