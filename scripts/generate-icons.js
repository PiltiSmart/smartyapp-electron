const fs = require('fs-extra');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');
const icnsConverter = require('@fiahfy/icns-converter');

const INPUT_ICON = 'build/icon.png';
const OUTPUT_DIR = 'build';

async function generate() {
  if (!fs.existsSync(INPUT_ICON)) {
    console.error('❌ icon.png not found in build directory.');
    process.exit(1);
  }

  await fs.ensureDir(OUTPUT_DIR);

  // Create Windows .ico
  console.log('🔧 Generating icon.ico for Windows...');
  const icoBuffer = await pngToIco(INPUT_ICON);
  await fs.writeFile(`${OUTPUT_DIR}/icon.ico`, icoBuffer);

  // Create macOS .icns
  console.log('🔧 Generating icon.icns for macOS...');
  await icnsConverter.convert(INPUT_ICON, `${OUTPUT_DIR}/icon.icns`);

  // Create resized PNGs (optional for Linux)
  const sizes = [16, 32, 48, 64, 128, 256, 512];
  console.log('🔧 Generating resized PNGs...');
  for (const size of sizes) {
    const outPath = `${OUTPUT_DIR}/icon_${size}x${size}.png`;
    await sharp(INPUT_ICON)
      .resize(size, size)
      .toFile(outPath);
  }

  console.log('✅ All icons generated.');
}

generate().catch(err => {
  console.error('❌ Icon generation failed:', err);
  process.exit(1);
});
