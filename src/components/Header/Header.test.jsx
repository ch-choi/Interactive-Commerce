import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { CartProvider } from '../../context/CartContext'

const renderWithCart = (ui) => {
  return render(<CartProvider>{ui}</CartProvider>)
}

describe('Header', () => {
  it('renders zoom button', () => {
    renderWithCart(<Header zoomLevel={0} />)
    const buttons = document.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('calls onZoomChange when zoom button clicked', () => {
    const handleZoom = vi.fn()
    renderWithCart(<Header zoomLevel={0} onZoomChange={handleZoom} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[0])
    expect(handleZoom).toHaveBeenCalled()
  })

  it('renders filter buttons', () => {
    renderWithCart(<Header zoomLevel={0} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(5)
  })

  it('calls onFilterChange when filter clicked', () => {
    const handleFilter = vi.fn()
    renderWithCart(<Header zoomLevel={0} onFilterChange={handleFilter} />)
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[2])
    expect(handleFilter).toHaveBeenCalled()
  })
})
