import { render, screen } from 'utils/test-utils'

import Highlight from '.'
import * as S from './styles'

const props = {
  title: 'Heading 1',
  subtitle: 'Heading 2',
  backgroundImage: '/img/red-dead-img.jpg',
  buttonLabel: 'Buy now',
  buttonLink: '/highlight'
}

describe('Highlight component', () => {
  it('should render headings and button', () => {
    render(<Highlight {...props} />)

    const heading1 = screen.getByRole('heading', { name: /heading 1/i })
    const heading2 = screen.getByRole('heading', { name: /heading 2/i })
    const link = screen.getByRole('link', { name: /buy now/i })

    expect(heading1).toBeInTheDocument()
    expect(heading2).toBeInTheDocument()
    expect(link).toBeInTheDocument()
  })

  it('should render background image', () => {
    render(<Highlight {...props} />)

    expect(screen.getByRole('img', { name: /Heading 1/i })).toBeInTheDocument()
  })

  it('should render float image', () => {
    render(<Highlight {...props} floatImage="/float-image.png" />)

    const floatImg = screen.getAllByRole('img', { name: props.title })

    expect(floatImg[1]).toHaveAttribute('src', '/float-image.png')
  })

  it('should render align right by default', () => {
    const { container } = render(<Highlight {...props} />)

    expect(container.firstChild).toHaveStyleRule(
      'grid-template-areas',
      "'floatimage content'"
    )

    expect(container.firstChild).toHaveStyleRule('text-align', 'right', {
      modifier: `${S.Content}`
    })
  })

  it('should render align left', () => {
    const { container } = render(<Highlight {...props} alignment="left" />)

    expect(container.firstChild).toHaveStyleRule(
      'grid-template-areas',
      "'content floatimage'"
    )

    expect(container.firstChild).toHaveStyleRule('text-align', 'left', {
      modifier: `${S.Content}`
    })
  })
})
