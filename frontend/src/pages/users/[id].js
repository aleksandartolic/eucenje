import AdminLayout from '@/components/admin-components/AdminLayout'
import Box from '@mui/material/Box'
import image from './profileImage-removebg-preview.png'
import LocationOnIcon from '@mui/icons-material/LocationOn'

import Image from 'next/image'
import { Button, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import AuthValidationErrors from '@/components/AuthValidationErrors'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import axios from '@/lib/axios'
import { useRouter } from 'next/router'
import TitlebarImageList from '@/components/admin-components/CoursesList'
const drawerWidth = 240
function Overview() {
    const [userData, setUserData] = useState([])
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setPasswordConfirmation] = useState('')
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [errors, setErrors] = useState([])
    const router = useRouter()
    const { id } = router.query
    console.log(id)

    useEffect(() => {
        axios.get(`http://localhost:8000/listUsers?${id}`).then(value => {
            const { id, username, name, email } = value.data.response[0]
            setName(name)
            setUsername(username)
            setEmail(email)
        })
    }, [])

    const editUserHandler = e => {
        e.preventDefault()
        axios.put('http://localhost:8000/updateUser?50', {
            name: name,
            username: username,
            email: email,
        })
    }
    return (
        <AdminLayout>
            <Box
                display="flex"
                component="main"
                justifyContent="center"
                mt={5}
                sx={{
                    flexGrow: 1,
                    p: 7,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                {' '}
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" justifyContent="center">
                        <Image
                            src={image}
                            alt="Picture of the author"
                            width={250}
                            height={200}
                        />
                    </Box>
                    <Box mt={2}>
                        <Typography
                            textAlign="center"
                            fontWeight="bold"
                            variant="h4">
                            Nikola Markovic
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography
                            display="block"
                            variant="h6"
                            fontWeight="bold"
                            fontSize="16px">
                            admin@admin.com
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-around" mt={2}>
                        <Box>
                            <LocationOnIcon fontSize="large" color="info" />
                        </Box>
                        <Box>
                            <Typography
                                display="block"
                                variant="h5"
                                fontSize="16px">
                                Novi Sad
                            </Typography>
                        </Box>
                    </Box>
                    <Box pt={5}>
                        <Fragment>
                            <AuthValidationErrors
                                style={{ marginBottom: '20px' }}
                                errors={errors}
                            />
                            <Box
                                onSubmit={editUserHandler}
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
                                        label="Name"
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">
                                        Email
                                    </InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={email}
                                        onChange={event =>
                                            setEmail(event.target.value)
                                        }
                                        label="Email"
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">
                                        Username
                                    </InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
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
                                        id="component-outlined"
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
                                        id="component-outlined"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={event =>
                                            setPasswordConfirmation(
                                                event.target.value,
                                            )
                                        }
                                        label="Confirm Password"
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">
                                        Role
                                    </InputLabel>
                                    <OutlinedInput
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
                    <Box alignSelf="flex-start">
                        <Box mt={5} mb={5}>
                            <Typography variant="h3">Your Courses</Typography>
                        </Box>

                        <Box>
                            <TitlebarImageList />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AdminLayout>
    )
}

export default Overview
