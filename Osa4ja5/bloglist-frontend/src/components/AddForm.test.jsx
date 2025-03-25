import { render, screen } from '@testing-library/react'
import AddForm from './AddForm'
import userEvent from '@testing-library/user-event'

test('<Add Form /> calls on submit with right parameters', async () => {
  const user = userEvent.setup()
  const addBlog = vi.fn()

  const testObject = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'https://www.example.com',
    likes: 0
  }

  render(<AddForm createBlog={addBlog}/>)

  const inputTitle = screen.getByTestId('title')
  const inputAuthor = screen.getByTestId('author')
  const inputUrl = screen.getByPlaceholderText('https://')
  const inputLikes = screen.getByTestId('likes')
  const button = screen.getByRole('button')

  await user.type(inputTitle, 'Test Title')
  await user.type(inputAuthor, 'Test Author')
  await user.type(inputUrl, 'www.example.com')
  await user.type(inputLikes, '0')
  await user.click(button)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0]).toMatchObject(testObject)
})