import { createContext, useContext, useEffect, useState } from 'react'
import { GameCardProps } from 'components/GameCard'
import { useQueryWishlist } from 'graphql/queries/wishlist'
import { useSession } from 'next-auth/client'
import { gamesMapper } from 'utils/mappers'
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist'

// criando tipos de dados do contexto da wishlist
export type WishlistContextData = {
  items: GameCardProps[]
  isInWishlist: (id: string) => boolean
  addToWishlist: (id: string) => void
  removeFromWishlist: (id: string) => void
  loading: boolean
}

// criando os valores default dos dados que contem o contexto wishlist
export const WishlistContextDefaultValues = {
  items: [],
  isInWishlist: () => false,
  addToWishlist: () => null,
  removeFromWishlist: () => null,
  loading: false
}

// criando o contexto wishlist
export const WishlistContext = createContext<WishlistContextData>(
  WishlistContextDefaultValues
)

// criando tipos de dados do provider
export type WishlistProviderProps = {
  children: React.ReactNode
}

// criando o provider
const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [session] = useSession()
  const [wishlistItems, setWishlistItems] = useState<
    QueryWishlist_wishlists_games[]
  >([])

  // buscando games da wishlist, somente se houver uma session
  const { data, loading } = useQueryWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  // useEffect para gravar os dados retornados da query em um state
  useEffect(() => {
    setWishlistItems(data?.wishlists[0]?.games || [])
  }, [data])

  // verifica se o id do jogo esta na wishlist
  const isInWishlist = (id: string) =>
    !!wishlistItems.find((game) => game.id === id)

  // adiciona o jogo na wishlist
  const addToWishlist = (id: string) => {}

  // remove o jogo da wishlist
  const removeFromWishlist = (id: string) => {}

  return (
    <WishlistContext.Provider
      value={{
        items: gamesMapper(wishlistItems),
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        loading
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

// criando o hook da wishlist
const useWishlist = () => useContext(WishlistContext)

// por fim exportando o provider e o hook
export { WishlistProvider, useWishlist }
