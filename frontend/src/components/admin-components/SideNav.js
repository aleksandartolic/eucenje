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

const SideNav = () => {
    const router = useRouter()

    return (
        <Fragment>
            <div>
                <LogoDiv>
                    <Typography variant="h3">A d e m y</Typography>
                </LogoDiv>
                <List>
                    {['Media', 'Users', 'Courses'].map((text, index) => (
                        <Link
                            key={text}
                            style={{ textDecoration: 'none' }}
                            href={'/' + text.toLowerCase()}>
                            <ListItem
                                className={
                                    router.pathname == '/' ? 'active' : ''
                                }
                                key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography fontSize={16}>
                                            {text}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Courses Stats', 'User Stats', 'Logout'].map(
                        (text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Typography fontSize={16}>
                                            {text}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ),
                    )}
                </List>
            </div>
        </Fragment>
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
export default SideNav
