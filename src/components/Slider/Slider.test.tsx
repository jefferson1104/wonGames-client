/* eslint-disable @typescript-eslint/no-unused-vars */
import 'match-media-mock'
import { render, screen } from '@testing-library/react'

import Slider from '.'

describe('Slider component', () => {
  it('should render children as slider item', () => {
    const { debug, container } = render(
      <Slider settings={{ slidesToShow: 1, infinite: false }}>
        <p>Item 1</p>
        <p>Item 2</p>
      </Slider>
    )

    // debug()

    const item1 = screen.getByText(/item 1/i).parentElement?.parentElement
    const item2 = screen.getByText(/item 2/i).parentElement?.parentElement

    expect(item1).toHaveClass('slick-slide')
    expect(item2).toHaveClass('slick-slide')

    // create a slide snapshot
    expect(container.firstChild).toMatchSnapshot()
  })
})
