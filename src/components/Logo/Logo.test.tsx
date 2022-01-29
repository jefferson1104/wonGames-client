import { render, screen } from 'utils/test-utils'
import 'jest-styled-components'

import Logo from '.'

describe('Logo component', () => {
  it('should render a white label by default', () => {
    // renderizar o componente utilizando o 'render'
    render(<Logo />)

    // selecionar o elemento a ser testado utilizando o 'screen' e seus metodos
    const logo = screen.getByLabelText(/Won Games/i).parentElement

    // expect - comparação - análise (ex: espero que renderize a logo branca)
    expect(logo).toHaveStyle({ color: '#FAFAFA' })
  })

  it('should render the logo with id passed', () => {
    const { container } = render(<Logo id="myId" />)

    expect(container.querySelector('#a_myId')).toBeInTheDocument()
  })

  it('should render a black label when color is passed', () => {
    render(<Logo color="black" />)

    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      color: '#030517'
    })
  })

  it('should render a normal logo when size is default', () => {
    render(<Logo />)

    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      width: '11rem'
    })
  })

  it('should render a bigger logo', () => {
    render(<Logo size="large" />)

    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyle({
      width: '20rem'
    })
  })

  it('should render a bigger logo without text if hideOnMobile', () => {
    render(<Logo hideOnMobile />)

    expect(screen.getByLabelText(/Won Games/i).parentElement).toHaveStyleRule(
      'width',
      '5.8rem',
      {
        media: '(max-width: 768px)'
      }
    )
  })
})
