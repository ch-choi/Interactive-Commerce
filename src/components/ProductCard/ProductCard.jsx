import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MediaRenderer from '../../common/media/MediaRenderer'
import { VIDEO_JOG, ANIMATION_STATES, TRANSITION } from '../../constants/animations'

function ProductCard({ product, onClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isJogging, setIsJogging] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!isJogging) return

    const video = videoRef.current
    if (!video) return

    // Ensure video is paused when jogging starts
    video.pause()

    let rafId
    const jogBack = () => {
      if (video.currentTime > 0) {
        video.currentTime = Math.max(0, video.currentTime - (VIDEO_JOG.PLAYBACK_SPEED / VIDEO_JOG.FPS))
        rafId = requestAnimationFrame(jogBack)
      } else {
        setIsJogging(false)
      }
    }

    rafId = requestAnimationFrame(jogBack)

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, [isJogging])

  const videoSrc = product.images[0]
  const thumbnailSrc = product.images[1] || product.images[0]

  const handleMouseEnter = useCallback(() => {
    setIsJogging(false)
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (videoRef.current) {
      setIsJogging(true)
    }
  }, [])

  const handleClick = useCallback(() => {
    onClick?.(product)
  }, [onClick, product])

  const showVideo = isHovered || isJogging

  return (
    <motion.div
      layout
      initial={ANIMATION_STATES.INITIAL}
      animate={ANIMATION_STATES.ANIMATE}
      exit={ANIMATION_STATES.EXIT}
      transition={TRANSITION.PRODUCT_CARD_LAYOUT}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: '#fff',
      }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden' }}>
        <Box
          component="img"
          src={thumbnailSrc}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: showVideo ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />

        {showVideo && (
          <MediaRenderer
            src={videoSrc}
            alt={product.name}
            videoRef={videoRef}
            playbackRate={1.3}
            autoPlay={isHovered}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </Box>

      <Typography variant="body2" sx={{ textAlign: 'center', py: 1, color: '#000', fontWeight: 400 }}>
        {product.name}
      </Typography>
    </motion.div>
  )
}

export default ProductCard
