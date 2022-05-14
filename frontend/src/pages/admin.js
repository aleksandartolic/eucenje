import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import styled from 'styled-components'

import AdminLayout from '@/components/admin-components/AdminLayout'

const drawerWidth = 240

function ResponsiveDrawer() {
    return (
        <AdminLayout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                <Toolbar />
                <Statistic>
                    <StatisticItem>Hello</StatisticItem>
                    <StatisticItem>Hello</StatisticItem>
                </Statistic>
            </Box>
        </AdminLayout>
    )
}

const Statistic = styled.div`
    width: 100%;
    height: 200px;
    background-color: red;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const StatisticItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}

export default ResponsiveDrawer
