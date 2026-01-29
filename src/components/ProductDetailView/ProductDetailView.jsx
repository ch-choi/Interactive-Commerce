import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { X } from '@phosphor-icons/react'
import Matrix2DCarousel from '../Matrix2DCarousel'
import { useResponsive } from '../../hooks/useResponsive'
import { ANIMATION_STATES, TRANSITION } from '../../constants/animations'

function ProductDetailView({
  products,
  initialProductIndex = 0,
  isOpen = false,
  onClose,
  onProductChange,
}) {
  const { config } = useResponsive()

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose?.()
    }
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 210,
              color: '#000',
            }}
          >
            <X size={24} weight="light" />
          </IconButton>

          <motion.div
            initial={ANIMATION_STATES.INITIAL}
            animate={ANIMATION_STATES.ANIMATE}
            exit={ANIMATION_STATES.EXIT}
            transition={TRANSITION.PRODUCT_CARD_LAYOUT}
          >
            <Matrix2DCarousel
              products={products}
              initialProductIndex={initialProductIndex}
              onProductChange={onProductChange}
              onClose={onClose}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProductDetailView
