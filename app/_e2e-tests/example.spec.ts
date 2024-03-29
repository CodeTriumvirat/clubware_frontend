import { test, expect } from '@playwright/test'

test('User can navigate to homepage', async ({ page }) => {
    await page.goto('http://localhost:3010/')
    const welcomeText = page.locator('text="Log dich ein, Habibi!"')
    await expect(welcomeText).toHaveText('Log dich ein, Habibi!')
})

test('User can log in', async ({ page }) => {
    await page.goto('http://localhost:3010/')
    await page.getByPlaceholder('deinemail@example.com').click()
    await page.getByPlaceholder('deinemail@example.com').fill('test@mail.de')
    await page.getByPlaceholder('Dein Passwort').click()
    await page.getByPlaceholder('Dein Passwort').fill('@MeinPasswort1')
    await page.getByRole('button', { name: 'Log in' }).click()
    const welcomeText = page.locator('text="Welcome"')
    await expect(welcomeText).toHaveText('Welcome')
})
