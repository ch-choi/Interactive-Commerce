import { useRef, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import DynamicGrid from '../DynamicGrid'
import { useResponsive } from '../../hooks/useResponsive'
import { TRANSITION } from '../../constants/animations'

function GridContainer({
  products,
  zoomLevel = 0,
  selectedProductId = null,
  onProductClick,
  onTransformComplete,
}) {
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const { config } = useResponsive()

  const transform = useMemo(() => {
    if (!selectedProductId || !containerRef.current || !wrapperRef.current) {
      return { x: 0, y: 0, scale: 1 }
    }

    const container = containerRef.current
    const wrapper = wrapperRef.current
    const productEl = wrapper.querySelector(`[data-product-id="${selectedProductId}"]`)

    if (!productEl) {
      return { x: 0, y: 0, scale: 1 }
    }

    const containerRect = container.getBoundingClientRect()
    const productRect = productEl.getBoundingClientRect()

    const containerCenterX = containerRect.width / 2
    const containerCenterY = containerRect.height / 2

    const productCenterX = productRect.left - containerRect.left + productRect.width / 2
    const productCenterY = productRect.top - containerRect.top + productRect.height / 2

    const scale = 2.5
    const x = (containerCenterX - productCenterX) * scale
    const y = (containerCenterY - productCenterY) * scale

    return { x, y, scale }
  }, [selectedProductId])

  const handleProductClick = useCallback((product) => {
    onProductClick?.(product)
  }, [onProductClick])

  const handleAnimationComplete = useCallback(() => {
    if (selectedProductId) {
      onTransformComplete?.()
    }
  }, [selectedProductId, onTransformComplete])

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: config?.containerPadding || '120px 64px 0 64px',
      }}
    >
      <motion.div
        ref={wrapperRef}
        animate={{
          x: transform.x,
          y: transform.y,
          scale: transform.scale,
        }}
        transition={TRANSITION.GRID_ZOOM}
        onAnimationComplete={handleAnimationComplete}
        style={{
          width: '100%',
          transformOrigin: 'center center',
        }}
      >
        <DynamicGrid
          products={products}
          zoomLevel={zoomLevel}
          onProductClick={handleProductClick}
        />
      </motion.div>
    </Box>
  )
}

export default GridContainer
