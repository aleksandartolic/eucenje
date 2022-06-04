import Navbar from '../../components/admin-components/Navbar'
import { Fragment } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Footer from '../../components/admin-components/Footer'
import * as React from 'react'

const AdminLayout = props => {
    return (
        <Fragment>
            <Box
                sx={{
                    display: 'flex',
                    height: '85vh',
                }}>
                <CssBaseline />
                <Navbar />
                {props.children}
            </Box>
            <Footer />
        </Fragment>
    )
}
export default AdminLayout
