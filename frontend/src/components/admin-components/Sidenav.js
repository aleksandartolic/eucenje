import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

import ListItemText from '@mui/material/ListItemText'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import * as React from 'react'
import GroupIcon from '@mui/icons-material/Group'
import styled from 'styled-components'

import classes from './sideNav.module.css'
import { Box } from '@mui/material'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useLocation, useNavigate } from 'react-router-dom'

const links = [
    {
        name: 'Media',
        icon: <SubscriptionsIcon />,
        nested: [
            {
                name: 'Media Overview',
                href: '/admin/media/media-overview',
                icon: <SubscriptionsIcon />,
            },
            {
                name: 'Add Media',
                href: '/admin/media/add-media',
                icon: <AddAPhotoIcon />,
            },
        ],
    },
    {
        name: 'Users',
        icon: <GroupIcon />,
        nested: [
            {
                name: 'Users Overview',
                href: '/admin/users/users-overview',
                icon: <GroupIcon />,
            },
            {
                name: 'Add user',
                href: '/admin/users/add-user',
                icon: <GroupAddIcon />,
            },
        ],
    },
    {
        name: 'Courses',
        icon: <GroupIcon />,
        nested: [
            {
                name: 'Courses Overview',
                href: '/admin/courses/courses-overview',
                icon: <GroupIcon />,
            },
            {
                name: 'Add course',
                href: '/admin/courses/add-course',
                icon: <GroupAddIcon />,
            },
        ],
    },
]

const Sidenav = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [expanded, setExpanded] = React.useState(false)

    const handleChange = panel => (event, isExpanded) => {
        event.stopPropagation()
        setExpanded(isExpanded ? panel : false)
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
                            navigate(`/admin`)
                        }}
                        variant="h3">
                        A d e m y
                    </Typography>
                </LogoDiv>
            </Box>
            <Box mb="auto" mt={3}>
                {links.map((link, index) => (
                    <Accordion
                        id={link.name}
                        sx={{
                            marginTop: `3px`,
                            boxShadow: 0,
                            '&:before': {
                                display: 'none',
                            },
                            color: '#1976d2',
                            backgroundColor: '#fff',
                            border: 'none',
                        }}
                        key={link.name}
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
                                {link.icon}
                            </ListItemIcon>
                            <Typography fontSize={13}>{link.name}</Typography>
                        </AccordionSummary>

                        {link.nested &&
                            link.nested.map(value => (
                                <AccordionDetails
                                    onClick={() => {
                                        navigate(value.href, { replace: true })
                                    }}
                                    key={value.name}
                                    sx={{ padding: '0 0 0 7px' }}>
                                    <AccordionSummary
                                        className={
                                            location.pathname ===
                                            `/${link.name.toLowerCase()}`
                                                ? classes.active
                                                : ' '
                                        }
                                        sx={{
                                            paddingRight: '20px',
                                            backgroundColor: '#fff',
                                            margin: '4px 0 2px 2px',
                                            borderRadius: '3px',
                                        }}>
                                        <ListItemIcon
                                            key={Math.random() * 100000}>
                                            {value.icon}
                                        </ListItemIcon>

                                        <Typography
                                            sx={{ paddingRight: '5px' }}
                                            fontSize={13}>
                                            {value.name}
                                        </Typography>
                                    </AccordionSummary>
                                </AccordionDetails>
                            ))}
                    </Accordion>
                ))}
            </Box>
            <Box pb={4}>
                <List key={Math.random() * 100000}>
                    {['Courses Stats', 'User Stats'].map((text, index) => (
                        <ListItem button key={Math.random() * 100000}>
                            <ListItemIcon key={Math.random() * 100000}>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
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
                    ))}
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
