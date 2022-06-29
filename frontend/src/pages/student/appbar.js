import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SettingsIcon from '@mui/icons-material/Settings'

export default function PrimarySearchAppBar() {
    const [userRole, setUserRole] = useState('')
    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        axios.get(`http://localhost:8001/getUser/${userId}`).then(response => {
            setUserRole(response.data.user.role)
        })
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        onClick={() => {
                            navigate('/student')
                        }}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}>
                        <HomeIcon fontSize="large" />
                    </IconButton>
                    <Typography
                        onClick={() => {
                            navigate('/student')
                        }}
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{
                            cursor: 'pointer',
                            display: { xs: 'none', sm: 'block' },
                        }}>
                        A D E M Y
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            onClick={() => {
                                navigate(`/student/profile/${userId}`)
                            }}
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 4 }}>
                            <AccountCircle fontSize="large" />
                        </IconButton>
                        {((userRole && userRole === 1) || userRole === 2) && (
                            <IconButton
                                onClick={() => {
                                    navigate(`/admin`)
                                }}
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 4 }}>
                                <SettingsIcon fontSize="large" />
                            </IconButton>
                        )}
                        <IconButton
                            onClick={() => {
                                localStorage.removeItem('userId')
                                navigate('/login')
                            }}
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 4 }}>
                            <LogoutIcon fontSize="large" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
