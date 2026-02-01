import { Box, Grid, Paper, Typography, Card, CardContent, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Container, SvgIcon, Stack } from '@mui/material';
import { ShoppingBag, ShoppingCart, Users, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

function StatCard({ title, value, icon, color, trend, trendValue }) {
    return (
        <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)' }}>
            <CardContent>
                <Stack spacing={3}>
                    <Stack direction="row" justifyContent="space-between" spacing={3}>
                        <Stack spacing={1}>
                            <Typography color="text.secondary" variant="overline">
                                {title}
                            </Typography>
                            <Typography variant="h4">
                                {value}
                            </Typography>
                        </Stack>
                        <Avatar sx={{ backgroundColor: color, height: 56, width: 56 }}>
                            <SvgIcon component={icon} inheritViewBox />
                        </Avatar>
                    </Stack>
                    {trend && (
                        <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
                            <Stack alignItems="center" direction="row" spacing={0.5}>
                                <SvgIcon color={trend === 'up' ? 'success' : 'error'} fontSize="small">
                                    <TrendingUp />
                                </SvgIcon>
                                <Typography color={trend === 'up' ? 'success.main' : 'error.main'} variant="body2">
                                    {trendValue}%
                                </Typography>
                            </Stack>
                            <Typography color="text.secondary" variant="caption">
                                Since last month
                            </Typography>
                        </Stack>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default function DashboardPage() {
    const { products, orders, customers } = useAdmin();

    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0).toFixed(2);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 2 // min padding
            }}
        >
            <Container maxWidth={false}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Overview
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="TOTAL REVENUE"
                            value={`$${totalRevenue}`}
                            icon={DollarSign}
                            color="success.main"
                            trend="up"
                            trendValue={12}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="ACTIVE ORDERS"
                            value={orders.length}
                            icon={ShoppingCart}
                            color="primary.main"
                            trend="up"
                            trendValue={8}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="TOTAL PRODUCTS"
                            value={products.length}
                            icon={ShoppingBag}
                            color="warning.main"
                            trend="down"
                            trendValue={2}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={3}>
                        <StatCard
                            title="TOTAL CUSTOMERS"
                            value={customers.length}
                            icon={Users}
                            color="error.main" // Just for variety/matching Devias distinct colors often used
                            trend="up"
                            trendValue={24}
                        />
                    </Grid>

                    <Grid item xs={12} lg={8}>
                        <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)' }}>
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6">Latest Orders</Typography>
                            </Box>
                            <Divider />
                            <TableContainer>
                                <Table>
                                    <TableHead sx={{ bgcolor: 'background.default' }}>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.slice(0, 6).map((order) => (
                                            <TableRow hover key={order.id}>
                                                <TableCell sx={{ fontWeight: 500 }}>
                                                    {order.id}
                                                </TableCell>
                                                <TableCell>
                                                    Customer #{order.customerId}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date().toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={order.status}
                                                        color={order.status === 'Delivered' ? 'success' : 'warning'}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Typography variant="button" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'primary.main' }}>
                                    View All <ArrowRight size={16} style={{ marginLeft: 4 }} />
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.08)' }}>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h6">Latest Products</Typography>
                            </Box>
                            <Divider />
                            <List>
                                {products.slice(0, 5).map((product, index) => (
                                    <ListItem
                                        divider={index < products.length - 1}
                                        key={product.id}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={product.image}
                                                variant="rounded"
                                                sx={{ width: 48, height: 48 }}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={product.name}
                                            secondary={`Updated ${new Date().toLocaleDateString()} • ${product.stock} in stock`}
                                            primaryTypographyProps={{ variant: 'subtitle2' }}
                                            secondaryTypographyProps={{ variant: 'body2' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <Typography variant="button" sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'primary.main' }}>
                                    View All <ArrowRight size={16} style={{ marginLeft: 4 }} />
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
