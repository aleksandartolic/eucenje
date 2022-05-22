import NavMenu from "../../components/student-components/navMenu"
import Footer from "../admin-components/Footer"
import { Fragment } from "react"
import { Box } from "@mui/system"
import { CssBaseline } from "@mui/material"
const StudentLayout = (props)=>{

   return <Fragment>
           
                <CssBaseline />
                <NavMenu />
                <Box p={5} sx={{ display: 'flex' }}>
                {props.children}
                 </Box>
            <Footer />
        </Fragment>

}
export default StudentLayout;