import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton } from '@mui/material';
import { Eye } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function OrderManagePage() {
    const { orders } = useAdmin();

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return { bg: 'success.light', color: 'success.dark' };
            case 'Processing': return { bg: 'info.light', color: 'info.dark' };
            case 'Shipped': return { bg: 'primary.light', color: 'primary.dark' };
            default: return { bg: 'warning.light', color: 'warning.dark' };
        }
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Orders
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                Manage customer orders
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Customer ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Items</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => {
                            const statusStyle = getStatusColor(order.status);
                            return (
                                <TableRow key={order.id} hover>
                                    <TableCell fontWeight="500">{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>Customer #{order.customerId}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.status}
                                            size="small"
                                            sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 500 }}
                                        />
                                    </TableCell>
                                    <TableCell>${order.total}</TableCell>
                                    <TableCell>{order.items}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small">
                                            <Eye size={18} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
