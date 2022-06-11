import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Sidenav from '../../components/admin-components/Sidenav'
import PropTypes from 'prop-types'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const drawerWidth = 240
const Navbar = props => {
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false)
    const { window } = props
    const container =
        window !== undefined ? () => window().document.body : undefined
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}>
                <Toolbar
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Admin Dashboard
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Box mr={3}>
                            <Typography
                                style={{ cursor: 'pointer' }}
                                variant="h6"
                                noWrap
                                component="div">
                                <HomeIcon
                                    onClick={() => {
                                        navigate('/admin')
                                    }}
                                    fontSize="large"
                                />
                            </Typography>
                        </Box>
                        <Box mr={3}>
                            <Typography
                                style={{ cursor: 'pointer' }}
                                variant="h6"
                                noWrap
                                component="div">
                                <AccountCircleIcon
                                    onClick={() => {
                                        navigate(`/admin/profile/${userId}`)
                                    }}
                                    fontSize="large"
                                />
                            </Typography>
                        </Box>
                        <Box mr={3}>
                            <Typography
                                style={{ cursor: 'pointer' }}
                                variant="h6"
                                noWrap
                                component="div">
                                <LogoutIcon
                                    onClick={() => {
                                        navigate('/login')
                                        localStorage.removeItem('userId')
                                    }}
                                    fontSize="large"
                                />
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}>
                    <Sidenav />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open>
                    <Sidenav />
                </Drawer>
            </Box>
        </>
    )
}
export default Navbar
Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}