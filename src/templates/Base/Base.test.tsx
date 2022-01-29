import { render, screen } from 'utils/test-utils'

import Base from '.'

jest.mock('components/Menu', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Menu"></div>
    }
  }
})

jest.mock('components/Footer', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Footer"></div>
    }
  }
})

describe('Base template', () => {
  it('should render menu, footer and children', () => {
    render(
      <Base>
        <h1>Heading</h1>
      </Base>
    )

    // verifica se renderiza Menu
    const menu = screen.getByTestId(/Mock Menu/i)
    expect(menu).toBeInTheDocument()

    // verifica se renderiza Footer
    const footer = screen.getByTestId(/Mock Footer/i)
    expect(footer).toBeInTheDocument()

    // verifica o children
    const children = screen.getByRole('heading', { name: /heading/i })
    expect(children).toBeInTheDocument()
  })
})
