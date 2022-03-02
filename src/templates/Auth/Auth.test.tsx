import { render, screen } from 'utils/test-utils'

import Auth from '.'

describe('Auth Page', () => {
  it('should render logos, title, subtitle, footer and children', () => {
    render(
      <Auth title="Auth Title">
        <input type="text" />
      </Auth>
    )

    // verifica se existe 2 logos
    const logos = screen.getAllByRole('img', { name: 'Won Games' })
    expect(logos).toHaveLength(2)

    // verifica se tem o heading principal do banner
    const headingBanner = screen.getByRole('heading', {
      name: /All your favorite games in one place/i
    })
    expect(headingBanner).toBeInTheDocument()

    // verifica se tem o subtitle
    const subtitle = screen.getByRole('heading', {
      name: /won is the best and most complete gaming plataform/i
    })
    expect(subtitle).toBeInTheDocument()

    // verifica se tem o title do content
    const title = screen.getByRole('heading', { name: /auth title/i })
    expect(title).toBeInTheDocument()

    // verifica se o children está sendo renderizado
    const children = screen.getByRole('textbox')
    expect(children).toBeInTheDocument()
  })
})
