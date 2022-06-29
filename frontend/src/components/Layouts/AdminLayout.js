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
                border={0}
                sx={{
                    display: 'flex',
                    height: 'auto',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
