import { render, screen } from 'utils/test-utils'
import 'jest-styled-components'

import Heading from '.'

describe('Heading component', () => {
  it('should render a white heading by default', () => {
    render(<Heading>Won Games</Heading>)

    const heading = screen.getByRole('heading', { name: /won games/i })

    expect(heading).toHaveStyle({
      color: '#FAFAFA'
    })
  })

  it('should render a black heading when color is passed', () => {
    render(<Heading color="black">Won Games</Heading>)

    const heading = screen.getByRole('heading', { name: /won games/i })

    expect(heading).toHaveStyle({
      color: '#030517'
    })
  })

  it('should render a heading with a line to the left side', () => {
    render(<Heading lineLeft>Won Games</Heading>)

    const heading = screen.getByRole('heading', { name: /won games/i })

    expect(heading).toHaveStyle({
      'border-left': '0.7rem solid #F231A5'
    })
  })

  it('should render a heading with a line at the bottom', () => {
    render(<Heading lineBottom>Won Games</Heading>)

    const heading = screen.getByRole('heading', { name: /won games/i })

    expect(heading).toHaveStyleRule('border-bottom', '0.5rem solid #F231A5', {
      modifier: '::after'
    })
  })

  it('should render a heading with a small size', () => {
    render(<Heading size="small">Won Games</Heading>)

    const heading = screen.getByRole('heading', { name: /won games/i })

    expect(heading).toHaveStyle({ 'font-size': '1.6rem' })
    expect(heading).toHaveStyleRule('width', '3rem', { modifier: '::after' })
  })

  it('should render a heading with a huge size', () => {
    render(<Heading size="huge">Won Games</Heading>)

    const heading = screen.getByRole('heading', { name: /won games/i })

    expect(heading).toHaveStyle({ 'font-size': '5.2rem' })
  })

  it('should render a heading with a primary line color', () => {
    render(
      <Heading lineColor="primary" lineLeft lineBottom>
        Won Games
      </Heading>
    )

    const heading = screen.getByRole('heading', { name: /won games/i })

    expect(heading).toHaveStyle({ 'border-left': '0.7rem solid #F231A5' })
    expect(heading).toHaveStyleRule('border-bottom', '0.5rem solid #F231A5', {
      modifier: '::after'
    })
  })

  it('should render a heading with a secondary line color', () => {
    render(
      <Heading lineColor="secondary" lineLeft lineBottom>
        Won Games
      </Heading>
    )

    const heading = screen.getByRole('heading', { name: /won games/i })

    expect(heading).toHaveStyle({ 'border-left': '0.7rem solid #3CD3C1' })
    expect(heading).toHaveStyleRule('border-bottom', '0.5rem solid #3CD3C1', {
      modifier: '::after'
    })
  })
})
