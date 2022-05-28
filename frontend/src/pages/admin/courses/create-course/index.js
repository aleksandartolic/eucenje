import AdminLayout from '@/components/Layouts/AdminLayout'
import Box from '@mui/material/Box'

import * as React from 'react'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Button, TextareaAutosize } from '@mui/material'
import axios from '@/lib/axios'
import { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { useRouter } from 'next/router'

const drawerWidth = 240

const CreateCourse = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const { addToast } = useToasts()
    const router = useRouter()

    const createCourseHandler = e => {
        e.preventDefault()
        setLoading(true)
        axios.put('http://localhost:8001/createCourse/', {
            uid: router.query.id,
            name: name,
            description: description,
        })

        addToast('Course added successful!', {
            autoDismiss: true,
            autoDismissTimeout: 5000,
            appearance: 'success',
        })
        setLoading(false)
        setName('')
        setDescription('')
    }

    return (
        <AdminLayout>
            <Box
                component="main"
                sx={{
                    height: '85vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
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
                    <Box>
                        <Typography variant="h4">Create course</Typography>
                    </Box>
                    <FormControl>
                        <InputLabel htmlFor="component-outlined">
                            Name
                        </InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            label="name"
                        />
                    </FormControl>
                    <FormControl
                        sx={{
                            '.MuiFormControl-root': {
                                fontSize: '5px',
                                backgroundColor: '#000000',
                            },
                        }}>
                        <TextareaAutosize
                            sx={{ fontSize: '9px' }}
                            aria-label="minimum height"
                            minRows={10}
                            value={description}
                            type="text"
                            placeholder="Description"
                            style={{
                                width: '100%',
                                fontSize: '10px',
                                padding: '10px',
                                fontFamily: 'sans-serif',
                            }}
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
                            width: '150px',
                            height: '40px',
                        }}
                        type="submit"
                        variant="contained"
                        color="primary">
                        Create Course
                    </Button>
                </Box>
            </Box>
        </AdminLayout>
    )
}

export default CreateCourse
