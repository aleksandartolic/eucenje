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
import { AppearanceTypes, useToasts } from 'react-toast-notifications';
const drawerWidth =100;
function Overview() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [errors, setErrors] = useState([])
    const router = useRouter()
    const { id } = router.query

    const { addToast } = useToasts();
    console.log(id);
    const getUser = () =>{
        axios.get(`http://localhost:8001/getUser/${id}/`).then(value => {
            console.log(value);
            const {id, username, name, email, role} = value.data.user;
            setName(name)
            setUsername(username)
            setEmail(email)
            setRole(role);
        })
    }

        useEffect(() => {
        getUser();
        }, [])


    const editUserHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:8001/updateUser?${id}`, {
            name: name,
            username: username,
            email: email,
            role:role,
            id:id,
        })
        addToast('Profile updated successful!', {     autoDismiss: true,
            autoDismissTimeout: 5000,
            appearance: 'success'});

        getUser();
    }
    return <AdminLayout>
            <Box
                display="flex"
                component="main"
                justifyContent="center"
                mt={5}
                sx={{
                    flexGrow: 1,
                    pt: 7,
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
                            <TitlebarImageList imageData={3} />
                        </Box>
                    </Box>
                </Box>

            </Box>
        </AdminLayout>

}

export default Overview
