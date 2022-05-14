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
                <List key={Math.random()* 100000}>
                    {['Media', 'Users', 'Courses'].map((text, index) => (
                        <Link
                            key={Math.random()* 10000}
                            style={{ textDecoration: 'none' }}
                            href={'/' + text.toLowerCase()}>
                            <ListItem
                                key={Math.random()* 100000}
                                className={
                                    router.pathname == '/' ? 'active' : ''
                                }
                                >
                                <ListItemIcon key={Math.random()* 100000}>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    key={Math.random()* 100000}
                                    primary={
                                        <Typography fontSize={14}>
                                            {text}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider key={Math.random()* 100000} />
                <List key={Math.random()* 100000}>
                    {['Courses Stats', 'User Stats', 'Logout'].map(
                        (text, index) => (
                            <ListItem button key={Math.random()* 100000}>
                                <ListItemIcon key={Math.random()* 100000}>
                                    {index % 2 === 0 ? (
                                        <InboxIcon />
                                    ) : (
                                        <MailIcon />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    key={Math.random()* 100000}
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
