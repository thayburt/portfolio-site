// image-gen-integration.js
import { execSync } from 'child_process';

export default function generateAssets() {
  return {
    name: 'generate-assets',
    hooks: {
      'astro:config:setup': () => {
        console.log('Generating images from SVGs...');
        execSync('./scripts/mkicons.sh', { stdio: 'inherit' });
      },
    },
  };
}
