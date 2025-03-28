const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, addBlog } = require('./functions')

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
            await addBlog(page, 'TestBlog', 'Test Author')
            await expect(page.getByText('TestBlog Test Author')).toBeVisible()
        })

        test('created blog can be liked', async ({ page }) => {
            await addBlog(page, 'TestBlog', 'Test Author')
            await page.getByRole('button', {name: 'Show Details'}).first().click()
            const likeItem = await page.getByRole('listitem').filter({ hasText: 'likes' })
            await expect(likeItem).toContainText('0')
            await likeItem.getByRole('button', {name:'like'}).click()
            await expect(likeItem).toContainText('1')
        })
      })
})