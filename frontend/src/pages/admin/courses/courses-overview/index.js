import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import BasicMenu from '../../../../components/admin-components/PopupMenu'
import axios from 'axios'
const drawerWidth = 240
import AdminLayout from '../../../../components/Layouts/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { CircularProgress } from '@mui/material'

import { useNavigate } from 'react-router-dom'

import { useToasts } from 'react-toast-notifications'

const Media = () => {
    const { addToast } = useToasts()
    const navigate = useNavigate()
    const [rows, setRows] = useState([])
    const [selectedRowId, setSelectedRowId] = useState([])
    const [loading, setLoading] = useState(false)

    const getData = () => {
        setLoading(true)

        axios.get('http://localhost:8000/listCourses').then(value => {
            setRows(value.data.response)
            setLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])

    const editCourse = () => {
        // TODO edit course functionality
        navigate(`/users/${selectedRowId}`)
    }

    const handleDeleteCourse = () => {
        setLoading(true)
        if (selectedRowId.length === 1) {
            axios.delete(`http://localhost:8000/deleteCourse/${selectedRowId}/`)
            getData()
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
                const stopPropagation = e => {
                    e.stopPropagation()
                }

                return (
                    <BasicMenu
                        stopPropagation={stopPropagation}
                        deleteUser={handleDeleteCourse}
                        editUser={editCourse}
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
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        setLoading(true)

                        if (selectedRowId.length !== 0) {
                            axios.delete(
                                `http://localhost:8000/deleteCourse/${selectedRowId.join(
                                    ',',
                                )}`,
                            )
                            getData()
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
            flex: 1,
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
                        <Typography variant="h4">Courses</Typography>
                    </Box>
                    <Box pt={2} sx={{ height: 400, width: '100%' }}>
                        {loading === true ? (
                            <CircularProgress />
                        ) : (
                            <DataGrid
                                autoHeight
                                getRowId={row => row.course_id}
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
                    <Box pt={5} />
                </Box>
                );
            </AdminLayout>
        </Fragment>
    )
}

export default Media
