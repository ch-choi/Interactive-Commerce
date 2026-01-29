import Matrix2DCarousel from './Matrix2DCarousel'
import products from '../../data/products'
import Box from '@mui/material/Box'

export default {
  title: '2. Components/Matrix2DCarousel',
  component: Matrix2DCarousel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
2D carousel for product detail navigation.

**Navigation:**
- Left/Right arrows: Cycle through images of current product
- Up/Down arrows or Wheel scroll: Cycle through different products
- Keyboard: Arrow keys for navigation, ESC to close
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    products: products.slice(0, 8),
    initialProductIndex: 0,
    initialImageIndex: 0,
  },
  render: (args) => (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
    }}>
      <Matrix2DCarousel {...args} />
    </Box>
  ),
}

export const StartFromMiddle = {
  args: {
    products: products.slice(0, 8),
    initialProductIndex: 3,
    initialImageIndex: 1,
  },
  render: (args) => (
    <Box sx={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
    }}>
      <Matrix2DCarousel {...args} />
    </Box>
  ),
}
