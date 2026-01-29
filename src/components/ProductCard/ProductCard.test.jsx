import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from './ProductCard'

const mockProduct = {
  id: 1,
  name: 'White Hoodie',
  images: ['/motion.mp4', '/img1.png', '/img2.png'],
  price: 89.99,
  color: 'white',
  category: 'female',
}

describe('ProductCard', () => {
  it('renders product image', () => {
    render(<ProductCard product={mockProduct} />)
    // The thumbnail image should be visible (images[1] is static thumbnail)
    const img = screen.getByRole('img', { hidden: true }) || document.querySelector('img')
    expect(document.querySelector('img, video')).toBeTruthy()
  })

  it('shows product name and not price', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('White Hoodie')).toBeTruthy()
    expect(screen.queryByText(/89.99/)).toBeNull()
  })

  it('calls onClick when clicking the product name', () => {
    const handleClick = vi.fn()
    render(<ProductCard product={mockProduct} onClick={handleClick} />)
    const nameElement = screen.getByText('White Hoodie')
    fireEvent.click(nameElement)
    expect(handleClick).toHaveBeenCalledWith(mockProduct)
  })
})
