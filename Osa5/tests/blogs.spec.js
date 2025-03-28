const { test, expect, beforeEach, describe } = require('@playwright/test')
const {login} = require('./functions')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luukkainen',
                username: 'mluukkai',
                password: 'salainen'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByText('Log in to application')
        await expect(locator).toBeVisible()
        const fields = await page.getByRole('textbox')
        await expect(fields).toHaveCount(2)
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await login(page, 'mluukkai', 'salainen')
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await login(page, 'mluukka', 'väärä')
            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('Wrong username or password!')
            await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
        })
    })
    
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'mluukkai', 'salainen')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'Add New Blog' }).click()

            await page.getByTestId('title').fill('TestBlog')
            await page.getByTestId('author').fill('Test Author')
            await page.getByPlaceholder('https://').fill('https://www.example.com')
            await page.getByTestId('likes').fill('2')
            await page.getByRole('button', {name: 'Add' }).click()
            await expect(page.getByText('TestBlog Test Author')).toBeVisible()
        })
      })
})