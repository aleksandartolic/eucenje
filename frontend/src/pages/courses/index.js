import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import BasicMenu from '@/components/admin-components/PopupMenu'
import axios from '@/lib/axios'
const drawerWidth = 240
import AdminLayout from '@/components/admin-components/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Button } from '@mui/material'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
import UUID from 'uuid-int'
// import { AddIcon } from "@material-ui/icons";

const Media = () => {
const [rows, setRows] = useState(null)
const [selectedRowId, setSelectedRowId] = useState(null)
const [name, setName] = useState('')
const [description, setDescription] = useState('')

const [errors, setErrors] = useState([])
const { addUser } = useAuth()
const router = useRouter()

useEffect(()=>{


    axios.get("http://localhost:8000/listCourses").then(value=>{

    const data = value.data.response.map((row)=>{

        return {id:Math.round(Math.random()*1000), ...row}
    })
    console.log(value.data.response)
    setRows(data);
    })
},[])

const editCourse = e => {
    router.push(`/users/${selectedRowId}`)
}
const createCourseHandler = e => {
    e.preventDefault()
    axios.put("http://localhost:8000/createCourse",{
        uid:51,
        name:name,
        description:description,
        
    })
    setName('')
    setDescription('')
  
}

const handleDeleteCourse = () => {
    axios.delete(`http://localhost:8000/deleteCourse/${selectedRowId}/`)
}

const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    { field: 'course_id', headerName: 'Description', flex: 1 },

    

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
        headerName: (
            <DeleteIcon
                color="info"
                fontSize="large"
                sx={{ cursor: 'pointer', marginTop: '20px' }}
                onClick={() => {
                    axios
                        .delete(
                            `http://localhost:8000/deleteCourse/${selectedRowId.join(
                                ',',
                            )}`,
                            {},
                        )
                        .then(value => {
                            console.log(value)
                        })
                        .catch(error => {})
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
                </Box>
                <Box mt={15} pl={2}>
                    <Typography variant="h4">Create course</Typography>
                </Box>
                <Box
                                onSubmit={createCourseHandler}
                                p={5}
                                pt={0}
                                pl={0}
                                component="form"
                                sx={{
                                    width: '600px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    borderRadius: '10px',
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off">
                               
                               
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">
                                        Name
                                    </InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={name}
                                        onChange={event =>
                                            setName(event.target.value)
                                        }
                                        label="name"
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">
                                        Description
                                    </InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={description}
                                        type="text"
                                        onChange={event =>
                                            setDescription(event.target.value)
                                        }
                                        label="Description"
                                    />
                                </FormControl>
                               
                                <Button
                                    className="ml-4"
                                    style={{
                                        marginTop: '3rem',
                                        fontSize: 10,
                                        width: '90px',
                                        height: '30px',
                                    }}
                                    type="submit"
                                    variant="contained"
                                    color="primary">
                                    Create Course
                                </Button>
                            </Box>
                <Box pt={5}>
                  
                </Box>   
                </Box>
            );
        </AdminLayout>
    </Fragment>
)
}

export default Media;