import { useCallback } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import Stack from '@mui/material/Stack'
import { Plus, ArrowLeft, ShoppingBag, TShirt, Dress, GridFour } from '@phosphor-icons/react'
import { useCart } from '../../context/CartContext'
import { useResponsive } from '../../hooks/useResponsive'

function Header({
  zoomLevel = 0,
  onZoomChange,
  filters = { gender: 'all', color: 'all' },
  onFilterChange,
  onCartClick,
  isDetailView = false,
  onBackClick,
}) {
  const { itemCount } = useCart()
  const { config } = useResponsive()

  const handleZoomClick = useCallback(() => {
    if (isDetailView) {
      onBackClick?.()
    } else if (zoomLevel > 0) {
      onZoomChange?.(zoomLevel - 1)
    } else {
      onZoomChange?.(zoomLevel + 1)
    }
  }, [zoomLevel, isDetailView, onZoomChange, onBackClick])

  const handleGenderFilter = useCallback((gender) => {
    onFilterChange?.({ ...filters, gender })
  }, [filters, onFilterChange])

  const handleColorFilter = useCallback((color) => {
    onFilterChange?.({ ...filters, color })
  }, [filters, onFilterChange])

  const buttonSize = config?.headerButtonSize || 40
  const showBackButton = isDetailView || zoomLevel > 0

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: config?.headerPadding || '20px 40px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <IconButton
          onClick={handleZoomClick}
          sx={{
            width: buttonSize,
            height: buttonSize,
            color: '#000',
          }}
        >
          {showBackButton ? (
            <ArrowLeft size={24} weight="light" />
          ) : (
            <Plus size={24} weight="light" />
          )}
        </IconButton>
      </Box>

      <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={0.5}>
            <IconButton
              onClick={() => handleGenderFilter('all')}
              data-testid="filter-gender-all"
              sx={{
                width: 32,
                height: 32,
                color: '#000',
                backgroundColor: filters.gender === 'all' ? '#f0f0f0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <GridFour size={20} weight="light" />
            </IconButton>
            <IconButton
              onClick={() => handleGenderFilter('male')}
              data-testid="filter-gender-male"
              sx={{
                width: 32,
                height: 32,
                color: '#000',
                backgroundColor: filters.gender === 'male' ? '#f0f0f0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <TShirt size={20} weight="light" />
            </IconButton>
            <IconButton
              onClick={() => handleGenderFilter('female')}
              data-testid="filter-gender-female"
              sx={{
                width: 32,
                height: 32,
                color: '#000',
                backgroundColor: filters.gender === 'female' ? '#f0f0f0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Dress size={20} weight="light" />
            </IconButton>
          </Stack>

          <Box sx={{ width: 1, height: 16, backgroundColor: '#e0e0e0', mx: 1 }} />

          <Stack direction="row" spacing={0.5}>
            <Button
              size="small"
              onClick={() => handleColorFilter('all')}
              data-testid="filter-color-all"
              sx={{
                minWidth: 'auto',
                px: 1.5,
                py: 0.5,
                fontSize: '13px',
                fontWeight: filters.color === 'all' ? 600 : 400,
                color: '#000',
                backgroundColor: filters.color === 'all' ? '#f0f0f0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              all
            </Button>
            <IconButton
              onClick={() => handleColorFilter('white')}
              data-testid="filter-color-white"
              sx={{
                width: 32,
                height: 32,
                padding: 0,
                backgroundColor: filters.color === 'white' ? '#f0f0f0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => handleColorFilter('black')}
              data-testid="filter-color-black"
              sx={{
                width: 32,
                height: 32,
                padding: 0,
                backgroundColor: filters.color === 'black' ? '#f0f0f0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: '#000',
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton
          onClick={onCartClick}
          sx={{
            width: buttonSize,
            height: buttonSize,
            color: '#000',
          }}
        >
          <Badge badgeContent={itemCount} color="primary">
            <ShoppingBag size={24} weight="light" />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  )
}

export default Header
