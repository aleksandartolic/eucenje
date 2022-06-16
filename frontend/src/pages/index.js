import { Link } from 'react-router-dom'
import { Box, Button, Typography } from '@mui/material'
import image from '../assets/images/logo1.png'
export default function Home() {
    return (
        <Box className="container">
            <Box className="nav">
                <Box mt={-6} className="nav__logo">
                    <img width={200} height={200} src={image} alt="logo" />
                </Box>
                <Box className="nav__items">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </Box>
            </Box>
            <Box
                pt={20}
                pr={9}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-end">
                <Box display="flex" flexWrap="nowrap" mb={2}>
                    <Typography variant="h1" color="#fff">
                        Welcome to the<span>&nbsp;</span>
                    </Typography>
                    <Typography
                        letterSpacing="initial"
                        variant="h1"
                        color="secondary">
                        {' '}
                        Ademy
                    </Typography>
                </Box>
                <Box width="37%" mb={2}>
                    <Typography mb={3} variant="h3" color="#d5d5d5">
                        Choose from 185,000 online video courses with new
                        additions published every month
                    </Typography>
                    <Button size="large" color="secondary" variant="contained">
                        Get Started
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
