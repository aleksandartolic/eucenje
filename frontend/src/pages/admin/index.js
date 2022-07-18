import * as React from 'react'

import Box from '@mui/material/Box'

import AdminLayout from '../../components/Layouts/AdminLayout'
import Dashboard from '../../components/admin-components/Dashboard'
const drawerWidth = 240

function Admin() {
    return (
        <AdminLayout>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                <Dashboard />
            </Box>
        </AdminLayout>
    )
}

export default Admin
