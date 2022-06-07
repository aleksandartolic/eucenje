import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import BasicMenu from '../../../components/admin-components/PopupMenu'
import axios from 'axios'
const drawerWidth = 240
import AdminLayout from '../../../components/Layouts/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MediaToolbar from '../../../pages/admin/media/mediaToolbar'
import { CircularProgress } from '@mui/material'

// import { useNavigate } from 'react-router-dom'

const Media = () => {
    // const [rows, setRows] = useState(null)
    const [pageSize, setPageSize] = useState(10)
    const [selectedRowId, setSelectedRowId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [rows, setRows] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:8000/listMedia').then(value => {
            setRows(value.data.response)
        })
        setLoading(false)
    }, [])

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/deleteUser/${selectedRowId}/`)
    }
    const editCourse = () => {
        // TODO: edit course functionality
    }

    const columns = [
        { field: 'cm_id', headerName: 'ID', width: 150 },
        { field: 'course_id', headerName: 'Course ID', width: 150 },
        { field: 'title', headerName: 'Title', width: 150 },
        {
            field: 'duration',
            headerName: 'Duration',
            width: 150,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 150,
        },
        {
            field: 'filename',
            headerName: 'Filename',
            width: 150,
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 150,
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            width: 150,
        },
        {
            field: 'full_path',
            headerName: 'Full Path',
            width: 150,
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
                    sx={{ cursor: 'pointer', marginTop: '20px' }}
                    onClick={() => {
                        axios
                            .delete(
                                `http://localhost:8000/deleteUsers/${selectedRowId.join(
                                    ',',
                                )}`,
                                {},
                            )
                            .catch(error => {
                                throw new Error(`${error.message}`)
                            })
                    }}
                />
            ),
            renderCell: () => {
                const stopPropagation = e => {
                    e.stopPropagation()
                }

                return (
                    <BasicMenu
                        stopPropagation={stopPropagation}
                        deleteUser={handleDelete}
                        editCourse={editCourse}
                    />
                )
            },
            width: 150,
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
                        <Typography variant="h4">Media</Typography>
                    </Box>
                    <Box pt={2} sx={{ height: '100%', width: '100%' }}>
                        {loading ? (
                            <CircularProgress />
                        ) : (
                            <DataGrid
                                getRowId={row => row.cm_id}
                                autoHeight
                                sx={{ width: 'auto', fontSize: '14px' }}
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
