import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Button } from '@mui/material'
import AdminLayout from '../../../components/Layouts/AdminLayout'
import axios from 'axios'
import { useToasts } from 'react-toast-notifications'

const drawerWidth = 240
const AddUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setPasswordConfirmation] = useState('')
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')

    const { addToast } = useToasts()

    const addUserHandler = e => {
        addToast(`User ${username} added successfully`, {
            autoDismiss: true,
            autoDismissTimeout: 5000,
            appearance: 'success',
        })
        e.preventDefault()
        axios
            .post('http://127.0.0.1:8001/register', {
                name,
                email,
                password,
                confirmPassword,
                username,
                role,
            })
            .then(res => {
                return res
            })
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
        setName('')
        setUsername('')
        setEmail('')
        setPassword('')
        setPasswordConfirmation('')
        setRole('')
    }

    return (
        <AdminLayout>
            <Box
                component="main"
                mt={10}
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    flexGrow: 1,
                    p: 7,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                <Box mt={15} >
                    <Typography variant="h4">Add user</Typography>
                </Box>
                <Box pt={5}>
                    <Box
                        onSubmit={addUserHandler}
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
                                id="component-outlined-name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                                label="Name"
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-outlined">
                                Email
                            </InputLabel>
                            <OutlinedInput
                                id="component-outlined-email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                label="Email"
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-outlined">
                                Username
                            </InputLabel>
                            <OutlinedInput
                                id="component-outlined-username"
                                value={username}
                                onChange={event =>
                                    setUsername(event.target.value)
                                }
                                label="username"
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-outlined">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="component-outlined-password"
                                value={password}
                                type="password"
                                onChange={event =>
                                    setPassword(event.target.value)
                                }
                                label="Password"
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-outlined">
                                Confirm password
                            </InputLabel>
                            <OutlinedInput
                                id="component-outlined-c-password"
                                type="password"
                                value={confirmPassword}
                                onChange={event =>
                                    setPasswordConfirmation(event.target.value)
                                }
                                label="Confirm Password"
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-outlined-role">
                                Role
                            </InputLabel>
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
                </Box>
            </Box>
        </AdminLayout>
    )
}
export default AddUser
