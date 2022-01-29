import { render, screen } from 'utils/test-utils'

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
    render(<Banner {...props} />)

    const title = screen.getByRole('heading', { name: /defy death/i })
    const subtitle = screen.getByRole('heading', { name: /play the new /i })
    const image = screen.getByRole('img', { name: /defy death/i })

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
    expect(image).toBeInTheDocument()
  })

  it('should render a Ribbon', () => {
    render(
      <Banner
        {...props}
        ribbon="My Ribbon"
        ribbonSize="small"
        ribbonColor="secondary"
      />
    )

    const ribbon = screen.getByText(/my ribbon/i)

    expect(ribbon).toBeInTheDocument()
    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' })
    expect(ribbon).toHaveStyle({ height: '2.6rem', fontSize: '1.2rem' })
  })
})
