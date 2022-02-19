import { MockedProvider } from '@apollo/client/testing'
import { renderHook } from '@testing-library/react-hooks'

import { useWishlist, WishlistProvider } from '.'
import { wishlistMock } from './mock'

describe('useWishlist', () => {
  it('should return wishlist items', () => {
    // estrutura base para renderizar um provider
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    )

    // testando o hook
    const { result } = renderHook(() => useWishlist(), { wrapper })
  })
})
