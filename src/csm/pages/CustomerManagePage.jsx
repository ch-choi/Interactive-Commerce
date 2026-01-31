import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, IconButton } from '@mui/material';
import { MoreHorizontal } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function CustomerManagePage() {
    const { customers } = useAdmin();

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Customers
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
                View and manage customer base
            </Typography>

            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>User</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Join Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Total Spent</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.id} hover>
                                <TableCell>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Avatar src={`https://i.pravatar.cc/150?u=${customer.id}`} />
                                        <Typography fontWeight="500">{customer.name}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.joinDate}</TableCell>
                                <TableCell>${customer.totalSpent}</TableCell>
                                <TableCell align="right">
                                    <IconButton size="small">
                                        <MoreHorizontal size={18} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
