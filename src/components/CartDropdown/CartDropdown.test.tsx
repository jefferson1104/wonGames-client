import { render, screen } from 'utils/test-utils'

import CartDropdown from '.'

import itemsMock from 'components/CartList/mock'

describe('CartDropdown component', () => {
  it('should render <CartIcon /> and its badge', () => {
    render(<CartDropdown items={itemsMock} total="R$ 300,00" />)

    expect(screen.getByLabelText(/shopping cart/i)).toBeInTheDocument()
    expect(screen.getByText(`${itemsMock.length}`)).toBeInTheDocument()
  })

  it('should render Dropdown content with cart items and total', () => {
    render(<CartDropdown items={itemsMock} total="R$ 300,00" />)

    expect(screen.getByText('R$ 300,00')).toBeInTheDocument()
    expect(screen.getByText(`${itemsMock[0].title}`)).toBeInTheDocument()
  })
})
