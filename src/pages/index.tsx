import Home, { HomeTemplateProps } from 'templates/Home'
import BannersMock from 'components/BannerSlider/mock'
import GamesMock from 'components/GameCardSlider/mock'
import HighlightMock from 'components/Highlight/mock'

export default function Index(props: HomeTemplateProps) {
  return <Home {...props} />
}

// getStaticProps => gerar estático em build time
// getServerSideprops => gerar via ssr a cada request (nunca vai para o bundle do client)
// getInitialProps => gerar via ssr a cada request (vai para o client, faz o hydrate do lado do cliente depois do primeiro request)
export async function getServerSideProps() {
  return {
    props: {
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
  }
}
