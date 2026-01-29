import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import ProductDetailView from './ProductDetailView'

const mockProducts = [
  { id: 1, name: 'White Hoodie', images: ['/m.mp4', '/1.png', '/2.png'], price: 89.99 },
  { id: 2, name: 'Black Blazer', images: ['/m.mp4', '/1.png', '/2.png'], price: 149.99 },
]

describe('ProductDetailView', () => {
  it('renders when isOpen is true', () => {
    render(<ProductDetailView products={mockProducts} isOpen={true} />)
    expect(document.querySelector('button')).toBeTruthy()
  })

  it('does not render when isOpen is false', () => {
    const { container } = render(<ProductDetailView products={mockProducts} isOpen={false} />)
    expect(container.querySelector('[style*="position: fixed"]')).toBeFalsy()
  })

  it('calls onClose when close button clicked', () => {
    const handleClose = vi.fn()
    render(<ProductDetailView products={mockProducts} isOpen={true} onClose={handleClose} />)
    const closeButton = document.querySelector('button')
    if (closeButton) fireEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalled()
  })
})
