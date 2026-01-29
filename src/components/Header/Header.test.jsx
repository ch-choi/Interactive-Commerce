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

  it('renders all filter buttons', () => {
    renderWithCart(<Header zoomLevel={0} />)
    expect(screen.getByTestId('filter-gender-all')).toBeDefined()
    expect(screen.getByTestId('filter-gender-male')).toBeDefined()
    expect(screen.getByTestId('filter-gender-female')).toBeDefined()
    expect(screen.getByTestId('filter-color-all')).toBeDefined()
    expect(screen.getByTestId('filter-color-white')).toBeDefined()
    expect(screen.getByTestId('filter-color-black')).toBeDefined()
  })

  it('calls onFilterChange with male gender filter', () => {
    const handleFilter = vi.fn()
    renderWithCart(<Header zoomLevel={0} onFilterChange={handleFilter} />)
    fireEvent.click(screen.getByTestId('filter-gender-male'))
    expect(handleFilter).toHaveBeenCalledWith({ gender: 'male', color: 'all' })
  })

  it('calls onFilterChange with female gender filter', () => {
    const handleFilter = vi.fn()
    renderWithCart(<Header zoomLevel={0} onFilterChange={handleFilter} />)
    fireEvent.click(screen.getByTestId('filter-gender-female'))
    expect(handleFilter).toHaveBeenCalledWith({ gender: 'female', color: 'all' })
  })

  it('calls onFilterChange with white color filter', () => {
    const handleFilter = vi.fn()
    renderWithCart(<Header zoomLevel={0} onFilterChange={handleFilter} />)
    fireEvent.click(screen.getByTestId('filter-color-white'))
    expect(handleFilter).toHaveBeenCalledWith({ gender: 'all', color: 'white' })
  })

  it('calls onFilterChange with black color filter', () => {
    const handleFilter = vi.fn()
    renderWithCart(<Header zoomLevel={0} onFilterChange={handleFilter} />)
    fireEvent.click(screen.getByTestId('filter-color-black'))
    expect(handleFilter).toHaveBeenCalledWith({ gender: 'all', color: 'black' })
  })

  it('preserves existing filters when changing gender', () => {
    const handleFilter = vi.fn()
    renderWithCart(
      <Header 
        zoomLevel={0} 
        filters={{ gender: 'all', color: 'white' }} 
        onFilterChange={handleFilter} 
      />
    )
    fireEvent.click(screen.getByTestId('filter-gender-male'))
    expect(handleFilter).toHaveBeenCalledWith({ gender: 'male', color: 'white' })
  })
})
