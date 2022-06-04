import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import BasicMenu from '../../../components/admin-components/PopupMenu'
import axios from 'axios'
const drawerWidth = 240
import AdminLayout from '../../../components/Layouts/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'

const Users = () => {
    const [rows, setRows] = useState([])
    const [selectedRowId, setSelectedRowId] = useState([])

    const [loading, setLoading] = useState(false)

    const { addToast } = useToasts()
    const navigate = useNavigate()

    const editUser = e => {
        e.preventDefault()
        navigate(`/admin/users/${selectedRowId}`, { replace: true })
    }

    const handleDelete = () => {
        if (selectedRowId.length !== 0) {
            setLoading(true)
            axios.delete(`http://localhost:8001/deleteUser/${selectedRowId}/`)
            getData()
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
                const stopPropagation = e => {
                    e.stopPropagation()
                }

                return (
                    <BasicMenu
                        stopPropagation={stopPropagation}
                        deleteUser={handleDelete}
                        editUser={editUser}
                    />
                )
            },
            flex: 1,
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
                        setLoading(true)

                        if (selectedRowId.length !== 0) {
                            axios
                                .delete(
                                    `http://localhost:8001/deleteUsers/${selectedRowId.join(
                                        ',',
                                    )}`,
                                    {},
                                )
                                .catch(error => {
                                    throw new Error(`${error.message}`)
                                })
                            getData()
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
            flex: 1,
            sortable: false,
            headerAlign: 'center',
        },
    ]
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
                        <Typography variant="h4">Users</Typography>
                    </Box>
                    <Box pt={2} sx={{ height: 400, width: '100%' }}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <DataGrid
                                onSelectionModelChange={id => {
                                    setSelectedRowId(id)
                                }}
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
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
