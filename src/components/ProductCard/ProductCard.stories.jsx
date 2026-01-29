import ProductCard from './ProductCard'
import products from '../../data/products'
import Box from '@mui/material/Box'

export default {
  title: '2. Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Product card with hover video playback and jogging effect.

## Features
- Displays product thumbnail image
- On hover: plays product video at 1.3x speed
- On mouse out: reverses video playback (jogging effect)
- Shows price overlay

## Usage
\`\`\`jsx
<ProductCard 
  product={product} 
  onClick={(product) => console.log(product)}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

export const Default = {
  args: {
    product: products[0],
  },
  render: (args) => (
    <Box sx={{ width: 300, height: 300 }}>
      <ProductCard {...args} />
    </Box>
  ),
}

export const Multiple = {
  render: () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 200px)', gap: 2 }}>
      {products.slice(0, 6).map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={(p) => console.log('Clicked:', p.name)}
        />
      ))}
    </Box>
  ),
}
