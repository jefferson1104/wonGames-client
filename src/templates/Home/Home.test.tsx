import 'match-media-mock'
import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import BannersMock from 'components/BannerSlider/mock'
import GamesMock from 'components/GameCardSlider/mock'
import HighlightMock from 'components/Highlight/mock'

import Home from '.'

const props = {
  banners: BannersMock,
  newGames: GamesMock,
  mostPopularHighlight: HighlightMock,
  mostPopularGames: GamesMock,
  upcommingGames: GamesMock,
  upcommingHighligth: HighlightMock,
  upcommingMoreGames: GamesMock,
  freeGames: GamesMock,
  freeHighligth: HighlightMock
}

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

describe('Home component', () => {
  it('should render menu, banner slider, showcase and footer', () => {
    renderWithTheme(<Home {...props} />)

    // verifica se renderiza Menu
    const menu = screen.getByTestId(/Mock Menu/i)
    expect(menu).toBeInTheDocument()

    // verifica se renderiza BannerSlider
    const banner = screen.getByTestId(/Mock Banner Slider/i)
    expect(banner).toBeInTheDocument()

    // verifica renderizacao de todas showcases
    const showcases = screen.getAllByTestId('Mock Showcase')
    expect(showcases).toHaveLength(5)

    // verifica se renderiza Footer
    const footer = screen.getByTestId(/Mock Footer/i)
    expect(footer).toBeInTheDocument()
  })
})
