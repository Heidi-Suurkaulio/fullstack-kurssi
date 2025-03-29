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
        await request.post('/api/users', {
            data: {
                name: 'Maija Luukkainen',
                username: 'maija',
                password: 'salasana'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = page.getByText('Log in to application')
        await expect(locator).toBeVisible()
        const fields = page.getByRole('textbox')
        await expect(fields).toHaveCount(2)
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await login(page, 'mluukkai', 'salainen')
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await login(page, 'mluukka', 'väärä')
            const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('Wrong username or password!')
            await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
        })
    })
    
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await login(page, 'maija', 'salasana')
            await addBlog(page, 'Maijas Blog', 'Maija Luukkainen', '3')
            await addBlog(page, 'Second Blog', 'Maija Luukkainen', '2')
            await page.getByRole('button', {name: 'Log Out'}).click()
            await login(page, 'mluukkai', 'salainen')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await addBlog(page, 'TestBlog', 'Test Author')
            await expect(page.getByText('TestBlog Test Author')).toBeVisible()
        })

        test('created blog can be liked', async ({ page }) => {
            await addBlog(page, 'TestBlog', 'Test Author')
            await expect(page.getByText('TestBlog Test Author')).toBeVisible()
            await page.getByRole('button', {name: 'Show Details'}).last().click()
            const likeItem = page.getByRole('listitem').filter({ hasText: 'likes' })
            await expect(likeItem).toContainText('0')
            await likeItem.getByRole('button', {name:'like'}).click()
            await expect(likeItem).toContainText('1')
        })

        test('created blog can be removed', async ({ page }) => {
            await addBlog(page, 'TestBlog', 'Test Author')
            await expect(page.getByText('TestBlog Test Author')).toBeVisible()
            await page.getByRole('button', {name: 'Show Details'}).last().click()
            
            await expect(page.getByRole('button', {name: 'Delete'})).toBeVisible()
            const deleteButton = page.getByRole('button', {name: 'Delete'})

            page.on('dialog', async dialog => await dialog.accept())
            await deleteButton.click()
            const notification = page.locator('.notification')
            await expect(notification).toContainText('Removed TestBlog')
        })

        test('delete button is visible only for the user who created the blog', async ({page}) => {
            await page.getByRole('button', {name: 'Show Details'}).first().click()
            expect(page.getByRole('listitem').last()).toContainText('Maija Luukkainen')
            await expect(page.getByRole('button', {name: 'Delete'})).not.toBeVisible()
        })
      })
})