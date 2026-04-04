#!/bin/bash

FAVICON="public/favicon.svg"
FAVICON_SQUARE="public/favicon-square.svg"

# Generate an ico file for legacy browsers
magick -background none "${FAVICON}" -define icon:auto-resize=16,32,48 'public/favicon.ico'

# Create icons if page is saved to mobile screens
magick -background none -size 192x192 "${FAVICON_SQUARE}" 'public/thayen-dev-192.png'
magick -background none -size 384x384 "${FAVICON_SQUARE}" 'public/thayen-dev-384.png'
magick -background none -size 512x512 "${FAVICON_SQUARE}" 'public/thayen-dev-512.png'
magick -background none -size 1024x1024 "${FAVICON_SQUARE}" 'public/thayen-dev-1024.png'
