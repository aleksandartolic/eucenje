import AdminLayout from '../../../../components/Layouts/AdminLayout'
import {
    Box,
    Button,
    Grow,
    InputLabel,
    LinearProgress,
    OutlinedInput,
    TextareaAutosize,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'
import React from 'react'
import { useToasts } from 'react-toast-notifications'
import { useEffect } from 'react'
import axios from 'axios'
const drawerWidth = 240
const CreateCourse = () => {
    const userId = localStorage.getItem('userId')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const { addToast } = useToasts()

    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [animate, setAnimate] = useState(false)

    function selectFiles(event) {
        console.log(event.target)
        setSelectedFiles(event.target.files[0])
    }
    useEffect(() => {
        if (currentFile) {
            setAnimate(true)
        } else {
            setAnimate(false)
        }
    }, [currentFile])
    function upload(file, onUploadProgress) {
        if (file) {
            let formData = new FormData()
            formData.append('uid', userId)
            console.log(file)
            formData.append('picture', file)
            formData.append('name', name)
            formData.append('description', description)
            return axios
                .post('http://localhost:8001/createCourse/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress,
                })
                .then(response => {
                    setTimeout(() => {
                        setCurrentFile(undefined)
                        setSelectedFiles(undefined)
                        if (response.status === 200) {
                            addToast('Course added successful!', {
                                autoDismiss: true,
                                autoDismissTimeout: 5000,
                                appearance: 'success',
                            })
                        }
                    }, 3000)
                })
        }
    }

    function uploadService(e) {
        e.preventDefault()
        let currentFile = selectedFiles

        setProgress(0)
        setCurrentFile(currentFile)

        upload(currentFile, event => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        }).catch(error => {
            console.log(error)
            setProgress(0)
            setCurrentFile(undefined)
        })
    }
    return (
        <AdminLayout>
            <Box
                component="main"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                mt={10}
                sx={{
                    flexGrow: 1,
                    p: 7,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                <Box mb={5} mt={15}>
                    <Typography variant="h4">Create Course</Typography>
                </Box>
                <Box
                    p={5}
                    pt={0}
                    pl={0}
                    component="form"
                    onSubmit={uploadService}
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
                    {currentFile && (
                        <>
                            <Grow in={animate}>
                                <LinearProgress
                                    value={progress}
                                    variant="determinate"
                                    sx={{
                                        height: '20px',
                                    }}
                                />
                            </Grow>

                            <Typography
                                variant="body2"
                                color="text.secondary">{`${Math.round(
                                progress,
                            )}%`}</Typography>

                            <br />
                            <br />
                        </>
                    )}
                    <Button
                        sx={{ width: '100px' }}
                        variant="contained"
                        component="label">
                        Choose File
                        <input type="file" hidden onChange={selectFiles} />
                    </Button>
                    <br />
                    <p>{selectedFiles && selectedFiles.name}</p>
                    <br />
                    <Button
                        sx={{ width: '60px' }}
                        type="submit"
                        color="secondary"
                        variant="contained"
                        disabled={!selectedFiles}>
                        Upload
                    </Button>
                </Box>
            </Box>
        </AdminLayout>
    )
}
export default CreateCourse
