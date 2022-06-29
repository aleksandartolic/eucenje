import Typography from '@mui/material/Typography'
import List from '@mui/material/List'

import ListItemIcon from '@mui/material/ListItemIcon'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import CategoryIcon from '@mui/icons-material/Category'
import CommentIcon from '@mui/icons-material/Comment'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import * as React from 'react'
import GroupIcon from '@mui/icons-material/Group'
import styled from 'styled-components'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { Box } from '@mui/material'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useNavigate } from 'react-router-dom'
import PreviewIcon from '@mui/icons-material/Preview'
import AddIcon from '@mui/icons-material/Add'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import VisibilityIcon from '@mui/icons-material/Visibility'
const links = [
    {
        name: 'Media',
        icon: <SubscriptionsIcon />,
        nested: [
            {
                name: 'Media Overview',
                href: '/admin/media/media-overview',
                icon: <PreviewIcon />,
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
                icon: <AddIcon />,
            },
        ],
    },
    {
        name: 'Courses',
        icon: <LibraryBooksIcon />,
        nested: [
            {
                name: 'Courses Overview',
                href: '/admin/courses/courses-overview',
                icon: <VisibilityIcon />,
            },
            {
                name: 'Add course',
                href: '/admin/courses/add-course',
                icon: <AddIcon />,
            },
        ],
    },
    {
        name: 'Frontend',
        icon: <ArrowCircleLeftIcon />,
        href: '/student',
    },
]

