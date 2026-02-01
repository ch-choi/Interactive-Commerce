import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, Avatar, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { LayoutDashboard, ShoppingBag, ShoppingCart, Users, LogOut, Menu as MenuIcon } from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const drawerWidth = 280;

const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
    { text: 'Products', icon: <ShoppingBag size={20} />, path: '/admin/products' },
    { text: 'Orders', icon: <ShoppingCart size={20} />, path: '/admin/orders' },
    { text: 'Customers', icon: <Users size={20} />, path: '/admin/customers' },
];

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setMobileOpen(false);
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1C2536', color: 'white' }}>
            <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 2 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                    CSM ADMIN
                </Typography>
            </Toolbar>
            <List sx={{ flexGrow: 1, px: 2 }}>
                {menuItems.map((item) => {
                    const isSelected = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)}
                                selected={isSelected}
                                sx={{
                                    borderRadius: 2,
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'white',
                                        },
                                    },
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: isSelected ? 'white' : 'grey.400', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: isSelected ? 600 : 400 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
            <Box sx={{ p: 2 }}>
                <ListItemButton
                    onClick={() => navigate('/')}
                    sx={{
                        borderRadius: 2,
                        color: 'grey.400',
                        '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)', color: 'white' }
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                        <LogOut size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Back to Store" />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    bgcolor: 'white',
                    color: 'text.primary',
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Admin User
                        </Typography>
                        <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>A</Avatar>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3, // Restore some padding but could be 0 if needed
                    pt: 11, // Adjust for AppBar (mt: 8 + extra)
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%', // Explicitly take full width
                    overflow: 'auto',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
}
