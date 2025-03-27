const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })

        await page.goto('http://localhost:5173')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
        const fields = await page.getByRole('textbox')
        await expect(fields).toHaveCount(2)
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByRole('textbox').first().fill('mluukkai')
            await page.getByRole('textbox').last().fill('salainen')
            await page.getByRole('button', { name: 'Log In' }).click()

            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('textbox').first().fill('mluukkai')
            await page.getByRole('textbox').last().fill('väärä')
            await page.getByRole('button', { name: 'Log In' }).click()

            await expect(page.getByText('Log in to application')).toBeVisible()
        })
    })
})