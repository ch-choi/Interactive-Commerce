import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import GridContainer from './GridContainer'

const mockProducts = [
  { id: 1, name: 'White Hoodie', images: ['/m.mp4', '/1.png', '/2.png'], price: 89.99 },
  { id: 2, name: 'Black Blazer', images: ['/m.mp4', '/1.png', '/2.png'], price: 149.99 },
]

describe('GridContainer', () => {
  it('renders DynamicGrid', () => {
    render(<GridContainer products={mockProducts} />)
    const cards = document.querySelectorAll('[style*="aspect-ratio"]')
    expect(cards.length).toBe(2)
  })

  it('handles zoom level changes', () => {
    const { rerender } = render(<GridContainer products={mockProducts} zoomLevel={0} />)
    rerender(<GridContainer products={mockProducts} zoomLevel={1} />)
    const cards = document.querySelectorAll('[style*="aspect-ratio"]')
    expect(cards.length).toBe(2)
  })
})
