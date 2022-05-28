import { Fragment } from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import Link from 'next/link'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import * as React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import classes from './sideNav.module.css'
import { Box } from '@mui/material'
import { useAuth } from '@/hooks/auth'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Sidenav = () => {
    // const dispatch = useDispatch()
    const router = useRouter()
    const { logout } = useAuth()

    const [expanded, setExpanded] = React.useState(false)

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }
    const logoutUser = e => {
        e.preventDefault()
        logout()
        router.replace('/login')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#fff',
                color: '#1976d2',
                border: 'none',
            }}>
            <Box>
                <LogoDiv>
                    <Typography
                        sx={{ color: '#1976d2', cursor: 'pointer' }}
                        onClick={() => {
                            router.push(`/admin?id=${router.query.id}`)
                        }}
                        variant="h3">
                        A d e m y
                    </Typography>
                </LogoDiv>
            </Box>
            <Box mb="auto" mt={3}>
                <List sx={{ border: 'none' }} key={Math.random() * 100000}>
                    {['Media', 'Users', 'Courses'].map((text, index) => (
                        <Accordion
                            id={text}
                            sx={{
                                marginTop: `3px`,
                                boxShadow: 0,
                                '&:before': {
                                    display: 'none',
                                },
                                '&.Mui-expanded': {
                                    margin: '0',
                                    padding: '0',
                                },
                                color: '#1976d2',
                                backgroundColor: '#fff',
                                border: 'none',
                            }}
                            key={text}
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}>
                            <AccordionSummary
                                sx={{
                                    backgroundColor: '#fff',
                                    '&:hover': {
                                        backgroundColor: 'rgba(18,83,147,0.4)',
                                        color: '#fff',
                                    },
                                }}
                                className={
                                    router.pathname === `/${text.toLowerCase()}`
                                        ? classes.active
                                        : ' '
                                }
                                expandIcon={
                                    <ExpandMoreIcon
                                        sx={{
                                            color: '#1976d2',
                                            '&:hover': {
                                                color: '#fff',
                                            },
                                        }}
                                    />
                                }
                                aria-controls={`panel${index}bh-content`}
                                id={`panel${index}bh-header`}>
                                <ListItemIcon key={Math.random() * 100000}>
                                    {index % 2 === 0 ? (
                                        <InboxIcon sx={{ color: '#1976d2' }} />
                                    ) : (
                                        <MailIcon sx={{ color: '#1976d2' }} />
                                    )}
                                </ListItemIcon>
                                <Typography fontSize={13}>{text}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ padding: '0 0 0 7px' }}>
                                <AccordionSummary
                                    sx={{
                                        paddingRight: '20px',
                                        backgroundColor: '#fff',
                                        margin: '4px 0 2px 2px',
                                        borderRadius: '3px',
                                    }}>
                                    <ListItemIcon key={Math.random() * 100000}>
                                        {index % 2 === 0 ? (
                                            <InboxIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>

                                    <Typography
                                        sx={{ paddingRight: '5px' }}
                                        fontSize={13}>
                                        {`${text}-overview`}
                                    </Typography>
                                </AccordionSummary>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            </Box>
            <Box pb={4}>
                <List key={Math.random() * 100000}>
                    {['Courses Stats', 'User Stats', 'Logout'].map(
                        (text, index) => (
                            <ListItem
                                onClick={text === 'Logout' && logoutUser}
                                button
                                key={Math.random() * 100000}>
                                <ListItemIcon key={Math.random() * 100000}>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    key={Math.random() * 100000}
                                    primary={
                                        <Typography fontSize={14}>
                                            {text}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ),
                    )}
                </List>
            </Box>
        </Box>
    )
}
const LogoDiv = styled.div`
    padding: 3rem;
    border-bottom: 1px solid silver;
    color: #5077be;
    display: flex;
    align-items: center;
    justify-content: center;
`
export default Sidenav
