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
"${cmd}" -background none "${FAVICON}" -define icon:auto-resize=16,32,48 'public/favicon.ico'

# Create icons if page is saved to mobile screens
for size in 180 192 384 512 1024; do
    "${cmd}" -background none -size "${size}x${size}" "${FAVICON_SQUARE}" "public/portfolio-icon-${size}.png"
done
