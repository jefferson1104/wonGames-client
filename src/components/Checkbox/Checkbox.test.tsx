import { screen, waitFor } from '@testing-library/react'
import theme from 'styles/theme'
import { renderWithTheme } from 'utils/tests/helpers'
import userEvent from '@testing-library/user-event'

import Checkbox from '.'

describe('Checkbox component', () => {
  it('should render with label', () => {
    renderWithTheme(<Checkbox label="checkbox label" labelFor="check" />)

    // pegando input a partir do papel / role
    const checkboxInput = screen.getByRole('checkbox')
    expect(checkboxInput).toBeInTheDocument()

    // pegando input a partir da label associada
    const checkboxLabel = screen.getByLabelText(/checkbox label/i)
    expect(checkboxLabel).toBeInTheDocument()

    // pegando label a partir do texto
    const labelFor = screen.getByText(/checkbox label/i)
    expect(labelFor).toHaveAttribute('for', 'check')
  })

  it('should render without label', () => {
    renderWithTheme(<Checkbox />)

    const checkboxLabel = screen.queryByLabelText('checkbox')

    expect(checkboxLabel).not.toBeInTheDocument()
  })

  it('should render with black label', () => {
    renderWithTheme(
      <Checkbox label="checkbox label" labelFor="check" labelColor="black" />
    )

    const labelColor = screen.getByText(/checkbox label/i)

    expect(labelColor).toHaveStyle({ color: theme.colors.black })
  })

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn()

    renderWithTheme(<Checkbox label="Checkbox" onCheck={onCheck} />)

    expect(onCheck).not.toHaveBeenCalled()

    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })

    expect(onCheck).toHaveBeenCalledWith(true)
  })

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn()

    renderWithTheme(<Checkbox label="Checkbox" onCheck={onCheck} isChecked />)

    const checkbox = screen.getByRole('checkbox')

    userEvent.click(checkbox)
    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1)
    })

    expect(onCheck).toHaveBeenCalledWith(false)
  })

  it('should be accessible with tab', () => {
    renderWithTheme(<Checkbox label="Checkbox" labelFor="Checkbox" />)

    expect(document.body).toHaveFocus()

    userEvent.tab()

    expect(screen.getByLabelText(/checkbox/i)).toHaveFocus()
  })
})
