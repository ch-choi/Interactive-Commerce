import { Box, Grid, Paper, Typography, Card, CardContent, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import { ShoppingBag, ShoppingCart, Users, TrendingUp, DollarSign } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

function StatCard({ title, value, icon, color, trend }) {
    return (
        <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box p={1.5} borderRadius={2} bgcolor={color + '15'} color={color}>
                        {icon}
                    </Box>
                    <Box
                        px={1} py={0.5}
                        borderRadius={10}
                        bgcolor={trend >= 0 ? 'success.light' : 'error.light'}
                        color={trend >= 0 ? 'success.dark' : 'error.dark'}
                        display="flex" alignItems="center" gap={0.5}
                        fontSize="0.75rem" fontWeight="bold"
                    >
                        <TrendingUp size={14} />
                        {trend > 0 ? '+' : ''}{trend}%
                    </Box>
                </Box>
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                    {value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default function DashboardPage() {
    const { products, orders, customers } = useAdmin();

    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0).toFixed(2);
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Dashboard Overview
                </Typography>
                <Typography color="text.secondary">
                    Welcome back! Here's what's happening with your store today.
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Revenue"
                        value={`$${totalRevenue}`}
                        icon={<DollarSign size={24} />}
                        color="#00C853"
                        trend={12}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Active Orders"
                        value={orders.length}
                        icon={<ShoppingCart size={24} />}
                        color="#2979FF"
                        trend={8}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Products"
                        value={products.length}
                        icon={<ShoppingBag size={24} />}
                        color="#FF6D00"
                        trend={-2}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Customers"
                        value={customers.length}
                        icon={<Users size={24} />}
                        color="#651FFF"
                        trend={24}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                            Recent Orders
                        </Typography>
                        <List>
                            {orders.slice(0, 5).map((order, index) => (
                                <div key={order.id}>
                                    <ListItem sx={{ py: 2, px: 0 }}>
                                        <ListItemAvatar>
                                            <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                                                <ShoppingCart size={20} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography fontWeight="600">{order.id}</Typography>}
                                            secondary={`Customer #${order.customerId} • ${order.items} items`}
                                        />
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography fontWeight="bold">${order.total}</Typography>
                                            <Typography variant="caption" color="text.secondary"
                                                sx={{
                                                    display: 'inline-block',
                                                    px: 1, py: 0.25,
                                                    borderRadius: 1,
                                                    bgcolor: order.status === 'Delivered' ? 'success.light' : 'warning.light',
                                                    color: order.status === 'Delivered' ? 'success.dark' : 'warning.dark'
                                                }}
                                            >
                                                {order.status}
                                            </Typography>
                                        </Box>
                                    </ListItem>
                                    {index < 4 && <Divider variant="inset" component="li" />}
                                </div>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
                            New Customers
                        </Typography>
                        <List>
                            {customers.slice(0, 5).map((customer, index) => (
                                <div key={customer.id}>
                                    <ListItem sx={{ py: 1.5, px: 0 }}>
                                        <ListItemAvatar>
                                            <Avatar src={`https://i.pravatar.cc/150?u=${customer.id}`} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={<Typography fontWeight="500">{customer.name}</Typography>}
                                            secondary={customer.email}
                                        />
                                    </ListItem>
                                    {index < 4 && <Divider variant="inset" component="li" />}
                                </div>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
