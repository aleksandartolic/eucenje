import * as React from 'react'
import Box from '@mui/material/Box'

const drawerWidth = 270
export default function Footer() {
    return (
        <Box
            px={2}
            sx={{
                fontSize: '14px',
                color: 'black',
                height: '10vh',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'flex-start',
                float: 'right',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                width: `calc(100% - ${drawerWidth}px)`,
                '@media screen and (max-width: 1200px)': {
                    width: '100%',
                },
                '@media screen and (max-width: 686px)': {
                    flexDirection: 'column',
                    width: '100%',
                    justifyContent: 'center',
                    height: 'auto',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                },
            }}>
            <Box
                sx={{
                    '@media screen and (max-width: 686px)': {
                        width: '100%',
                        justifyContent: 'center',
                        marginBottom: '10%',
                    },
                }}
                width="50%"
                display="flex"
                justifyContent="flex-start">
                <Box mr={2}>Copyright &copy; Ademy Team 2022.</Box>
                <Box>www.ademy.com</Box>
            </Box>
            <Box
                sx={{
                    '@media screen and (max-width: 686px)': {
                        width: '100%',
                        justifyContent: 'space-between',
                    },
                }}
                pl={5}
                width="50%"
                display="flex"
                justifyContent="space-between">
                <Box sx={{ cursor: 'pointer' }}>Courses</Box>
                <Box>Users</Box>
                <Box>Media</Box>
                <Box>Comments</Box>
            </Box>
        </Box>
    )
}
