import { chromium } from 'playwright';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORYBOOK_URL = 'http://localhost:6006';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

// Component list with their first available story names
const components = [
  { name: 'Accordion', story: 'default' },
  { name: 'Alert', story: 'default' },
  { name: 'AppBar', story: 'default' },
  { name: 'Autocomplete', story: 'combo-box' },
  { name: 'Avatar', story: 'default' },
  { name: 'Backdrop', story: 'default' },
  { name: 'Badge', story: 'default' },
  { name: 'BottomNavigation', story: 'default' },
  { name: 'Box', story: 'default' },
  { name: 'Breadcrumbs', story: 'default' },
  { name: 'Button', story: 'default' },
  { name: 'ButtonGroup', story: 'default' },
  { name: 'Card', story: 'default' },
  { name: 'Checkbox', story: 'default' },
  { name: 'Chip', story: 'default' },
  { name: 'CircularProgress', story: 'default' },
  { name: 'Container', story: 'default' },
  { name: 'Dialog', story: 'default' },
  { name: 'Divider', story: 'default' },
  { name: 'Drawer', story: 'default' },
  { name: 'FloatingActionButton', story: 'default' },
  { name: 'Grid', story: 'default' },
  { name: 'Icon', story: 'default' },
  { name: 'ImageList', story: 'default' },
  { name: 'Link', story: 'default' },
  { name: 'List', story: 'default' },
  { name: 'LoadingButton', story: 'default' },
  { name: 'Menu', story: 'default' },
  { name: 'Modal', story: 'default' },
  { name: 'Pagination', story: 'default' },
  { name: 'Paper', story: 'default' },
  { name: 'Popover', story: 'default' },
  { name: 'Progress', story: 'default' },
  { name: 'RadioButton', story: 'default' },
  { name: 'Rating', story: 'default' },
  { name: 'Select', story: 'default' },
  { name: 'Skeleton', story: 'default' },
  { name: 'Slider', story: 'default' },
  { name: 'Snackbar', story: 'default' },
  { name: 'SpeedDial', story: 'default' },
  { name: 'Stack', story: 'default' },
  { name: 'Stepper', story: 'default' },
  { name: 'Switch', story: 'default' },
  { name: 'Table', story: 'basic-table' },
  { name: 'Tabs', story: 'default' },
  { name: 'TextField', story: 'default' },
  { name: 'Timeline', story: 'default', path: 'data-display-timeline' },
  { name: 'ToggleButton', story: 'default' },
  { name: 'Tooltip', story: 'default' },
  { name: 'Transitions', story: 'default' },
  { name: 'Typography', story: 'default' },
];

async function captureComponent(page, component) {
  console.log(`📸 ${component.name}...`);

  const storyPath = component.path || `components-${component.name.toLowerCase()}`;
  const url = `${STORYBOOK_URL}/?path=/story/${storyPath}--${component.story}`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(1500);

    // Check for error messages
    const errorElement = await page.locator('text=/Couldn\'t find story/i').first();
    const hasError = await errorElement.isVisible().catch(() => false);

    if (hasError) {
      console.log(`  ⚠️  Story not found - checking alternatives`);
      return { component: component.name, status: 'story_not_found', url };
    }

    // Get canvas iframe
    const canvasFrame = page.frameLocator('iframe[title="storybook-preview-iframe"]');
    const canvas = canvasFrame.locator('#storybook-root');

    // Wait for content to load
    await canvas.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

    // Capture screenshot
    const screenshotPath = path.join(SCREENSHOT_DIR, `${component.name}_light.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: true
    });

    // Get canvas dimensions to check for overflow
    const canvasBounds = await canvas.boundingBox().catch(() => null);

    console.log(`  ✅ Captured`);
    return {
      component: component.name,
      status: 'success',
      url,
      canvasSize: canvasBounds
    };
  } catch (error) {
    console.error(`  ❌ Error: ${error.message}`);
    return {
      component: component.name,
      status: 'error',
      error: error.message,
      url
    };
  }
}

async function main() {
  await fs.mkdir(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1400, height: 900 }
  });

  console.log('🚀 Starting comprehensive visual audit...\n');

  const results = [];

  for (const component of components) {
    const result = await captureComponent(page, component);
    results.push(result);
  }

  await fs.writeFile(
    path.join(__dirname, 'comprehensive-audit-results.json'),
    JSON.stringify(results, null, 2)
  );

  const summary = {
    total: results.length,
    success: results.filter(r => r.status === 'success').length,
    errors: results.filter(r => r.status === 'error').length,
    notFound: results.filter(r => r.status === 'story_not_found').length
  };

  console.log('\n' + '='.repeat(50));
  console.log('AUDIT SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total components: ${summary.total}`);
  console.log(`✅ Success: ${summary.success}`);
  console.log(`❌ Errors: ${summary.errors}`);
  console.log(`⚠️  Story not found: ${summary.notFound}`);
  console.log('='.repeat(50));
  console.log(`\n📁 Screenshots: ${SCREENSHOT_DIR}`);
  console.log(`📄 Results: ${path.join(__dirname, 'comprehensive-audit-results.json')}`);

  await browser.close();
}

main().catch(console.error);
