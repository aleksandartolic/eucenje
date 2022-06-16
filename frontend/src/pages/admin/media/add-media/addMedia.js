import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import AdminLayout from '../../../../components/Layouts/AdminLayout'
import {
    Button,
    CircularProgress,
    Grow,
    LinearProgress,
    Select,
    TextareaAutosize,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import MenuItem from '@mui/material/MenuItem'

const CreateCourse = () => {
    // const userId = localStorage.getItem('userId')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const { addToast } = useToasts()
    const [courses, setCourses] = useState('')

    const [course, setCourse] = useState('')
    const [video, setVideo] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState('')
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        if (currentFile) {
            setAnimate(true)
        } else {
            setAnimate(false)
        }
    }, [currentFile])

    useEffect(() => {
        axios.get('http://localhost:8001/listCourses').then(value => {
            setCourses(value.data.response)
        })
    }, [])

    const handleChooseCourse = e => {
        setCourse(e.target.value)
        console.log(e.target)
    }

    function selectFiles(event) {
        setSelectedFiles(event.target.files[0])
    }

    function upload(file, onUploadProgress) {
        let formData = new FormData()
        formData.append('filename', file)
        formData.append('course_id', course)
        formData.append('title', name)
        formData.append('description', description)
        return axios
            .post('http://localhost:8001/uploadMedium/', formData, {
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

    useEffect(() => {
        if (video !== '') {
            setDisabled(false)
        }
    }, [video])

    const createCourseHandler = e => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData()
        formData.append('course_id', 49)
        formData.append('title', name)
        formData.append('description', description)
        formData.append('filename', video)
        if (video !== '') {
            axios.post('http://localhost:8001/uploadMedium/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
    console.log(currentFile)

    const handleInputChange = async e => {
        e.preventDefault()

        let file = e.target.files[0]
        setVideo(file)
    }

    return (
        <AdminLayout>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box
                    onSubmit={uploadService}
                    pt={10}
                    mb={30}
                    mt={10}
                    pl={50}
                    pr={50}
                    component="form"
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderRadius: '10px',
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off">
                    <Box>
                        <Typography variant="h4">Upload Medium</Typography>
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
                    <div>
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
                        {courses.length > 0 ? (
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Select Course
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={course}
                                    label="Select Course"
                                    onChange={handleChooseCourse}>
                                    {courses.map(course => {
                                        return (
                                            <MenuItem
                                                key={course.name}
                                                value={course.course_id}>
                                                {course.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        ) : (
                            <CircularProgress />
                        )}
                        <br />
                        <br />
                        <Button variant="contained" component="label">
                            Choose File
                            <input type="file" hidden onChange={selectFiles} />
                        </Button>
                        <br />
                        <p>{selectedFiles && selectedFiles.name}</p>
                        <br />
                        <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            disabled={!selectedFiles}>
                            Upload
                        </Button>
                    </div>
                </Box>
            )}
        </AdminLayout>
    )
}

export default CreateCourse
