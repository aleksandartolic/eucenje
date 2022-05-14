import React, { Fragment } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import BasicMenu from '@/components/admin-components/PopupMenu'
import axios from '@/lib/axios'
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    {
        field: 'username',
        headerName: 'Username',
        width: 90,
    },
    {
        field: 'role',
        headerName: 'Role',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
    },
    {
        disableColumnMenu: true,
        field: 'action',
        headerName: 'Action',
        sortable: false,
        headerAlign: 'right',
        renderCell: () => {
            const stopPropagation = e => {
                e.stopPropagation()
            }

            return (
                <BasicMenu
                    stopPropagation={stopPropagation}
                    key={Math.floor(Math.random() * 1000)}
                />
            )
        },
        width: 10,
    },
    {
        disableColumnMenu: true,
        headerName: (
            <DeleteIcon
                color="info"
                fontSize="large"
                sx={{ cursor: 'pointer', marginTop: '20px' }}
                onClick={() => {
                    console.log('deleted all')
                }}
            />
        ),
        width: 285,
        sortable: false,
        headerAlign: 'center',
    },
]

const rows = [
    { id: 1, name: 'Snow', email: 'Jon', username: '1', role: '1' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
]
const drawerWidth = 240
import AdminLayout from '@/components/admin-components/AdminLayout'
import Box from '@mui/material/Box'

const Users = () => {
    return (
        <Fragment>
            <AdminLayout>
                <Box
                    component="main"
                    mt={15}
                    sx={{
                        flexGrow: 1,
                        p: 5,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </div>
                </Box>
                );
            </AdminLayout>
        </Fragment>
    )
}
export default Users
