import { render, screen } from 'utils/test-utils'

import Empty from '.'

const propsMock = {
  title: 'A simple title',
  description: 'A simple description'
}

describe('Empty component', () => {
  it('should render correctly', () => {
    const { container } = render(<Empty {...propsMock} hasLink />)

    const image = screen.getByRole('image', {
      name: /a gamer in a couch playing videogame/i
    })
    const title = screen.getByRole('heading', { name: /a simple title/i })
    const description = screen.getByText(/a simple description/i)
    const link = screen.getByRole('link', { name: /go back to store/i })

    expect(image).toBeInTheDocument()
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')

    expect(container.parentElement).toMatchSnapshot()
  })

  it('should not render link when hasLink not passed', () => {
    render(<Empty {...propsMock} />)

    const link = screen.queryByRole('link', { name: /go back to store/i })

    expect(link).not.toBeInTheDocument()
  })
})
