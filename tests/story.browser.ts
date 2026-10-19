import { test, expect } from '@playwright/test';

for (const width of [320,390,768,1024,1440]) for (const colorScheme of ['light','dark'] as const) {
  test(`${width}px ${colorScheme}: chapter journey, menu keyboard, map, sources`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme, reducedMotion: 'reduce' });
    const errors: string[] = [];
    const external: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.route('**/*', route => {
      if (new URL(route.request().url()).hostname === '127.0.0.1') return route.continue();
      external.push(route.request().url()); return route.abort();
    });
    await page.goto('/');
    await expect(page.getByRole('heading', { level:1 })).toHaveText('The price of a familiar meal');
    await page.evaluate(() => document.fonts.ready);
    expect(await page.locator('body').evaluate(element => getComputedStyle(element).fontFamily)).toMatch(/Geist/);
    expect(await page.locator('.quantity').first().evaluate(element => getComputedStyle(element).fontFamily)).toMatch(/Geist/);
    await page.keyboard.press('Tab'); await expect(page.getByRole('link',{name:'Skip to story'})).toBeFocused();
    await page.keyboard.press('Enter'); await expect(page.locator('#story')).toBeFocused();
    await expect(page.getByRole('button',{name:'Motion off'})).toBeDisabled();
    const mobile = page.locator('.chapter-mobile');
    if (width < 768) { await mobile.locator('summary').focus(); await page.keyboard.press('Enter'); }
    const nav = page.getByRole('navigation',{name:'Chapters'}).filter({visible:true});
    const costLink = nav.getByRole('link',{name:/02.*Costs behind/});
    await costLink.focus();
    expect(await costLink.evaluate(link => getComputedStyle(link).outlineWidth)).toBe('2px');
    expect(await costLink.evaluate(link => link.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#behind-the-counter$/); await expect(page.locator('#behind-the-counter')).toBeFocused();
    await expect(costLink).toHaveAttribute('aria-current','location');
    const continueLink = page.getByRole('link',{name:'Continue to the impossible math'});
    await continueLink.focus(); await page.keyboard.press('Enter');
    await expect(page.locator('#impossible-math')).toBeFocused();
    await expect(page.getByRole('table',{name:'Equivalent cost breakdown'})).toContainText('104%');
    await page.getByRole('link',{name:'References for the cost chapter'}).click();
    await expect(page.locator('#cost-sources')).toBeFocused(); await expect(page).toHaveURL(/#cost-sources$/);
    const slider = page.getByRole('slider',{name:'Compare menus'});
    await slider.focus(); await expect(slider).toBeFocused(); await page.keyboard.press('Home'); await expect(slider).toHaveValue('0');
    await page.keyboard.press('End'); await expect(slider).toHaveValue('100');
    await page.getByRole('button',{name:"Inspect Kent's Kitchen"}).focus(); await page.keyboard.press('Space');
    await expect(page.locator('#restaurant-detail')).toContainText('Recorded closure: 2023');
    await page.getByText('All 5 restaurant records',{exact:true}).click();
    await expect(page.locator('.restaurant-records li')).toHaveCount(5);
    await expect(page.locator('canvas')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);
    const textColors = await page.locator('.story-opening>p').first().evaluate(element => ({
      text: getComputedStyle(element).color, background: getComputedStyle(document.body).backgroundColor,
    }));
    const luminance = (color: string) => {
      const rgb = color.match(/\d+/g)!.slice(0,3).map(Number).map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
      return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
    };
    const levels = [luminance(textColors.text), luminance(textColors.background)].sort((a,b) => b-a);
    expect((levels[0]+.05)/(levels[1]+.05)).toBeGreaterThanOrEqual(4.5);
    expect(external).toEqual([]); expect(errors).toEqual([]);
    await page.evaluate(() => window.scrollTo(0,0));
    await expect(nav.getByRole('link',{name:/01.*familiar meal/})).toHaveAttribute('aria-current','location');
    await page.screenshot({path:testInfo.outputPath(`opening-${width}-${colorScheme}.png`)});
    await page.locator('#impossible-math').scrollIntoViewIfNeeded();
    await page.screenshot({path:testInfo.outputPath(`costs-${width}-${colorScheme}.png`)});
  });
}

