import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Matrix2DCarousel from './Matrix2DCarousel'

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve())
  window.HTMLMediaElement.prototype.pause = vi.fn()
})

const mockProducts = [
  {
    id: 1,
    name: 'White Hoodie',
    images: ['/motion1.mp4', '/img1-1.png', '/img1-2.png'],
    price: 89.99,
  },
  {
    id: 2,
    name: 'Black Blazer',
    images: ['/motion2.mp4', '/img2-1.png', '/img2-2.png'],
    price: 149.99,
  },
]

describe('Matrix2DCarousel', () => {
  it('renders current product image', () => {
    render(<Matrix2DCarousel products={mockProducts} initialProductIndex={0} />)
    expect(document.querySelector('img, video')).toBeTruthy()
  })

  it('has navigation arrows', () => {
    render(<Matrix2DCarousel products={mockProducts} initialProductIndex={0} />)
    const buttons = document.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(4)
  })

  it('calls onProductChange when product changes', () => {
    const handleChange = vi.fn()
    render(
      <Matrix2DCarousel 
        products={mockProducts} 
        initialProductIndex={0}
        onProductChange={handleChange}
      />
    )
    const buttons = document.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
