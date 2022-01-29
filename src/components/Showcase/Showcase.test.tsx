import 'match-media-mock'
import { render, screen } from 'utils/test-utils'

import gamesMock from 'components/GameCardSlider/mock'
import highlightMock from 'components/Highlight/mock'

import Showcase from '.'

const props = {
  title: 'Most Popular',
  highlight: highlightMock,
  games: gamesMock.slice(0, 1)
}

describe('Showcase component', () => {
  it('should render full showcase', () => {
    render(<Showcase {...props} />)

    const title = screen.getByRole('heading', { name: /most popular/i })
    const highlight = screen.getByRole('heading', { name: highlightMock.title })
    const games = screen.getByRole('heading', { name: gamesMock[0].title })

    expect(title).toBeInTheDocument()
    expect(highlight).toBeInTheDocument()
    expect(games).toBeInTheDocument()
  })

  it('should render without title', () => {
    render(<Showcase games={props.games} highlight={props.highlight} />)

    // mesmo sem o expect caso nao encontre os headings, o teste quebrará
    screen.getByRole('heading', { name: highlightMock.title })
    screen.getByRole('heading', { name: gamesMock[0].title })

    const title = screen.queryByRole('heading', { name: /most popular/i })

    expect(title).not.toBeInTheDocument()
  })

  it('should render without highlight', () => {
    render(<Showcase title={props.title} games={props.games} />)

    // mesmo sem o expect caso nao encontre os headings, o teste quebrará
    screen.getByRole('heading', { name: /most popular/i })
    screen.getByRole('heading', { name: gamesMock[0].title })

    const highlight = screen.queryByRole('heading', {
      name: highlightMock.title
    })

    expect(highlight).not.toBeInTheDocument()
  })

  it('should render without games', () => {
    render(<Showcase title={props.title} highlight={props.highlight} />)

    // mesmo sem o expect caso nao encontre os headings, o teste quebrará
    screen.getByRole('heading', { name: /most popular/i })
    screen.getByRole('heading', { name: highlightMock.title })

    const games = screen.queryByRole('heading', { name: gamesMock[0].title })

    expect(games).not.toBeInTheDocument()
  })
})
