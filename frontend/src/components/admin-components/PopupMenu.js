// @ts-nocheck
import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreIcon from '@mui/icons-material/MoreVert'
import Link from 'next/link'
import { useState } from 'react'

const BasicMenu = props => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = event => {
        props.stopPropagation(event)

        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleDelete = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <MoreIcon
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem>
                    <Link href="/userId">Edit</Link>
                </MenuItem>
            </Menu>
        </div>
    )
}
export default BasicMenu