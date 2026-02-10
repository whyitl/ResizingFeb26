import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  try {
    // Hard refresh - clear cache and reload
    await page.goto('http://localhost:4322/', { 
      waitUntil: 'networkidle2',
      // Force hard reload by setting cache to 'reload'
    });
    
    // Reload the page to simulate hard refresh
    await page.reload({ waitUntil: 'networkidle2' });
    
    // Wait a bit more to ensure everything is rendered
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take screenshot
    await page.screenshot({ path: 'page-screenshot.png', fullPage: false });
    console.log('Screenshot saved to page-screenshot.png');
    
    // First, let's see what's actually on the page
    const pageContent = await page.evaluate(() => {
      return {
        bodyHTML: document.body.innerHTML.substring(0, 2000),
        allClasses: Array.from(document.querySelectorAll('[class]')).map(el => el.className).slice(0, 20)
      };
    });
    
    console.log('\n=== PAGE DEBUG ===');
    console.log('Classes found:', pageContent.allClasses);
    
    // Measure element positions
    const measurements = await page.evaluate(() => {
      const logoText = document.querySelector('.logo-text');
      const headerBrand = document.querySelector('.header-brand');
      const verticalNav = document.querySelector('.vertical-nav');
      const servicesLink = document.querySelector('.nav-item'); // First nav-item is Services
      const pageLayout = document.querySelector('.page-layout');
      
      const getBoundingRect = (el) => {
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          left: rect.left,
          right: rect.right,
          top: rect.top,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height
        };
      };
      
      const getComputedStyles = (el, props) => {
        if (!el) return null;
        const computed = window.getComputedStyle(el);
        const result = {};
        props.forEach(prop => {
          result[prop] = computed[prop];
        });
        return result;
      };
      
      // Calculate distances
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      return {
        viewport: { width: viewportWidth, height: viewportHeight },
        logoText: {
          rect: getBoundingRect(logoText),
          computedStyles: getComputedStyles(logoText, [
            'font-size', 'font-weight', 'letter-spacing', 'line-height',
            'text-indent', 'padding', 'margin'
          ]),
          text: logoText?.textContent
        },
        headerBrand: {
          rect: getBoundingRect(headerBrand),
          computedStyles: getComputedStyles(headerBrand, [
            'margin', 'margin-bottom', 'margin-top', 'padding'
          ]),
          text: headerBrand?.textContent
        },
        pageLayout: {
          rect: getBoundingRect(pageLayout),
          computedStyles: getComputedStyles(pageLayout, [
            'padding', 'padding-left', 'padding-right', 'padding-top', 'padding-bottom'
          ])
        },
        verticalNav: {
          rect: getBoundingRect(verticalNav),
          computedStyles: getComputedStyles(verticalNav, [
            'position', 'top', 'right', 'display', 'gap'
          ])
        },
        servicesLink: {
          rect: getBoundingRect(servicesLink),
          computedStyles: getComputedStyles(servicesLink, [
            'font-size', 'font-weight', 'padding', 'margin'
          ]),
          text: servicesLink?.textContent
        }
      };
    });
    
    console.log('\n=== VIEWPORT ===');
    console.log(`Width: ${measurements.viewport.width}px`);
    console.log(`Height: ${measurements.viewport.height}px`);
    
    console.log('\n=== PAGE LAYOUT CONTAINER ===');
    console.log(`Bounding rect:`, measurements.pageLayout.rect);
    console.log(`Computed styles:`, measurements.pageLayout.computedStyles);
    
    console.log('\n=== LOGO TEXT ("Resizing") ===');
    if (measurements.logoText.rect) {
      const distanceFromLeft = measurements.logoText.rect.left;
      console.log(`Distance from left edge to "R" in "Resizing": ${distanceFromLeft.toFixed(2)}px`);
      console.log(`Bounding rect:`, measurements.logoText.rect);
      console.log(`Computed styles:`, measurements.logoText.computedStyles);
      console.log(`Text content: "${measurements.logoText.text}"`);
    }
    
    console.log('\n=== HEADER BRAND CONTAINER ===');
    console.log(`Bounding rect:`, measurements.headerBrand.rect);
    console.log(`Computed styles:`, measurements.headerBrand.computedStyles);
    
    console.log('\n=== VERTICAL NAV ===');
    console.log(`Bounding rect:`, measurements.verticalNav.rect);
    console.log(`Computed styles:`, measurements.verticalNav.computedStyles);
    
    console.log('\n=== SERVICES LINK ===');
    if (measurements.servicesLink.rect) {
      const distanceFromRight = measurements.viewport.width - measurements.servicesLink.rect.right;
      console.log(`Distance from right edge to end of "Services": ${distanceFromRight.toFixed(2)}px`);
      console.log(`Bounding rect:`, measurements.servicesLink.rect);
      console.log(`Computed styles:`, measurements.servicesLink.computedStyles);
      console.log(`Text content: "${measurements.servicesLink.text}"`);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
