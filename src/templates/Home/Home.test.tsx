import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import BannersMock from 'components/BannerSlider/mock'
import GamesMock from 'components/GameCardSlider/mock'
import HighlightMock from 'components/Highlight/mock'

import Home from '.'

const props = {
  banners: BannersMock,
  newGames: [GamesMock[0]],
  mostPopularHighlight: HighlightMock,
  mostPopularGames: [GamesMock[0]],
  upcommingGames: [GamesMock[0]],
  upcommingHighligth: HighlightMock,
  upcommingMoreGames: [GamesMock[0]],
  freeGames: [GamesMock[0]],
  freeHighligth: HighlightMock
}

describe('Home component', () => {
  it('should render menu, footer, sections and elements', () => {
    renderWithTheme(<Home {...props} />)

    const menu = screen.getByLabelText(/open menu/i)
    const footer = screen.getByRole('heading', { name: /contact/i })

    const news = screen.getByRole('heading', { name: /news/i })
    const mostPopular = screen.getByRole('heading', { name: /most popular/i })
    const upcomming = screen.getByRole('heading', { name: /upcomming/i })
    const freeGames = screen.getByRole('heading', { name: /free games/i })

    // test menu and footer
    expect(menu).toBeInTheDocument()
    expect(footer).toBeInTheDocument()

    // test sections
    expect(news).toBeInTheDocument()
    expect(mostPopular).toBeInTheDocument()
    expect(upcomming).toBeInTheDocument()
    expect(freeGames).toBeInTheDocument()

    // test sections elements
    expect(screen.getAllByText(/defy death 1/i)).toHaveLength(1)
    expect(screen.getAllByText(/population zero/i)).toHaveLength(5)
    expect(screen.getAllByText(/read dead is back!/i)).toHaveLength(3)
  })
})
