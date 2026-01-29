import { useState, useMemo, useCallback } from 'react'
import Box from '@mui/material/Box'
import Header from '../components/Header'
import GridContainer from '../components/GridContainer'
import ProductDetailView from '../components/ProductDetailView'
import products from '../data/products'

function MainPage() {
  const [zoomLevel, setZoomLevel] = useState(0)
  const [filters, setFilters] = useState({ gender: 'all', color: 'all' })
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const genderMatch = filters.gender === 'all' || product.category === filters.gender
      const colorMatch = filters.color === 'all' || product.color === filters.color
      return genderMatch && colorMatch
    })
  }, [filters])

  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product)
  }, [])

  const handleTransformComplete = useCallback(() => {
    if (selectedProduct) {
      setIsDetailOpen(true)
    }
  }, [selectedProduct])

  const handleDetailClose = useCallback(() => {
    setIsDetailOpen(false)
    setSelectedProduct(null)
  }, [])

  const handleBackClick = useCallback(() => {
    if (isDetailOpen) {
      handleDetailClose()
    } else if (selectedProduct) {
      setSelectedProduct(null)
    } else if (zoomLevel > 0) {
      setZoomLevel(zoomLevel - 1)
    }
  }, [isDetailOpen, selectedProduct, zoomLevel, handleDetailClose])

  const selectedProductIndex = useMemo(() => {
    if (!selectedProduct) return 0
    return filteredProducts.findIndex((p) => p.id === selectedProduct.id)
  }, [selectedProduct, filteredProducts])

  return (
    <Box sx={{ width: '100%', height: '100vh', backgroundColor: '#fff' }}>
      <Header
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        filters={filters}
        onFilterChange={setFilters}
        isDetailView={isDetailOpen}
        onBackClick={handleBackClick}
      />

      <GridContainer
        products={filteredProducts}
        zoomLevel={zoomLevel}
        selectedProductId={selectedProduct?.id}
        onProductClick={handleProductClick}
        onTransformComplete={handleTransformComplete}
      />

      <ProductDetailView
        products={filteredProducts}
        initialProductIndex={selectedProductIndex}
        isOpen={isDetailOpen}
        onClose={handleDetailClose}
      />
    </Box>
  )
}

export default MainPage
