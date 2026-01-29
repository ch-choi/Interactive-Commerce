import { motion, AnimatePresence } from 'framer-motion'
import Box from '@mui/material/Box'
import ProductCard from '../ProductCard'
import { useResponsiveColumns } from '../../hooks/useResponsive'
import { ANIMATION_STATES, TRANSITION } from '../../constants/animations'

function DynamicGrid({
  products,
  zoomLevel = 0,
  onProductClick,
}) {
  const { columns, gap } = useResponsiveColumns(zoomLevel)

  return (
    <Box
      component={motion.div}
      layout
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        width: '100%',
      }}
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            layoutId={`product-${product.id}`}
            initial={ANIMATION_STATES.INITIAL}
            animate={ANIMATION_STATES.ANIMATE}
            exit={ANIMATION_STATES.EXIT}
            transition={TRANSITION.PRODUCT_CARD_LAYOUT}
          >
            <ProductCard
              product={product}
              onClick={onProductClick}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </Box>
  )
}

export default DynamicGrid
