import { DataGrid } from '@mui/x-data-grid'
import React, { Fragment, useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
const drawerWidth = 240
import AdminLayout from '../../../components/Layouts/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MediaToolbar from '../../../pages/admin/media/mediaToolbar'
import { CircularProgress } from '@mui/material'
import MoreIcon from '@mui/icons-material/MoreVert'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

const Media = () => {
    // const [rows, setRows] = useState(null)
    const [pageSize, setPageSize] = useState(10)
    const [selectedRowId, setSelectedRowId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const handleClick = event => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const getData = () => {
        setLoading(true)
        axios.get('http://localhost:8001/listMedia').then(value => {
            setRows(value.data.response)
        })
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])

    const handleDelete = () => {
        setAnchorEl(null)
        axios
            .delete(`http://localhost:8001/deleteMedium/${selectedRowId[0]}`)
            .then(() => {
                getData()
            })
            .catch(error => {
                console.log(error.message)
            })
    }
    const editMedia = e => {
        e.preventDefault()
        navigate(`/admin/courses/edit-medium/${selectedRowId[0]}`)
    }

    const columns = [
        { field: 'cm_id', headerName: 'ID', width: 150 },
        { field: 'course_id', headerName: 'Course ID', width: 150 },
        { field: 'title', headerName: 'Title', width: 150 },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
        },
        {
            field: 'filename',
            headerName: 'Filename',
            flex: 1,
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 150,
            renderCell: date => {
                return new Date(date.value).toDateString()
            },
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            width: 150,
            renderCell: date => {
                return new Date(date.value).toDateString()
            },
        },
        {
            disableColumnMenu: true,
            field: 'action',
            headerName: 'Action',
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderHeader: () => (
                <DeleteIcon
                    color="info"
                    fontSize="large"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        console.log(selectedRowId)
                        axios
                            .delete(
                                `http://localhost:8001/deleteMedia/${selectedRowId.join(
                                    ',',
                                )}`,
                            )

                            .then(() => {
                                getData()
                            })
                            .catch(error => {
                                throw new Error(`${error.message}`)
                            })
                    }}
                />
            ),
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
                            <MenuItem onClick={editMedia}>Edit</MenuItem>
                        </Menu>
                    </div>
                )
            },
            width: 40,
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
                            Media
                        </Typography>
                    </Box>
                    <Box pt={2} sx={{ height: '100%', width: '100%' }}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <DataGrid
                                autoHeight
                                getRowId={row => row.cm_id}
                                sx={{
                                    width: 'auto',
                                    fontSize: '13px',
                                    backgroundColor: '#fff',
                                    borderRadius: '15px',
                                    padding: '5px',
                                    boxShadow:
                                        'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                }}
                                onSelectionModelChange={id => {
                                    setSelectedRowId(id)
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
                    <Box pt={5} />
                </Box>
            </AdminLayout>
        </Fragment>
    )
}

export default Media