test('motion opt-in, live reduced-motion preference, native history and deep links', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'no-preference'}); await page.goto('/#impossible-math');
  await expect(page.getByRole('navigation',{name:'Chapters'}).filter({visible:true}).getByRole('link',{name:/03.*impossible math/})).toHaveAttribute('aria-current','location');
  const toggle = page.getByRole('button',{name:'Motion off'}); await expect(toggle).toBeEnabled();
  await toggle.click(); await expect(page.getByRole('button',{name:'Motion on'})).toHaveAttribute('aria-pressed','true');
  await page.emulateMedia({reducedMotion:'reduce'}); await expect(page.getByRole('button',{name:'Motion off'})).toBeDisabled();
  await expect(page.locator('html')).toHaveAttribute('data-motion','off');
  await page.getByRole('link',{name:'Continue to changing habits'}).click(); await expect(page).toHaveURL(/#changing-habits$/);
  await page.goBack(); await expect(page).toHaveURL(/#impossible-math$/);
  await page.goto('/#%E0%A4%A'); await expect(page.getByRole('heading',{level:1})).toBeVisible();
});

test('image failure leaves price evidence and an honest disabled control', async ({ page }) => {
  await page.route('**/images/menu-2025.svg', route => route.abort()); await page.goto('/');
  await expect(page.getByRole('status').filter({hasText:'Menu image unavailable'})).toBeVisible();
  await expect(page.getByRole('slider')).toBeDisabled();
  await expect(page.getByRole('table').first()).toContainText('$17.00');
});

test('no JavaScript retains the story and native chapter anchors', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled:false, viewport:{width:720,height:450}, deviceScaleFactor:2 });
  const page = await context.newPage(); await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await page.locator('.chapter-mobile summary').click();
  await page.getByRole('navigation',{name:'Chapters'}).filter({visible:true}).getByRole('link',{name:/03.*impossible math/}).click();
  await expect(page).toHaveURL(/#impossible-math$/);
  await expect(page.getByRole('table',{name:'Equivalent cost breakdown'})).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await context.close();
});

test('200% equivalent layout and enlarged body text remain readable', async ({ page }) => {
  // A 1440px viewport at 200% browser zoom has a 720 CSS px layout.
  await page.setViewportSize({width:720,height:450}); await page.goto('/');
  await page.addStyleTag({content:'.story-shell{font-size:32px;line-height:48px}'});
  await page.locator('.chapter-mobile summary').click();
  await page.getByRole('navigation',{name:'Chapters'}).filter({visible:true}).getByRole('link',{name:/03.*impossible math/}).click();
  await expect(page.locator('#impossible-math')).toBeFocused();
  await expect(page.getByRole('table',{name:'Equivalent cost breakdown'})).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('a delayed navigation frame cannot steal focus from the menu slider', async ({ page }) => {
  await page.goto('/');
  const reference = page.getByRole('link', { name: 'References for the cost chapter' });
  await reference.focus();
  // Hold navigation frames to reproduce the hosted focus race deterministically.
  await page.evaluate(() => {
    const nativeFrame = window.requestAnimationFrame;
    const pending: FrameRequestCallback[] = [];
    window.requestAnimationFrame = callback => { pending.push(callback); return pending.length; };
    (window as Window & { flushStoryFrames?: () => void }).flushStoryFrames = () => {
      window.requestAnimationFrame = nativeFrame;
      pending.splice(0).forEach(callback => callback(performance.now()));
    };
  });
  await page.keyboard.press('Enter');
  await expect(page.locator('#cost-sources')).toBeFocused();
  const slider = page.getByRole('slider', { name: 'Compare menus' });
  await slider.focus();
  await page.evaluate(() => (window as Window & { flushStoryFrames?: () => void }).flushStoryFrames?.());
  await expect(slider).toBeFocused();
  await page.keyboard.press('Home');
  await expect(slider).toHaveValue('0');
  await page.keyboard.press('End');
  await expect(slider).toHaveValue('100');
});
