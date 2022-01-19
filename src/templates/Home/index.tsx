import Base from 'templates/Base'

import { Container } from 'components/Container'
import Showcase from 'components/Showcase'
import BannerSlider from 'components/BannerSlider'

import { BannerProps } from 'components/Banner'
import { GameCardProps } from 'components/GameCard'
import { HighlightProps } from 'components/Highlight'

import * as S from './styles'

export type HomeTemplateProps = {
  banners: BannerProps[]
  newGamesTitle: string
  newGames: GameCardProps[]
  mostPopularGamesTitle: string
  mostPopularHighlight: HighlightProps
  mostPopularGames: GameCardProps[]
  upcomingGamesTitle: string
  upcommingGames: GameCardProps[]
  upcommingHighligth: HighlightProps
  freeGamesTitle: string
  freeGames: GameCardProps[]
  freeHighligth: HighlightProps
}

const Home = ({
  banners,
  newGamesTitle,
  newGames,
  mostPopularGamesTitle,
  mostPopularHighlight,
  mostPopularGames,
  upcomingGamesTitle,
  upcommingGames,
  upcommingHighligth,
  freeGamesTitle,
  freeGames,
  freeHighligth
}: HomeTemplateProps) => {
  return (
    <Base>
      <Container>
        <S.SectionBanner>
          <BannerSlider items={banners} />
        </S.SectionBanner>
      </Container>

      <S.SectionNews>
        <Showcase title={newGamesTitle} games={newGames} color="black" />
      </S.SectionNews>

      <Showcase
        title={mostPopularGamesTitle}
        highlight={mostPopularHighlight}
        games={mostPopularGames}
      />

      <Showcase
        title={upcomingGamesTitle}
        highlight={upcommingHighligth}
        games={upcommingGames}
      />

      <Showcase
        title={freeGamesTitle}
        highlight={freeHighligth}
        games={freeGames}
      />
    </Base>
  )
}

export default Home
