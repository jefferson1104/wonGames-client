import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameInfo from '.'

const props = {
  title: 'My Game Title',
  description: 'Game Description',
  price: '210,00'
}

describe('GameInfo component', () => {
  it('should render game informations', () => {
    renderWithTheme(<GameInfo {...props} />)

    const title = screen.getByRole('heading', { name: /my game title/i })
    const description = screen.getByText(/game description/i)
    const price = screen.getByText(/\$210,00/i)

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(price).toBeInTheDocument()
  })

  it('should render buttons', () => {
    renderWithTheme(<GameInfo {...props} />)

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    const wishlistButton = screen.getByRole('button', { name: /wishlist/i })

    expect(addToCartButton).toBeInTheDocument()
    expect(wishlistButton).toBeInTheDocument()
  })
})
