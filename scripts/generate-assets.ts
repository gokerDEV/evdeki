import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ASSETS_DIR = join(process.cwd(), "assets");
const PUBLIC_DIR = join(process.cwd(), "public");

async function generateAssets() {
  console.log("Generating assets from assets using sharp...");

  // Ensure public directory exists
  if (!existsSync(PUBLIC_DIR)) {
    mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  const assetMapping: {
    src: string;
    dest: string;
    size?: number;
    width?: number;
    height?: number;
    copyOnly?: boolean;
  }[] = [
    { src: "favicon.svg", dest: "favicon.ico", size: 32 },
    { src: "icon.svg", dest: "icon.png", size: 512 },
    { src: "icon.svg", dest: "apple-icon.png", size: 180 },
    {
      src: "og-image.svg",
      dest: "opengraph-image.png",
      width: 1200,
      height: 630,
    },
    { src: "logo.svg", dest: "logo.svg", copyOnly: true },
    { src: "logotype.svg", dest: "logotype.svg", copyOnly: true },
  ];

  for (const asset of assetMapping) {
    const srcPath = join(ASSETS_DIR, asset.src);
    const destPath = join(PUBLIC_DIR, asset.dest);

    if (existsSync(srcPath)) {
      try {
        if (asset.copyOnly) {
          copyFileSync(srcPath, destPath);
        } else if (asset.width && asset.height) {
          await sharp(srcPath)
            .resize(asset.width, asset.height, {
              fit: "contain",
              background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
            .toFile(destPath);
        } else if (asset.size) {
          await sharp(srcPath)
            .resize(asset.size, asset.size, {
              fit: "contain",
              background: { r: 0, g: 0, b: 0, alpha: 0 },
            })
            .toFile(destPath);
        }
        console.log(`✅ Generated ${asset.src} -> public/${asset.dest}`);
      } catch (error) {
        console.error(`❌ Error generating ${asset.dest}:`, error);
      }
    } else {
      console.warn(`⚠️ Warning: ${asset.src} not found in assets/.`);
    }
  }

  console.log("Asset generation complete.");
}

generateAssets();
