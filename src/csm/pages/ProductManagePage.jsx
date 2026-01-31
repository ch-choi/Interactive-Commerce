import { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton, Button, TextField, InputAdornment } from '@mui/material';
import { Pencil, Trash2, Plus, Search, Filter } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import AddProductModal from '../components/AddProductModal';

export default function ProductManagePage() {
    const { products, addProduct, updateProduct, deleteProduct } = useAdmin();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleSaveProduct = (productData) => {
        if (editingProduct) {
            updateProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }
        setIsAddModalOpen(false);
        setEditingProduct(null);
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setIsAddModalOpen(true);
    };

    const handleAddClick = () => {
        setEditingProduct(null);
        setIsAddModalOpen(true);
    };

    const handleModalClose = () => {
        setIsAddModalOpen(false);
        setEditingProduct(null);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    return (
        <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
            {/* Header Section */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                <Box>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Products
                    </Typography>
                    <Typography color="text.secondary">
                        Manage your store inventory
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Plus size={20} />}
                    sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
                    onClick={handleAddClick}
                >
                    Add Product
                </Button>
            </Box>

            {/* Add/Edit Product Modal */}
            <AddProductModal
                open={isAddModalOpen}
                onClose={handleModalClose}
                onSave={handleSaveProduct}
                productToEdit={editingProduct}
            />

            {/* Filter Section */}
            <Paper sx={{ mb: 3, p: 2, borderRadius: 2, display: 'flex', gap: 2, flexShrink: 0 }}>
                <TextField
                    placeholder="Search products..."
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={20} color="gray" />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="outlined" startIcon={<Filter size={18} />}>
                    Filter
                </Button>
            </Paper>

            {/* Scrollable Table Container */}
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', flexGrow: 1, overflow: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Color</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id} hover>
                                <TableCell>
                                    {(() => {
                                        if (!product.images || product.images.length === 0) return null;

                                        // Specific logic: find the first image that is NOT a video
                                        const thumbnail = product.images.find(img =>
                                            typeof img === 'string' &&
                                            !img.endsWith('.mp4') &&
                                            !img.startsWith('data:video') &&
                                            !img.startsWith('blob:')
                                        ) || product.images[0]; // Fallback to first item if all are videos (unlikely) or just 1 item

                                        // If the fallback is still a video, we might want to show a placeholder or just render it as img (which will fail/empty but user wants image)
                                        // But usually product.images[1] is the static product shot.

                                        return (
                                            <img
                                                src={thumbnail}
                                                alt={product.name}
                                                style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }}
                                                onError={(e) => { e.target.style.display = 'none'; }}
                                            />
                                        );
                                    })()}
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight="500">{product.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">ID: {product.id}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={product.category}
                                        size="small"
                                        sx={{ textTransform: 'capitalize', bgcolor: product.category === 'male' ? 'blue.50' : 'pink.50', color: product.category === 'male' ? 'blue.700' : 'pink.700' }}
                                    />
                                </TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: product.color, border: '1px solid #ddd' }} />
                                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>{product.color}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" sx={{ color: 'primary.main', mr: 1 }} onClick={() => handleEditClick(product)}>
                                        <Pencil size={18} />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: 'error.main' }} onClick={() => handleDelete(product.id)}>
                                        <Trash2 size={18} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredProducts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                    <Typography color="text.secondary">No products found matching your search.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
