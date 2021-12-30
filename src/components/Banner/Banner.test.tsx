import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import Banner from '.'

const props = {
  img: 'https://source.unsplash.com/user/willianjusten/1042x580',
  title: 'Defy death',
  subtitle: '<p>Play the new <strong>CrashLands</strong> season',
  buttonLabel: 'Buy now',
  buttonLink: '/games/defy-death'
}

describe('Banner component', () => {
  it('should render correctly', () => {
    renderWithTheme(<Banner {...props} />)

    const title = screen.getByRole('heading', { name: /defy death/i })
    const subtitle = screen.getByRole('heading', { name: /play the new /i })
    const image = screen.getByRole('img', { name: /defy death/i })

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
    expect(image).toBeInTheDocument()
  })
})
