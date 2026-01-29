import { CartProvider, useCart } from './CartContext'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default {
  title: '2. Components/CartContext',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Cart state management using React Context. Provides addItem, removeItem, clearCart, and itemCount.',
      },
    },
  },
  tags: ['autodocs'],
}

function CartDemo() {
  const { items, itemCount, addItem, removeItem, clearCart } = useCart()
  
  const sampleProducts = [
    { id: 1, name: 'White Hoodie', price: 89.99 },
    { id: 2, name: 'Black Blazer', price: 149.99 },
    { id: 3, name: 'White Pants', price: 79.99 },
  ]

  return (
    <Box sx={{ p: 4, minWidth: 400 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Cart ({itemCount} items)
      </Typography>
      
      <Stack spacing={1} sx={{ mb: 3 }}>
        {sampleProducts.map(product => (
          <Box key={product.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{product.name} - ${product.price}</Typography>
            <Button size="small" onClick={() => addItem(product)}>Add</Button>
          </Box>
        ))}
      </Stack>

      <Typography variant="subtitle2" sx={{ mb: 1 }}>Cart Items:</Typography>
      <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1, minHeight: 60 }}>
        {items.length === 0 ? (
          <Typography color="text.secondary">Cart is empty</Typography>
        ) : (
          items.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2">{item.name}</Typography>
              <Button size="small" color="error" onClick={() => removeItem(item.id)}>Remove</Button>
            </Box>
          ))
        )}
      </Box>

      <Button variant="outlined" onClick={clearCart} disabled={items.length === 0}>
        Clear Cart
      </Button>
    </Box>
  )
}

export const Demo = {
  render: () => (
    <CartProvider>
      <CartDemo />
    </CartProvider>
  ),
}
