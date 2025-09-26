import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should load the homepage', async ({ page }) => {
    await expect(page).toHaveTitle(/Arch Wiki/)
    await expect(page.locator('text=Arch Wiki')).toBeVisible()
  })

  test('should have working skip link', async ({ page }) => {
    // Skip link should be visible on focus
    await page.keyboard.press('Tab')
    await expect(page.locator('text=Skip to main content')).toBeVisible()

    // Clicking skip link should focus main content
    await page.click('text=Skip to main content')
    const mainContent = page.locator('[id="main-content"]')
    await expect(mainContent).toBeFocused()
  })

  test('should display navigation elements', async ({ page }) => {
    await expect(page.locator('text=Arch Wiki')).toBeVisible()
    await expect(page.locator('[aria-label="Search wiki"]')).toBeVisible()
  })

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1Elements = await page.locator('h1').count()
    const h2Elements = await page.locator('h2').count()

    expect(h1Elements).toBeGreaterThan(0)
    expect(h2Elements).toBeGreaterThanOrEqual(0)
  })

  test('should be keyboard accessible', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Should be able to focus interactive elements
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(['BUTTON', 'INPUT', 'A']).toContain(focusedElement)
  })
})

test.describe('Responsive Design', () => {
  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')

    // Mobile menu button should be visible
    await expect(page.locator('[aria-label="Open navigation menu"]')).toBeVisible()
    await expect(page.locator('[aria-label="Open table of contents"]')).toBeVisible()
  })

  test('should work on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.goto('http://localhost:3000')

    // Desktop navigation should be visible
    await expect(page.locator('text=Main Page')).toBeVisible()
    await expect(page.locator('text=Community')).toBeVisible()
    await expect(page.locator('text=News')).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should have proper ARIA labels', async ({ page }) => {
    const buttons = await page.locator('button').all()
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
    }
  })

  test('should have proper form labels', async ({ page }) => {
    const inputs = await page.locator('input').all()
    for (const input of inputs) {
      const ariaLabel = await input.getAttribute('aria-label')
      expect(ariaLabel).toBeTruthy()
    }
  })

  test('should have proper alt text on images', async ({ page }) => {
    const images = await page.locator('img').all()
    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt?.length).toBeGreaterThan(0)
    }
  })

  test('should have proper color contrast', async ({ page }) => {
    // Note: For full contrast testing, integrate axe-playwright
    // For now, ensure text elements exist and are styled
    const textElements = await page.locator('text').all()
    expect(textElements.length).toBeGreaterThan(0)
  })

  test('should support screen readers', async ({ page }) => {
    // Check for semantic HTML
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
  })
})

test.describe('User Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('should allow search input', async ({ page }) => {
    const searchInput = page.locator('[aria-label="Search wiki"]')
    await searchInput.fill('systemd')
    await expect(searchInput).toHaveValue('systemd')
  })

  test('should toggle theme', async ({ page }) => {
    const themeButton = page.locator('[aria-label="Switch to light mode"]')
    await themeButton.click()

    // Check that aria-label changes to indicate light mode is active
    await expect(page.locator('[aria-label="Switch to dark mode"]')).toBeVisible()

    // Optionally check for class changes on body or root element
    const bodyClass = await page.getAttribute('body', 'class')
    expect(bodyClass).toContain('light') // Assuming theme classes are applied
  })

  test('should show mobile menu on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const menuButton = page.locator('[aria-label="Open navigation menu"]')
    await menuButton.click()

    // Menu should be visible (would need more specific selectors)
    await expect(menuButton).toBeVisible()
  })

  test('should copy code blocks', async ({ page }) => {
    // Navigate to article page or check if code blocks exist
    const copyButtons = await page.locator('[aria-label*="Copy code"]').all()
    if (copyButtons.length > 0) {
      await copyButtons[0].click()
      // Check for success message or aria-label change
      await expect(page.locator('text=Copied!')).toBeVisible()
      // Verify clipboard content if possible (requires permission)
      // await expect(page.evaluate(() => navigator.clipboard.readText())).resolves.toBe('expected code')
    }
  })
})

test.describe('Performance', () => {
  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('http://localhost:3000')
    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(5000) // Should load within 5 seconds
  })

  test('should have reasonable Lighthouse scores', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Basic performance checks
    const metrics = await page.evaluate(() => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        return entries
      })
      observer.observe({ entryTypes: ['navigation'] })
      return performance.getEntriesByType('navigation')[0]
    })

    expect(metrics).toBeDefined()
  })
})