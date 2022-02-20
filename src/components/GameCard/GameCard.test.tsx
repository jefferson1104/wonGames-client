import 'session.mock'
import { render, screen } from 'utils/test-utils'
import theme from 'styles/theme'

import GameCard from '.'

const props = {
  id: '1',
  slug: 'population-zero',
  title: 'Population Zero',
  developer: 'Rockstar Games',
  img: 'https://source.unsplash.com/user/willianjusten/300x140',
  price: 235
}

describe('GameCard component', () => {
  it('should render correctly', () => {
    const { container } = render(<GameCard {...props} />)

    const title = screen.getByRole('heading', { name: props.title })
    const developer = screen.getByRole('heading', { name: props.developer })
    const image = screen.getByRole('img', { name: props.title })
    const wishlistIcon = screen.getByLabelText(/add to wishlist/i)
    const link = screen.getByRole('link', { name: props.title })

    expect(title).toBeInTheDocument()
    expect(developer).toBeInTheDocument()
    expect(image).toHaveAttribute('src', props.img)
    expect(wishlistIcon).toBeInTheDocument()
    expect(link).toHaveAttribute('href', `/game/${props.slug}`)

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render price in label', () => {
    render(<GameCard {...props} />)

    const price = screen.getByText('$235.00')

    expect(price).not.toHaveStyle({ textDecoration: 'line-through' })
    expect(price).toHaveStyle({ backgroundColor: theme.colors.secondary })
  })

  it('should render a line-through in price when promotional', () => {
    render(<GameCard promotionalPrice={15} {...props} />)

    const price = screen.getByText('$235.00')
    const promotionalPrice = screen.getByText('$15.00')

    expect(price).toHaveStyle({ textDecoration: 'line-through' })
    expect(promotionalPrice).not.toHaveStyle({ textDecoration: 'line-through' })
  })

  it('should render Ribbon', () => {
    render(
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
