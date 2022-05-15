import NavBar from '@/components/admin-components/NavBar'
import { Fragment } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Footer from '@/components/admin-components/Footer'
import * as React from 'react'

const AdminLayout = props => {
    return (
        <Fragment>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <NavBar />
                {props.children}
            </Box>
            <Footer />
        </Fragment>
    )
}
export default AdminLayout
