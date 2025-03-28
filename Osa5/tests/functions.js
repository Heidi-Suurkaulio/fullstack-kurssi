const login = async (page, username, password) => {
    await page.getByRole('textbox').first().fill(username)
    await page.getByRole('textbox').last().fill(password)
    await page.getByRole('button', { name: 'Log In' }).click()
}

export {login}