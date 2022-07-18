import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
const drawerWidth = 240
import AdminLayout from '../../../../components/Layouts/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { CircularProgress } from '@mui/material'

import { useNavigate } from 'react-router-dom'

import { useToasts } from 'react-toast-notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MediaToolbar from '../../../../pages/admin/media/mediaToolbar'

const Media = () => {
    const [pageSize, setPageSize] = useState(10)
    const { addToast } = useToasts()
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const [selectedRowId, setSelectedRowId] = useState([])
    const [loading, setLoading] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = event => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const getData = () => {
        setLoading(true)

        axios.get('http://localhost:8001/listCourses').then(value => {
            setRows(value.data.response)
            setLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const editCourse = () => {
        // TODO edit course functionality
        navigate(`/admin/courses/edit-course/${selectedRowId}`)
    }

    const handleDeleteCourse = () => {
        setLoading(true)
        setAnchorEl(null)
        if (selectedRowId.length === 1) {
            axios
                .delete(`http://localhost:8001/deleteCourse/${selectedRowId}/`)
                .then(() => {
                    getData()
                })

            addToast('Course deleted successful!', {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'success',
            })
        } else {
            addToast('Please select the user', {
                autoDismiss: true,
                autoDismissTimeout: 5000,
                appearance: 'error',
            })
        }
        setLoading(false)
    }

    const columns = [
        { field: 'course_id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 1 },

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
                            <MenuItem onClick={handleDeleteCourse}>
                                Delete
                            </MenuItem>
                            <MenuItem onClick={editCourse}>Edit</MenuItem>
                        </Menu>
                    </div>
                )
            },
            width: 60,
        },
        {
            disableColumnMenu: true,
            headerName: 'delete icon',
            field: 'delete icon',
            renderHeader: () => (
                <DeleteIcon
                    color="info"
                    fontSize="large"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        setLoading(true)

                        if (selectedRowId.length !== 0) {
                            axios
                                .delete(
                                    `http://localhost:8001/deleteCourse/${selectedRowId.join(
                                        ',',
                                    )}`,
                                )
                                .then(() => {
                                    getData()
                                })

                            addToast(`Course deleted successfully`, {
                                autoDismiss: true,
                                autoDismissTimeout: 5000,
                                appearance: 'success',
                            })

                            setLoading(false)
                        } else {
                            addToast(`Please select course`, {
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
        <AdminLayout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    height: '100%',
                }}>
                <Box pb={4} pl={2}>
                    <Typography color="#9c27b0" variant="h4">
                        Courses
                    </Typography>
                </Box>
                <Box pt={2} sx={{ height: 'auto', width: '100%' }}>
                    <DataGrid
                        getRowId={row => row.course_id}
                        onSelectionModelChange={id => {
                            setSelectedRowId(id)
                        }}
                        autoHeight
                        sx={{
                            width: 'auto',
                            fontSize: '13px',
                            backgroundColor: '#fff',
                            minHeight: '500px',
                            borderRadius: '15px',
                            padding: '5px',
                            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
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
                </Box>
            </Box>
        </AdminLayout>
    )
}

export default Media
