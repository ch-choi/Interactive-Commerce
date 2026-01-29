import { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (product) => {
    setItems(prev => [...prev, product])
  }

  const removeItem = (productId) => {
    setItems(prev => {
      const index = prev.findIndex(item => item.id === productId)
      if (index === -1) return prev
      const newItems = [...prev]
      newItems.splice(index, 1)
      return newItems
    })
  }

  const clearCart = () => {
    setItems([])
  }

  const itemCount = items.length

  const value = useMemo(() => ({
    items,
    itemCount,
    addItem,
    removeItem,
    clearCart,
  }), [items, itemCount])

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
