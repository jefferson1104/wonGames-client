import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/client'
import { useMutation } from '@apollo/client'
import { useQueryWishlist } from 'graphql/queries/wishlist'
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist'
import {
  MUTATION_CREATE_WISHLIST,
  MUTATION_UPDATE_WISHLIST
} from 'graphql/mutations/wishlist'
import { gamesMapper } from 'utils/mappers'
import { GameCardProps } from 'components/GameCard'

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
  const [wishlistId, setWishlistId] = useState<string | null>()
  const [wishlistItems, setWishlistItems] = useState<
    QueryWishlist_wishlists_games[]
  >([])

  // Mutation GRAPHQL para criar wishlist
  const [createList, { loading: loadingCreate }] = useMutation(
    MUTATION_CREATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistItems(data?.createWishlist?.wishlist?.games || [])
        setWishlistId(data?.createWishlist?.wishlist?.id)
      }
    }
  )

  // Mutation GRAPHQL para atualizar a wishlist
  const [updateList, { loading: loadingUpdate }] = useMutation(
    MUTATION_UPDATE_WISHLIST,
    {
      context: { session },
      onCompleted: (data) => {
        setWishlistItems(data?.updateWishlist?.wishlist?.games || [])
      }
    }
  )

  // buscando games da wishlist, somente se houver uma session
  const { data, loading: loadingQuery } = useQueryWishlist({
    skip: !session?.user?.email,
    context: { session },
    variables: {
      identifier: session?.user?.email as string
    }
  })

  // useEffect para gravar os dados retornados da query em um state
  useEffect(() => {
    setWishlistItems(data?.wishlists[0]?.games || [])
    setWishlistId(data?.wishlists[0]?.id)
  }, [data])

  // wishlistItems atualizou? este metodo é chamado e retorna o id dos games
  const wishlistIds = useMemo(
    () => wishlistItems.map((game) => game.id),
    [wishlistItems]
  )

  // verifica se o id do jogo esta na wishlist
  const isInWishlist = (id: string) =>
    !!wishlistItems.find((game) => game.id === id)

  // adiciona o jogo na wishlist ou atualiza a wishlist
  const addToWishlist = (id: string) => {
    // se nao existir a wishlist entao cria-se
    if (!wishlistId) {
      return createList({
        variables: { input: { data: { games: [...wishlistIds, id] } } }
      })
    }

    // se ja existe a wishlist ele atualiza
    return updateList({
      variables: {
        input: {
          where: { id: wishlistId },
          data: { games: [...wishlistIds, id] }
        }
      }
    })
  }

  // remove o jogo da wishlist
  const removeFromWishlist = (id: string) => {
    updateList({
      variables: {
        input: {
          where: { id: wishlistId },
          data: { games: wishlistIds.filter((gameId: string) => gameId !== id) }
        }
      }
    })
  }

  return (
    <WishlistContext.Provider
      value={{
        items: gamesMapper(wishlistItems),
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        loading: loadingQuery || loadingCreate || loadingUpdate
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
