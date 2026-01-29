import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import GridContainer from './GridContainer'

const mockProducts = [
  { id: 1, name: 'White Hoodie', images: ['/m.mp4', '/1.png', '/2.png'], price: 89.99 },
  { id: 2, name: 'Black Blazer', images: ['/m.mp4', '/1.png', '/2.png'], price: 149.99 },
]

describe('GridContainer', () => {
  it('renders DynamicGrid', () => {
    render(<GridContainer products={mockProducts} />)
    expect(screen.getByText('White Hoodie')).toBeDefined()
    expect(screen.getByText('Black Blazer')).toBeDefined()
  })

  it('handles zoom level changes', () => {
    const { rerender } = render(<GridContainer products={mockProducts} zoomLevel={0} />)
    rerender(<GridContainer products={mockProducts} zoomLevel={1} />)
    expect(screen.getByText('White Hoodie')).toBeDefined()
    expect(screen.getByText('Black Blazer')).toBeDefined()
  })
})
