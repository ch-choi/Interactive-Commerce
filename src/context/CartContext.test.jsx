import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'

function TestComponent() {
  const { items, itemCount, addItem, removeItem, clearCart } = useCart()
  return (
    <div>
      <span data-testid="count">{itemCount}</span>
      <span data-testid="items">{JSON.stringify(items)}</span>
      <button onClick={() => addItem({ id: 1, name: 'Test Product', price: 99.99 })}>Add</button>
      <button onClick={() => removeItem(1)}>Remove</button>
      <button onClick={() => clearCart()}>Clear</button>
    </div>
  )
}

describe('CartContext', () => {
  it('starts with empty cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    expect(screen.getByTestId('count').textContent).toBe('0')
    expect(screen.getByTestId('items').textContent).toBe('[]')
  })

  it('adds item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    fireEvent.click(screen.getByText('Add'))
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  it('removes item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Remove'))
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  it('clears cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Add'))
    fireEvent.click(screen.getByText('Clear'))
    expect(screen.getByTestId('count').textContent).toBe('0')
  })
})
