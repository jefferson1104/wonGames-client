import Base from 'templates/Base'

import Heading from 'components/Heading'
import GameCard, { GameCardProps } from 'components/GameCard'
import Showcase from 'components/Showcase'

import { Container } from 'components/Container'
import { Grid } from 'components/Grid'
import { Divider } from 'components/Divider'
import { HighlightProps } from 'components/Highlight'
import Empty from 'components/Empty'

export type WishlistTemplateprops = {
  games?: GameCardProps[]
  recommendedTitle: string
  recommendedGames: GameCardProps[]
  recommendedHighlight: HighlightProps
}

const Wishlist = ({
  games,
  recommendedTitle,
  recommendedGames,
  recommendedHighlight
}: WishlistTemplateprops) => {
  return (
    <Base>
      <Container>
        <Heading lineLeft lineColor="secondary">
          Wishlist
        </Heading>

        {games && games.length >= 1 ? (
          <Grid>
            {games?.map((game, index) => (
              <GameCard key={`wishlist-${index}`} {...game} />
            ))}
          </Grid>
        ) : (
          <Empty
            title="Your wishlist is empty"
            description="Games added to your wishlist will appear here"
            hasLink
          />
        )}

        <Divider />
      </Container>

      <Showcase
        title={recommendedTitle}
        games={recommendedGames}
        highlight={recommendedHighlight}
      />
    </Base>
  )
}

export default Wishlist
