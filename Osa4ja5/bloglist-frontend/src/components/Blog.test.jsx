import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Component <Blog />', () => {
  const mockFn = vi.fn()

  const user = {
    id: '12345',
    name: 'Test User'
  }

  const blg = {
    title: 'Test blog title',
    author: 'Test Author',
    url: 'www.example.com',
    user: user,
    likes: 0
  }

  let container
  beforeEach(() => {
    container = render(<Blog blog={blg} userId='12345'
      increaseLikes={mockFn} removeBlog={mockFn}/>).container
  })

  test('renders two titles', () => {
    const titles = screen.getAllByText('Test blog title')
    expect(titles.length).toEqual(2)
  })

  test('after clicking the button details clss is visible', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show Details')
    await user.click(button)

    const div = container.querySelector('.details')
    expect(div).toHaveStyle('display: block')
    expect(div).toHaveTextContent('www.example.com','likes', 'Test User')
  })

  test('if like button is clicked twice, mock function is called twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Like')
    await user.dblClick(button)
    expect(mockFn.mock.calls).toHaveLength(2)
  })
})