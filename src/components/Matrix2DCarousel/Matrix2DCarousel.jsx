import { useState, useCallback, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Box from '@mui/material/Box'
import ArrowButton from '../../common/ui/ArrowButton'
import Indicator from '../../common/ui/Indicator'
import MediaRenderer from '../../common/media/MediaRenderer'
import { useResponsive } from '../../hooks/useResponsive'

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
}

function Matrix2DCarousel({
  products,
  initialProductIndex = 0,
  initialImageIndex = 0,
  onProductChange,
  onClose,
}) {
  const [productIndex, setProductIndex] = useState(initialProductIndex)
  const [imageIndex, setImageIndex] = useState(initialImageIndex)
  const [direction, setDirection] = useState(0)
  const containerRef = useRef(null)
  const { config } = useResponsive()

  // Sync state with props
  useEffect(() => {
    setProductIndex(initialProductIndex)
    setImageIndex(initialImageIndex)
  }, [initialProductIndex, initialImageIndex])

  const currentProduct = products[productIndex]
  const currentImages = currentProduct?.images || []

  // Horizontal navigation (images within product)
  const goToNextImage = useCallback(() => {
    setDirection(1)
    setImageIndex((prev) => (prev + 1) % currentImages.length)
  }, [currentImages.length])

  const goToPrevImage = useCallback(() => {
    setDirection(-1)
    setImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
  }, [currentImages.length])

  // Vertical navigation (between products)
  const goToNextProduct = useCallback(() => {
    const newIndex = (productIndex + 1) % products.length
    setProductIndex(newIndex)
    setImageIndex(0)
    onProductChange?.(products[newIndex], newIndex)
  }, [productIndex, products, onProductChange])

  const goToPrevProduct = useCallback(() => {
    const newIndex = (productIndex - 1 + products.length) % products.length
    setProductIndex(newIndex)
    setImageIndex(0)
    onProductChange?.(products[newIndex], newIndex)
  }, [productIndex, products, onProductChange])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          goToPrevImage()
          break
        case 'ArrowRight':
          e.preventDefault()
          goToNextImage()
          break
        case 'ArrowUp':
          e.preventDefault()
          goToPrevProduct()
          break
        case 'ArrowDown':
          e.preventDefault()
          goToNextProduct()
          break
        case 'Escape':
          e.preventDefault()
          onClose?.()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNextImage, goToPrevImage, goToNextProduct, goToPrevProduct, onClose])

  // Wheel navigation (vertical product change)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let wheelTimeout = null
    const handleWheel = (e) => {
      e.preventDefault()
      if (wheelTimeout) return

      if (e.deltaY > 0) {
        goToNextProduct()
      } else if (e.deltaY < 0) {
        goToPrevProduct()
      }

      wheelTimeout = setTimeout(() => {
        wheelTimeout = null
      }, 300)
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (wheelTimeout) clearTimeout(wheelTimeout)
    }
  }, [goToNextProduct, goToPrevProduct])

  if (!currentProduct) return null

  const arrowSize = config?.detailArrowSize || 40
  const arrowPosition = config?.detailArrowPosition || 20

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: config?.detailViewWidth || '70vw',
        height: config?.detailViewHeight || '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Media display */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={`${productIndex}-${imageIndex}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MediaRenderer
            src={currentImages[imageIndex]}
            alt={`${currentProduct.name} - Image ${imageIndex + 1}`}
            playbackRate={1.3}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Horizontal arrows (left/right for images) */}
      <ArrowButton
        direction="left"
        onClick={goToPrevImage}
        size={arrowSize}
        position={arrowPosition}
        sx={{ top: '50%', transform: 'translateY(-50%)' }}
      />
      <ArrowButton
        direction="right"
        onClick={goToNextImage}
        size={arrowSize}
        position={arrowPosition}
        sx={{ top: '50%', transform: 'translateY(-50%)' }}
      />

      {/* Vertical arrows (up/down for products) */}
      <ArrowButton
        direction="up"
        onClick={goToPrevProduct}
        size={arrowSize}
        position={arrowPosition}
        sx={{ left: '50%', transform: 'translateX(-50%)' }}
      />
      <ArrowButton
        direction="down"
        onClick={goToNextProduct}
        size={arrowSize}
        position={arrowPosition}
        sx={{ left: '50%', transform: 'translateX(-50%)' }}
      />

      {/* Image indicator (horizontal position) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Indicator
          total={currentImages.length}
          current={imageIndex}
          onSelect={setImageIndex}
          size={config?.detailIndicatorSize || 8}
          marginTop="0"
        />
      </Box>
    </Box>
  )
}

export default Matrix2DCarousel
