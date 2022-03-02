/* eslint-disable @typescript-eslint/no-var-requires */
import { render, screen } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'

import UserDropdown from '.'

// Mock do useRouter
const useRouter = jest.spyOn(require('next/router'), 'useRouter')
useRouter.mockImplementation(() => ({
  query: {}
}))

describe('UserDropdown component', () => {
  it('should render the username', () => {
    render(<UserDropdown username="Jefferson" />)

    expect(screen.getByText(/jefferson/i)).toBeInTheDocument()
  })

  it('should render the menu', () => {
    render(<UserDropdown username="Willian" />)

    // open menu
    userEvent.click(screen.getByText(/willian/i))

    expect(
      screen.getByRole('link', { name: /my profile/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('link', { name: /wishlist/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /sign out/i })
    ).toBeInTheDocument()
  })
})
