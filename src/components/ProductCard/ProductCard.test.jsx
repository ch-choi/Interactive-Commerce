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

  it('shows product name', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('White Hoodie')).toBeTruthy()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<ProductCard product={mockProduct} onClick={handleClick} />)
    const card = screen.getByText('White Hoodie').closest('div')
    fireEvent.click(card)
    expect(handleClick).toHaveBeenCalledWith(mockProduct)
  })
})
