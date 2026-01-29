import { useState } from 'react'
import GridContainer from './GridContainer'
import products from '../../data/products'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default {
  title: '2. Components/GridContainer',
  component: GridContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Grid container with zoom transform capability.

**Features:**
- Wraps DynamicGrid
- Manages zoom levels (0, 1, 2)
- Transforms to center selected product
        `,
      },
    },
  },
  tags: ['autodocs'],
}

function InteractiveDemo() {
  const [zoomLevel, setZoomLevel] = useState(0)
  const [selectedId, setSelectedId] = useState(null)

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 2, display: 'flex', gap: 2 }}>
        <Button onClick={() => setZoomLevel(0)}>Zoom 0</Button>
        <Button onClick={() => setZoomLevel(1)}>Zoom 1</Button>
        <Button onClick={() => setZoomLevel(2)}>Zoom 2</Button>
        <Button onClick={() => setSelectedId(null)}>Clear Selection</Button>
      </Box>
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <GridContainer
          products={products.slice(0, 16)}
          zoomLevel={zoomLevel}
          selectedProductId={selectedId}
          onProductClick={(p) => setSelectedId(p.id)}
        />
      </Box>
    </Box>
  )
}

export const Default = {
  render: () => <InteractiveDemo />,
}
