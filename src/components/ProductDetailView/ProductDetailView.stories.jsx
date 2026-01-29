import { useState } from 'react'
import ProductDetailView from './ProductDetailView'
import products from '../../data/products'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default {
  title: '2. Components/ProductDetailView',
  component: ProductDetailView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Full-screen product detail overlay with Matrix2DCarousel.

**Features:**
- ESC key to close
- Close button
- Contains Matrix2DCarousel for navigation
        `,
      },
    },
  },
  tags: ['autodocs'],
}

function InteractiveDemo() {
  const [isOpen, setIsOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {products.slice(0, 6).map((product, index) => (
          <Button
            key={product.id}
            variant="outlined"
            onClick={() => {
              setStartIndex(index)
              setIsOpen(true)
            }}
          >
            View {product.name}
          </Button>
        ))}
      </Box>
      
      <ProductDetailView
        products={products.slice(0, 6)}
        initialProductIndex={startIndex}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Box>
  )
}

export const Default = {
  render: () => <InteractiveDemo />,
}

export const OpenByDefault = {
  args: {
    products: products.slice(0, 8),
    initialProductIndex: 0,
    isOpen: true,
  },
}
