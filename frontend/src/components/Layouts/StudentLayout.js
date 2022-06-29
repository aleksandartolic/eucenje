import Footer from '../admin-components/Footer'
import Navbar from '../../pages/student/appbar'
import { Box } from '@mui/material'

const StudentLayout = props => {
    return (
        <Box display="flex" flexDirection="column">
            <Navbar />
            <Box
                height
                p={5}
                sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', display: 'flex' }}>
                {props.children}
            </Box>
            <Footer />
        </Box>
    )
}
export default StudentLayout