const Sidenav = () => {
    const navigate = useNavigate()
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = panel => (event, isExpanded) => {
        event.stopPropagation()
        setExpanded(isExpanded ? panel : false)
    }
    return (
        <Box
            border={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                backgroundColor: '#9c27b0',
                color: '#fff',
            }}
            p={2}>
            <Box>
                <LogoDiv>
                    <Typography
                        sx={{ color: '#fff', cursor: 'pointer' }}
                        onClick={() => {
                            navigate(`/admin`)
                        }}
                        variant="h3">
                        A d e m y
                    </Typography>
                </LogoDiv>
            </Box>
            <Box mb="auto" mt={3} border={0}>
                {links.map((link, index) => {
                    if (
                        link.name === 'Categories' ||
                        link.name === 'Comments' ||
                        link.name === 'Frontend'
                    ) {
                        return null
                    }

                    return (
                        <Accordion
                            id={link.name}
                            sx={{
                                '&.Mui-expanded': {
                                    minHeight: 0,
                                },
                                '& .MuiAccordionSummary-content.Mui-expanded': {
                                    margin: '12px 0',
                                },
                                marginTop: `2rem`,
                                boxShadow: 0,
                                '&:before': {
                                    display: 'none',
                                },
                                color: '#fff',
                                backgroundColor: '#9c27b0',
                                border: 'none',
                            }}
                            key={link.name}
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}>
                            <AccordionSummary
                                sx={{
                                    marginBottom: `5px`,
                                    padding: `0 5px 0 5px`,
                                    height: `48px`,
                                    '&.Mui-expanded': {
                                        minHeight: 0,
                                    },
                                    '& .MuiAccordionSummary-content.Mui-expanded': {
                                        margin: '12px 0',
                                    },
                                    backgroundColor: '#9c27b0',
                                    '&:hover': {
                                        backgroundColor: 'rgba(18,83,147,0.4)',
                                        color: '#fff',
                                    },
                                }}
                                expandIcon={
                                    link.nested ? (
                                        <ExpandMoreIcon
                                            sx={{
                                                color: '#fff',
                                                '&:hover': {
                                                    color: '#fff',
                                                },
                                            }}
                                        />
                                    ) : null
                                }
                                aria-controls={`panel${index}bh-content`}
                                id={`panel${index}bh-header`}>
                                <ListItemIcon
                                    sx={{
                                        color: '#fff',
                                    }}
                                    key={Math.random() * 100000}>
                                    {link.icon}
                                </ListItemIcon>
                                <Typography fontSize="15px">
                                    {link.name}
                                </Typography>
                            </AccordionSummary>

                            {link.nested &&
                                link.nested.map(value => (
                                    <AccordionDetails
                                        sx={{
                                            padding: '0 7px 0 7px',
                                        }}
                                        onClick={() => {
                                            navigate(value.href, {
                                                replace: true,
                                            })
                                        }}
                                        key={value.name}>
                                        <AccordionSummary
                                            sx={{
                                                backgroundColor: '#9c27b0',
                                                '&:hover': {
                                                    backgroundColor:
                                                        'rgba(18,83,147,0.4)',
                                                    color: '#fff',
                                                },
                                                paddingRight: '20px',
                                                margin: '4px 0 2px 2px',
                                                borderRadius: '3px',
                                            }}>
                                            <ListItemIcon
                                                sx={{ color: '#fff' }}
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
                    )
                })}
            </Box>
            <Box pb={4}>
                <List key={Math.random() * 100000}>
                    {links.map((link, index) => {
                        if (link.name === 'Frontend') {
                            return (
                                <Accordion
                                    id={link.name}
                                    sx={{
                                        '&.Mui-expanded': {
                                            minHeight: 0,
                                        },
                                        '& .MuiAccordionSummary-content.Mui-expanded': {
                                            margin: '12px 0',
                                        },
                                        marginTop: `2rem`,
                                        boxShadow: 0,
                                        '&:before': {
                                            display: 'none',
                                        },
                                        color: '#fff',
                                        backgroundColor: '#9c27b0',
                                        border: 'none',
                                    }}
                                    key={link.name}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}>
                                    <AccordionSummary
                                        onClick={() => {
                                            navigate(link.href, {
                                                replace: true,
                                            })
                                        }}
                                        sx={{
                                            marginBottom: `5px`,
                                            padding: `0 5px 0 5px`,
                                            height: `48px`,
                                            '&.Mui-expanded': {
                                                minHeight: 0,
                                            },
                                            '& .MuiAccordionSummary-content.Mui-expanded': {
                                                margin: '12px 0',
                                            },
                                            backgroundColor: '#9c27b0',
                                            '&:hover': {
                                                backgroundColor:
                                                    'rgba(18,83,147,0.4)',
                                                color: '#fff',
                                            },
                                        }}
                                        expandIcon={
                                            link.nested ? (
                                                <ExpandMoreIcon
                                                    sx={{
                                                        color: '#fff',
                                                        '&:hover': {
                                                            color: '#fff',
                                                        },
                                                    }}
                                                />
                                            ) : null
                                        }
                                        aria-controls={`panel${index}bh-content`}
                                        id={`panel${index}bh-header`}>
                                        <ListItemIcon
                                            sx={{
                                                color: '#fff',
                                            }}
                                            key={Math.random() * 100000}>
                                            {link.icon}
                                        </ListItemIcon>
                                        <Typography fontSize="15px">
                                            {link.name}
                                        </Typography>
                                    </AccordionSummary>

                                    {link.nested &&
                                        link.nested.map(value => (
                                            <AccordionDetails
                                                sx={{
                                                    padding: '0 7px 0 7px',
                                                }}
                                                onClick={() => {
                                                    navigate(value.href, {
                                                        replace: true,
                                                    })
                                                }}
                                                key={value.name}>
                                                <AccordionSummary
                                                    sx={{
                                                        backgroundColor:
                                                            '#9c27b0',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                'rgba(18,83,147,0.4)',
                                                            color: '#fff',
                                                        },
                                                        paddingRight: '20px',
                                                        margin: '4px 0 2px 2px',
                                                        borderRadius: '3px',
                                                    }}>
                                                    <ListItemIcon
                                                        sx={{ color: '#fff' }}
                                                        key={
                                                            Math.random() *
                                                            100000
                                                        }>
                                                        {value.icon}
                                                    </ListItemIcon>

                                                    <Typography
                                                        sx={{
                                                            paddingRight: '5px',
                                                        }}
                                                        fontSize={13}>
                                                        {value.name}
                                                    </Typography>
                                                </AccordionSummary>
                                            </AccordionDetails>
                                        ))}
                                </Accordion>
                            )
                        }
                        return null
                    })}
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
