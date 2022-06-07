import AdminLayout from '../../../../components/Layouts/AdminLayout'
import Box from '@mui/material/Box'

import * as React from 'react'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Button, CircularProgress, TextareaAutosize } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'

const CreateCourse = () => {
    // const userId = localStorage.getItem('userId')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const { addToast } = useToasts()
    const [video, setVideo] = useState('')
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        if (video !== '') {
            setDisabled(false)
        }
    }, [video])
    console.log(video)
    const createCourseHandler = e => {
        e.preventDefault()
        setLoading(true)
        if (video !== '') {
            console.log(video)
            axios.post('http://localhost:8000/uploadMedium/', {
                course_id: 3,
                title: 'gfdfdg',
                description: 'dsdsdfs',
                filename: video.name,
                headers: {
                    'Content-Type': 'video/mp4',
                    'Access-Control-Allow-Origin': '*',
                },
            })
        }

        addToast('Course added successful!', {
            autoDismiss: true,
            autoDismissTimeout: 5000,
            appearance: 'success',
        })
        setLoading(false)
        setName('')
        setDescription('')
    }
    const handleInputChange = async e => {
        e.preventDefault()

        let file = e.target.files[0]

        if (file) {
            let reader = new FileReader()
            reader.onload = () => {
                setVideo(file)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <AdminLayout>
            {loading ? (
                <CircularProgress />
            ) : (
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
                    <FormControl>
                        <h1>File Upload</h1>
                        <input
                            type="file"
                            name="the-name"
                            onChange={handleInputChange}
                            multiple
                        />
                    </FormControl>

                    <Button
                        disabled={disabled}
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
            )}
        </AdminLayout>
    )
}

export default CreateCourse
