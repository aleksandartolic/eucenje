import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import BasicMenu from '@/components/admin-components/PopupMenu'
import axios from '@/lib/axios'
const drawerWidth = 240
import AdminLayout from '@/components/admin-components/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import {Button, CircularProgress, TextareaAutosize} from '@mui/material'

import { useRouter } from 'next/router'

// import { AddIcon } from "@material-ui/icons";
import { AppearanceTypes, useToasts } from 'react-toast-notifications';

const Media = () => {
    const { addToast } = useToasts();
const [rows, setRows] = useState([])
const [selectedRowId, setSelectedRowId] = useState([])
const [name, setName] = useState('')
const [description, setDescription] = useState('')
const [errors, setErrors] = useState([])
const [loading, setLoading ] = useState(false)
const router = useRouter()
    const [userID, setUserId] = useState(null);

    useEffect(()=>{

        setUserId(localStorage.getItem('userID'));

    },[])

    const getData = ()=>{

        setLoading(true);

        axios.get("http://localhost:8001/listCourses").then(value=>{

            setRows(value.data.response);
            setLoading(false);

        })
    }
useEffect(()=>{
  getData();
},[])

const editCourse = e => {
    router.push(`/users/${selectedRowId}`)
}
const createCourseHandler = e => {
    e.preventDefault()
    setLoading(true)
    axios.put("http://localhost:8001/createCourse/",{
        uid:6,
        name:name,
        description:description,

    })
    getData();
    addToast('Course added successful!', {     autoDismiss: true,
        autoDismissTimeout: 5000,
        appearance: 'success'});
    setLoading(false)
    setName('')
    setDescription('')

}

const handleDeleteCourse = () => {
    setLoading(true);
    axios.delete(`http://localhost:8001/deleteCourse/${selectedRowId}/`)
    getData();
    addToast('Course deleted successful!', {     autoDismiss: true,
        autoDismissTimeout: 5000,
        appearance: 'success'});
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
        headerName: (
            <DeleteIcon
                color="info"
                fontSize="large"
                sx={{ cursor: 'pointer', marginTop: '20px' }}
                onClick={() => {
                    if(selectedRowId.length !== 0  ) {
                        setLoading(true);
                        axios
                            .delete(
                                `http://localhost:8001/deleteCourse/${selectedRowId.join(
                                    ',',
                                )}`,
                                {},
                            )
                            .then(value => {
                                console.log(value)
                            })
                            .catch(error => {
                            });
                        setLoading(false)
                        getData();
                        addToast(`Course deleted successfully`, {     autoDismiss: true,
                            autoDismissTimeout: 5000,
                            appearance: 'success'});
                        setLoading(false);
                    } else{

                        addToast(`Please select course`, {     autoDismiss: true,
                            autoDismissTimeout: 5000,
                            appearance: 'error'});
                    } }}

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
                    {loading === true? <CircularProgress />
                        :<DataGrid
                        getRowId={(row) => row.course_id}
                        onSelectionModelChange={id => {
                            setSelectedRowId(id)
                        }}
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />}
                </Box>
                <Box  mb={5} mt={15} pl={2}>
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
                                <FormControl sx={{

                                    ".MuiFormControl-root":{
                                        fontSize:"5px",
                                        backgroundColor:"#000000"
                                    }
                                }}>
                                    <TextareaAutosize
                                        sx={{fontSize:"9px"}}
                                        aria-label="minimum height"
                                        minRows={10}
                                        value={description}
                                        type="text"
                                        placeholder="Description"
                                        style={{ width: "100%", fontSize:"10px", padding:"10px", fontFamily:"sans-serif" }}
                                        onChange={event =>
                                            setDescription(event.target.value)
                                        }
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
