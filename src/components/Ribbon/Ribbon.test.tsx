import { render, screen } from 'utils/test-utils'

import Ribbon from '.'

describe('Ribbon component', () => {
  it('should render the text correctly', () => {
    render(<Ribbon>Best Seller</Ribbon>)

    const ribbon = screen.getByText(/Best Seller/i)

    expect(ribbon).toBeInTheDocument()
  })

  it('should render with the primary color', () => {
    render(<Ribbon>Best Seller</Ribbon>)

    const ribbon = screen.getByText(/Best Seller/i)

    expect(ribbon).toHaveStyle({ backgroundColor: '#F231A5' })
  })

  it('should render with the secondary color', () => {
    render(<Ribbon color="secondary">Best Seller</Ribbon>)

    const ribbon = screen.getByText(/Best Seller/i)

    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' })
  })

  it('should render with the normal size as default', () => {
    render(<Ribbon>Best Seller</Ribbon>)

    const ribbon = screen.getByText(/Best Seller/i)

    expect(ribbon).toHaveStyle({ height: '3.6rem', fontSize: '1.4rem' })
  })

  it('should render with the small size', () => {
    render(<Ribbon size="small">Best Seller</Ribbon>)

    const ribbon = screen.getByText(/Best Seller/i)

    expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' })
  })
})
