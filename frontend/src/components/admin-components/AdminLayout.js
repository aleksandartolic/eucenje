import NavBar from '@/components/admin-components/NavBar'
import { Fragment } from 'react'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Footer from '@/components/admin-components/Footer'
import * as React from 'react'
import {store} from "@/store";
import {Provider} from "react-redux";

const AdminLayout = props => {
    return (
        <Provider store={store}>
        <Fragment>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <NavBar />
                {props.children}
            </Box>
            <Footer />
        </Fragment>
        </Provider>
    )
}
export default AdminLayout
