import { render, screen, fireEvent } from 'utils/test-utils'

import Menu from '.'

describe('Menu component', () => {
  it('should render the menu', () => {
    render(<Menu />)

    const logo = screen.getByRole('img', { name: /won games/i })
    const menuIcon = screen.getByLabelText(/open menu/i)
    const searchIcon = screen.getByLabelText(/search/i)
    const shoppingCartIcon = screen.getAllByLabelText(/shopping cart/i)

    expect(logo).toBeInTheDocument()
    expect(menuIcon).toBeInTheDocument()
    expect(searchIcon).toBeInTheDocument()
    expect(shoppingCartIcon).toHaveLength(2)
  })

  it('should handle the open/close mobile menu', () => {
    render(<Menu />)

    // selecionar o nosso menuFull
    const fullMenuElement = screen.getByRole('navigation', { hidden: true })

    // verificar se o menu tá escondido
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')
    expect(fullMenuElement).toHaveStyle({ opacity: 0 })

    // clicar no botão de abrir o menu e verificar se ele abriu
    fireEvent.click(screen.getByLabelText(/open menu/i))
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('false')
    expect(fullMenuElement).toHaveStyle({ opacity: 1 })

    // clicar no botão de fechar o menu e verificar se ele fechou
    fireEvent.click(screen.getByLabelText(/close menu/i))
    expect(fullMenuElement.getAttribute('aria-hidden')).toBe('true')
    expect(fullMenuElement).toHaveStyle({ opacity: 0 })
  })

  it('should show register box when logged out', () => {
    render(<Menu />)

    expect(screen.queryByText(/my profile/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/wishlist/i)).not.toBeInTheDocument()

    expect(screen.getAllByText(/sign in/i)).toHaveLength(2)
    expect(screen.getByText(/sign up/i)).toBeInTheDocument()
  })

  it('should show wishlist and account when logged in', () => {
    render(<Menu username="jhon doe" />)

    expect(screen.getAllByText(/my profile/i)).toHaveLength(2)
    expect(screen.getAllByText(/wishlist/i)).toHaveLength(2)

    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument()
  })

  it('should not show sign in or dropdownUser if loading', () => {
    render(<Menu username="jhon doe" loading />)

    expect(screen.queryByText(/my profile/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument()
  })
})
