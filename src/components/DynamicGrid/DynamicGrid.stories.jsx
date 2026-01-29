import DynamicGrid from './DynamicGrid'
import products from '../../data/products'
import Box from '@mui/material/Box'

export default {
  title: '2. Components/DynamicGrid',
  component: DynamicGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Dynamic grid with Framer Motion layout animations.

**Features:**
- Responsive column count based on breakpoint and zoom level
- Animated reordering when products filter/change
- Uses ProductCard for each item
        `,
      },
    },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    products: products.slice(0, 12),
    zoomLevel: 0,
  },
  render: (args) => (
    <Box sx={{ p: 4 }}>
      <DynamicGrid {...args} />
    </Box>
  ),
}

export const ZoomedIn = {
  args: {
    products: products.slice(0, 12),
    zoomLevel: 1,
  },
  render: (args) => (
    <Box sx={{ p: 4 }}>
      <DynamicGrid {...args} />
    </Box>
  ),
}

export const Filtered = {
  args: {
    products: products.filter(p => p.color === 'black'),
    zoomLevel: 0,
  },
  render: (args) => (
    <Box sx={{ p: 4 }}>
      <DynamicGrid {...args} />
    </Box>
  ),
}
