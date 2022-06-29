import Box from '@mui/material/Box'
import image from '../../../assets/images/profileImage.png'

import { Button, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import StudentLayout from '../../../components/Layouts/StudentLayout'
function EditStudentProfile() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const params = useParams()
    const { uid } = params

    useEffect(() => {
        axios.get(`http://localhost:8001/getUser/${uid}`).then(value => {
            const { name, username, email, role } = value.data.user
            setName(name)
            setUsername(username)
            setEmail(email)
            setRole(role)
        })
    }, [])

    const editUserHandler = e => {
        e.preventDefault()
        axios.put(`http://localhost:8001/updateUser?${uid}`, {
            id: uid,
            name: name,
            username: username,
            email: email,
        })
    }
    return (
        <StudentLayout>
            <Box
                color="#fff"
                p={5}
                mr={35}
                ml={35}
                mb={30}
                mt={20}
                sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    width: '100%',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: '20px',
                    '& > :not(style)': { m: 1 },
                }}>
                {' '}
                <Box display="flex" justifyContent="center">
                    <img
                        src={image}
                        alt="Picture of the author"
                        width={250}
                        height={200}
                    />
                </Box>
                <Box mt={2}>
                    <Typography
                        color="#9c27b0"
                        textAlign="center"
                        fontWeight="bold"
                        variant="h4">
                        {name}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Typography
                        color="#9c27b0"
                        display="block"
                        variant="h6"
                        fontWeight="bold"
                        fontSize="16px">
                        {email}
                    </Typography>
                </Box>
                <Box pt={2}>
                    <Fragment>
                        <Box
                            component="form"
                            color="#fff"
                            onSubmit={editUserHandler}
                            p={10}
                            mr={20}
                            mb={10}
                            mt={10}
                            sx={{
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                width: '100%',
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                borderRadius: '20px',
                                '& > :not(style)': { m: 1 },
                            }}>
                            <FormControl>
                                <TextField
                                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                    InputLabelProps={{
                                        style: { fontSize: 13 },
                                    }}
                                    id="component-outlined"
                                    value={name}
                                    onChange={event =>
                                        setName(event.target.value)
                                    }
                                    label="Name"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                    InputLabelProps={{
                                        style: { fontSize: 13 },
                                    }}
                                    id="component-outlined"
                                    value={email}
                                    onChange={event =>
                                        setEmail(event.target.value)
                                    }
                                    label="Email"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                    InputLabelProps={{
                                        style: { fontSize: 13 },
                                    }}
                                    id="component-outlined"
                                    value={username}
                                    onChange={event =>
                                        setUsername(event.target.value)
                                    }
                                    label="username"
                                />
                            </FormControl>
                            <FormControl>
                                <TextField
                                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                                    InputLabelProps={{
                                        style: { fontSize: 13 },
                                    }}
                                    id="component-outlined"
                                    value={role}
                                    onChange={event =>
                                        setRole(event.target.value)
                                    }
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
                                Edit
                            </Button>
                        </Box>
                    </Fragment>
                </Box>
            </Box>
        </StudentLayout>
    )
}

export default EditStudentProfile
