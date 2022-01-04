import { fireEvent, screen } from '@testing-library/react'
import theme from 'styles/theme'
import { renderWithTheme } from 'utils/tests/helpers'

import GameCard from '.'

const props = {
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: 'R$ 235,00'
}

describe('GameCard component', () => {
  it('should render correctly', () => {
    renderWithTheme(<GameCard {...props} />)

    const title = screen.getByRole('heading', { name: props.title })
    const developer = screen.getByRole('heading', { name: props.developer })
    const image = screen.getByRole('img', { name: props.title })
    const wishlistIcon = screen.getByLabelText(/add to wishlist/i)

    expect(title).toBeInTheDocument()
    expect(developer).toBeInTheDocument()
    expect(image).toHaveAttribute('src', props.img)
    expect(wishlistIcon).toBeInTheDocument()
  })

  it('should render price in label', () => {
    renderWithTheme(<GameCard {...props} />)

    const price = screen.getByText('R$ 235,00')

    expect(price).not.toHaveStyle({ textDecoration: 'line-through' })
    expect(price).toHaveStyle({ backgroundColor: theme.colors.secondary })
  })

  it('should render a line-through in price when promotional', () => {
    renderWithTheme(<GameCard promotionalPrice="R$ 15,00" {...props} />)

    const price = screen.getByText('R$ 235,00')
    const promotionalPrice = screen.getByText('R$ 15,00')

    expect(price).toHaveStyle({ textDecoration: 'line-through' })
    expect(promotionalPrice).not.toHaveStyle({ textDecoration: 'line-through' })
  })

  it('should render a filled favorite icon when favorite is true', () => {
    renderWithTheme(<GameCard favorite {...props} />)

    const wishlistIcon = screen.getByLabelText(/remove from wishlist/i)

    expect(wishlistIcon).toBeInTheDocument()
  })

  it('should call onFav method when favorite is clicked', () => {
    const onFav = jest.fn()

    renderWithTheme(<GameCard favorite onFav={onFav} {...props} />)

    const wishlistIcon = screen.getAllByRole('button')[0]

    fireEvent.click(wishlistIcon)

    expect(onFav).toBeCalled()
  })

  it('should render Ribbon', () => {
    renderWithTheme(
      <GameCard
        {...props}
        ribbon="My Ribbon"
        ribbonColor="secondary"
        ribbonSize="small"
      />
    )

    const ribbon = screen.getByText(/my ribbon/i)

    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' })
    expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' })
    expect(ribbon).toBeInTheDocument()
  })
})