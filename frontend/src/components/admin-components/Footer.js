import * as React from 'react'
import Box from '@mui/material/Box'
import styled from 'styled-components'
export default function Footer() {
    return (
        <Box
            sx={{ width: '100%' }}
            style={{
                position: 'absolute',
                bottom: 0,
                height: '100px',
                fontSize: '1.2rem',
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '1rem 1rem 1rem 1rem',
                alignItems: 'flex-end',
            }}>
            <FooterActions>
                <Company>
                    <FooterAction>
                        Copyright &copy; Ademy Team 2022.
                    </FooterAction>
                    <FooterAction>www.ademy.com</FooterAction>
                </Company>
                <Navigation>
                    <FooterAction>Courses</FooterAction>
                    <FooterAction>Users</FooterAction>
                    <FooterAction>Comments</FooterAction>
                </Navigation>
            </FooterActions>
        </Box>
    )
}
const FooterActions = styled.div`
    display: flex;
    width: 80%;
    height: 30px;
    justify-content: space-between;
    padding-right: 100px;
`
const Company = styled.div`
    display: flex;
    justify-content: flex-start;
    flex: 1;
`
const Navigation = styled.div`
    display: flex;
    //justify-content: space-between;
`
const FooterAction = styled.a`
    margin-right: 50px;
`
