import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('Component <Blog />', () => {
  const testFn = () => {
    return 0
  }

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

  render(<Blog blog={blg} userId='12345' increaseLikes={testFn} removeBlog={testFn}/>)

  test('renders two titles', () => {
    const titles = screen.getAllByText('Test blog title')
    expect(titles.length).toEqual(2)
  })
})