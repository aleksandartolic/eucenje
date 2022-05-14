import React, {Fragment, useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import BasicMenu from '@/components/admin-components/PopupMenu'
import axios from '@/lib/axios'

const drawerWidth = 240
import AdminLayout from '@/components/admin-components/AdminLayout'
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import ComposedTextField from "@/components/admin-components/AddForm";
import AuthValidationErrors from "@/components/AuthValidationErrors";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import {Button} from "@mui/material";
import {useAuth} from "@/hooks/auth";


const Users = () => {

   const [rows, setRows] = useState (null);
   const [selectedRowId, setSelectedRowId] = useState(null);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setPasswordConfirmation] = useState('')
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [errors, setErrors] = useState([])
    const { addUser } = useAuth()


    const addUserHandler = (e)=> {
        e.preventDefault();
        addUser({
            name,
            email,
            password,
            confirmPassword,
            username,
            role,
            setErrors,
        });
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setRole("");
    }



  const handleDelete = () =>{

        axios.delete(`http://localhost:8001/deleteUser/${selectedRowId}/`);
  }

    const columns = [
        { field: 'id', headerName: 'ID', flex:1 },
        { field: 'name', headerName: 'Name', flex:1 },
        { field: 'email', headerName: 'Email', flex:1 },
        {
            field: 'username',
            headerName: 'Username',
            flex:1,
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
                        key={Math.floor(Math.random() * 1000)}
                        deleteUser = {handleDelete}
                    />
                )
            },
            flex:1,
        },
        {
            disableColumnMenu: true,
            headerName: (
                <DeleteIcon
                    color="info"
                    fontSize="large"
                    sx={{ cursor: 'pointer', marginTop: '20px' }}
                    onClick={() => {
                       axios.delete(`http://localhost:8001/deleteUsers/${selectedRowId.join(',')}`,{
                       }).then((value)=>{
                           console.log(value);
                       }).catch((error)=>{
                       })
                    }}
                />
            ),
            flex:1,
            sortable: false,
            headerAlign: 'center',
        },
    ]
    useEffect(()=>{
        axios.get("http://localhost:8001/listUsers").then(value => {
            setRows(value.data.response);
        } )
    },[handleDelete,addUser])

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
                            <Typography variant="h4">
                                Users
                            </Typography>
                        </Box>
                        <Box  pt={2} sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                onSelectionModelChange={(id) => {
                                   setSelectedRowId(id)
                                }}
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                            />
                        </Box>
                    <Box mt={15}  pl={2}>
                        <Typography variant="h4">
                            Add user
                        </Typography>
                    </Box>
                    <Box pt={5}>
                        <Fragment>
                            <AuthValidationErrors
                                style={{ marginBottom: '20px' }}
                                errors={errors}
                            />
                            <Box
                                onSubmit={addUserHandler}
                                p={5}
                                pt={0}
                                pl={0}
                                component="form"
                                sx={{
                                    width:"600px",
                                    display:"flex",
                                    flexDirection:"column",
                                    justifyContent:'space-between',
                                    borderRadius:'10px',
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                            >

                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Name</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                        label="Name"
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Email</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        label="Email"
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Username</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={username}
                                        onChange={event => setUsername(event.target.value)}
                                        label="username"
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Password</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={password}
                                        type="password"
                                        onChange={event => setPassword(event.target.value)}
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Confirm password</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={event => setPasswordConfirmation(event.target.value)}
                                        label="Confirm Password"
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">Role</InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={role}
                                        onChange={event => setRole(event.target.value)}
                                        label="Role"
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
                                    Add
                                </Button>
                            </Box>
                        </Fragment>
                    </Box>


                </Box>
                );
            </AdminLayout>
        </Fragment>
    )
}
export default Users
