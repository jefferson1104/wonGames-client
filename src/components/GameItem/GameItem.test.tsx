import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'

import GameItem from '.'

const propsMock = {
  img: 'https://source.unsplash.com/user/willianjusten/151x70',
  title: 'Red Dead Redemption 2',
  price: 'R$ 215,00'
}

describe('GameItem component', () => {
  it('should render the item', () => {
    renderWithTheme(<GameItem {...propsMock} />)

    const img = screen.getByRole('img', { name: propsMock.title })
    const title = screen.getByRole('heading', { name: propsMock.title })
    const price = screen.getByText('R$ 215,00')

    expect(img).toHaveAttribute('src', propsMock.img)
    expect(title).toBeInTheDocument()
    expect(price).toBeInTheDocument()
  })

  it('should render the item with download link', () => {
    const downloadLink = 'https://example-download-link.com'

    renderWithTheme(<GameItem {...propsMock} downloadLink={downloadLink} />)

    expect(
      screen.getByRole('link', { name: `Get ${propsMock.title} here` })
    ).toHaveAttribute('href', downloadLink)
  })

  it('should render the payment info', () => {
    const paymentInfo = {
      flag: 'mastercard',
      img: '/img/cards/mastercard.png',
      number: '**** **** **** 4326',
      purchaseDate: 'Purchase made on 07/20/2020 at 20:32'
    }

    renderWithTheme(<GameItem {...propsMock} paymentInfo={paymentInfo} />)

    expect(screen.getByRole('img', { name: paymentInfo.flag })).toHaveAttribute(
      'src',
      paymentInfo.img
    )

    expect(screen.getByText(paymentInfo.number)).toBeInTheDocument()
    expect(screen.getByText(paymentInfo.purchaseDate)).toBeInTheDocument()
  })
})
