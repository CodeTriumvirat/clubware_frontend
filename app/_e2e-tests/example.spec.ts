import { test, expect } from '@playwright/test'

test('User can navigate to homepage', async ({ page }) => {
    await page.goto('http://localhost:3000/')
    const welcomeText = page.locator('text="Welcome to Clubware"')
    await expect(welcomeText).toHaveText('Welcome to Clubware')
})
