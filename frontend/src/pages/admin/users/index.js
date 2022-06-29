import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
const drawerWidth = 240
import AdminLayout from '../../../components/Layouts/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MediaToolbar from '../../../pages/admin/media/mediaToolbar'

const Users = () => {
    const [rows, setRows] = useState([])
    const [selectedRowId, setSelectedRowId] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const [pageSize, setPageSize] = useState(10)

    const handleClick = event => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const [loading, setLoading] = useState(false)

    const { addToast } = useToasts()
    const navigate = useNavigate()

    const editUser = e => {
        e.preventDefault()
        navigate(`/admin/users/edit-profile/${selectedRowId}`, {
            replace: true,
        })
    }
    const getData = () => {
        setLoading(true)
        axios.get('http://localhost:8001/listUsers').then(value => {
            setRows(value.data.response)
        })
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])

    const handleDelete = () => {
        setAnchorEl(null)
        console.log('executed')
        if (selectedRowId.length !== 0) {
            axios
                .delete(`http://localhost:8001/deleteUser/${selectedRowId}/`)
                .then(() => {
                    getData()
                })

            addToast(`User deleted successfully`, {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'success',
            })
        } else {
            addToast(`Please select user`, {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'error',
            })
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
        },
        {
            disableColumnMenu: true,
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: () => {
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
                            <MenuItem onClick={editUser}>Edit</MenuItem>
                        </Menu>
                    </div>
                )
            },
            width: 80,
        },
        {
            disableColumnMenu: true,
            headerName: 'delete icon',
            field: 'delete icon',
            renderHeader: () => (
                <DeleteIcon
                    color="info"
                    fontSize="large"
                    sx={{ cursor: 'pointer', marginTop: '20px' }}
                    onClick={() => {
                        console.log(selectedRowId)
                        if (selectedRowId.length !== 0) {
                            console.log
                            axios
                                .delete(
                                    `http://localhost:8001/deleteUsers/${selectedRowId.join(
                                        ',',
                                    )}/`,
                                    {},
                                )
                                .then(() => {
                                    getData()
                                })
                                .catch(error => {
                                    throw new Error(`${error.message}`)
                                })

                            addToast(`User deleted successfully`, {
                                autoDismiss: true,
                                autoDismissTimeout: 5000,
                                appearance: 'success',
                            })

                            setLoading(false)
                        } else {
                            addToast(`Please select user`, {
                                autoDismiss: true,
                                autoDismissTimeout: 5000,
                                appearance: 'error',
                            })
                        }
                    }}
                />
            ),
            width: 60,
            sortable: false,
            headerAlign: 'center',
        },
    ]

    return (
        <Fragment>
            <AdminLayout>
                <Box
                    component="main"
                    mt={10}
                    sx={{
                        flexGrow: 1,
                        p: 7,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}>
                    <Box pb={4} pl={2}>
                        <Typography color="#9c27b0" variant="h4">
                            Users
                        </Typography>
                    </Box>
                    <Box pt={2} sx={{ width: '100%' }}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <DataGrid
                                onSelectionModelChange={id => {
                                    setSelectedRowId(id)
                                }}
                                autoHeight
                                sx={{
                                    width: 'auto',
                                    fontSize: '13px',
                                    backgroundColor: '#fff',
                                    borderRadius: '15px',
                                    padding: '5px',
                                    boxShadow:
                                        'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                }}
                                rows={rows}
                                columns={columns}
                                pageSize={pageSize}
                                onPageSizeChange={newPageSize =>
                                    setPageSize(newPageSize)
                                }
                                rowsPerPageOptions={[10, 25, 50, 100]}
                                pagination
                                checkboxSelection
                                components={{ Toolbar: MediaToolbar }}
                            />
                        )}
                    </Box>
                </Box>
                );
            </AdminLayout>
        </Fragment>
    )
}
export default Users
