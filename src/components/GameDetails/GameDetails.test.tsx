import { render, screen } from 'utils/test-utils'

import GameDetails, { GameDetailsProps } from '.'

const props: GameDetailsProps = {
  developer: 'Different Tales',
  publisher: 'PUB Games',
  platforms: ['windows', 'mac', 'linux'],
  releaseDate: '2020-11-21T23:00:00',
  rating: 'FREE',
  genres: ['Role-playing', 'Narrative']
}

describe('GameDetails component', () => {
  it('should render the blocks', () => {
    render(<GameDetails {...props} />)

    const headingDeveloper = screen.getByRole('heading', { name: /Developer/i })
    const headingRelease = screen.getByRole('heading', { name: /Release/i })
    const headingPlatforms = screen.getByRole('heading', { name: /Platforms/i })
    const headingPublisher = screen.getByRole('heading', { name: /Publisher/i })
    const headingRating = screen.getByRole('heading', { name: /Rating/i })
    const headingGenres = screen.getByRole('heading', { name: /Genres/i })

    expect(headingDeveloper).toBeInTheDocument()
    expect(headingRelease).toBeInTheDocument()
    expect(headingPlatforms).toBeInTheDocument()
    expect(headingPublisher).toBeInTheDocument()
    expect(headingRating).toBeInTheDocument()
    expect(headingGenres).toBeInTheDocument()
  })

  it('should render platforms icons', () => {
    render(<GameDetails {...props} />)

    const linux = screen.getByRole('img', { name: /linux/i })
    const windows = screen.getByRole('img', { name: /windows/i })
    const mac = screen.getByRole('img', { name: /mac/i })

    expect(linux).toBeInTheDocument()
    expect(windows).toBeInTheDocument()
    expect(mac).toBeInTheDocument()
  })

  it('should render the formated date', () => {
    render(<GameDetails {...props} />)

    const dateFormated = screen.getByText('Nov 21, 2020')

    expect(dateFormated).toBeInTheDocument()
  })

  it('should render free rating when FREE', () => {
    render(<GameDetails {...props} />)

    const freeRating = screen.getByText(/free/i)

    expect(freeRating).toBeInTheDocument()
  })

  it('should render publisher', () => {
    render(<GameDetails {...props} />)

    const publisher = screen.getByText(/PUB Games/i)

    expect(publisher).toBeInTheDocument()
  })

  it('should render developer', () => {
    render(<GameDetails {...props} />)

    const developer = screen.getByText(/different tales/i)

    expect(developer).toBeInTheDocument()
  })

  it('should render 18+ rating when pegi18', () => {
    render(<GameDetails {...props} rating="pegi18" />)

    const freeRating = screen.getByText(/18\+/i)

    expect(freeRating).toBeInTheDocument()
  })

  it('should render a list of genres', () => {
    render(<GameDetails {...props} />)

    const genres = screen.getByText(/Role-playing \/ Narrative/i)

    expect(genres).toBeInTheDocument()
  })
})
