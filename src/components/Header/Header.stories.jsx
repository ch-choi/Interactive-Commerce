import { useState } from 'react'
import Header from './Header'
import { CartProvider, useCart } from '../../context/CartContext'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default {
  title: '2. Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Header with zoom control, filters, and cart.

**Features:**
- Zoom button: + icon at zoom level 0, < back arrow when zoomed
- Gender filter: All / Men / Women
- Color filter: All / Black / White
- Cart badge: Shows item count from CartContext
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <CartProvider>
        <Story />
      </CartProvider>
    ),
  ],
}

function InteractiveDemo() {
  const [zoomLevel, setZoomLevel] = useState(0)
  const [filters, setFilters] = useState({ gender: 'all', color: 'all' })
  const { addItem } = useCart()

  return (
    <Box>
      <Header
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        filters={filters}
        onFilterChange={setFilters}
        onCartClick={() => console.log('Cart clicked')}
      />
      <Box sx={{ pt: 10, p: 4 }}>
        <p>Zoom Level: {zoomLevel}</p>
        <p>Filters: {JSON.stringify(filters)}</p>
        <Button onClick={() => addItem({ id: 1, name: 'Test', price: 99 })}>
          Add to Cart
        </Button>
      </Box>
    </Box>
  )
}

export const Default = {
  render: () => <InteractiveDemo />,
}

export const ZoomedIn = {
  args: {
    zoomLevel: 1,
    filters: { gender: 'female', color: 'black' },
  },
}

export const DetailView = {
  args: {
    zoomLevel: 2,
    isDetailView: true,
    filters: { gender: 'all', color: 'all' },
  },
}
