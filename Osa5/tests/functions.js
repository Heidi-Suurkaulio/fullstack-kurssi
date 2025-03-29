const login = async (page, username, password) => {
    await page.getByRole('textbox').first().fill(username)
    await page.getByRole('textbox').last().fill(password)
    await page.getByRole('button', { name: 'Log In' }).click()
}

const addBlog = async (page, title, author, likes = '0') => {
    await page.getByRole('button', { name: 'Add New Blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByPlaceholder('https://').fill('https://www.example.com')
    await page.getByTestId('likes').fill(likes)
    await page.getByRole('button', {name: 'Add' }).click()
}

export { login, addBlog }