import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DynamicGrid from './DynamicGrid'

const mockProducts = [
  { id: 1, name: 'White Hoodie', images: ['/m.mp4', '/1.png', '/2.png'], price: 89.99 },
  { id: 2, name: 'Black Blazer', images: ['/m.mp4', '/1.png', '/2.png'], price: 149.99 },
]

describe('DynamicGrid', () => {
  it('renders correct number of ProductCards', () => {
    render(<DynamicGrid products={mockProducts} />)
    expect(screen.getByText('White Hoodie')).toBeDefined()
    expect(screen.getByText('Black Blazer')).toBeDefined()
  })

  it('calls onProductClick when card clicked', () => {
    const handleClick = vi.fn()
    render(<DynamicGrid products={mockProducts} onProductClick={handleClick} />)
    const card = screen.getByText('White Hoodie')
    fireEvent.click(card)
    expect(handleClick).toHaveBeenCalled()
  })
})
