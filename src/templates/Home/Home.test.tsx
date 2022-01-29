import 'match-media-mock'
import { render, screen } from 'utils/test-utils'

import BannersMock from 'components/BannerSlider/mock'
import GamesMock from 'components/GameCardSlider/mock'
import HighlightMock from 'components/Highlight/mock'

import Home from '.'

const props = {
  banners: BannersMock,
  newGamesTitle: 'New Games',
  newGames: GamesMock,
  mostPopularGamesTitle: 'Popular Games',
  mostPopularHighlight: HighlightMock,
  mostPopularGames: GamesMock,
  upcomingGamesTitle: 'Upcoming Games',
  upcommingGames: GamesMock,
  upcommingHighligth: HighlightMock,
  freeGamesTitle: 'Free Games',
  freeGames: GamesMock,
  freeHighligth: HighlightMock
}

jest.mock('components/Showcase', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Showcase"></div>
    }
  }
})

jest.mock('components/BannerSlider', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Banner Slider"></div>
    }
  }
})

describe('Home Page', () => {
  it('should render banner and showcases', () => {
    render(<Home {...props} />)

    // verifica se renderiza BannerSlider
    const banner = screen.getByTestId(/Mock Banner Slider/i)
    expect(banner).toBeInTheDocument()

    // verifica renderizacao de todas showcases
    const showcases = screen.getAllByTestId('Mock Showcase')
    expect(showcases).toHaveLength(4)
  })
})
