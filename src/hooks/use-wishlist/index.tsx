import { createContext, useContext } from 'react'
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
  const isInWishlist = (id: string) => false
  const addToWishlist = (id: string) => {}
  const removeFromWishlist = (id: string) => {}

  return (
    <WishlistContext.Provider
      value={{
        // items,
        isInWishlist,
        addToWishlist,
        removeFromWishlist
        // loading
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
