import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import AdminLayout from '../../../../components/Layouts/AdminLayout'
import {
    Button,
    CircularProgress,
    LinearProgress,
    Select,
    TextField,
} from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'

import AuthValidationErrors from '../../../../components/AuthValidationErrors'
const CreateCourse = () => {
    // const userId = localStorage.getItem('userId')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const { addToast } = useToasts()
    const [courses, setCourses] = useState('')
    const [course, setCourse] = useState('')
    const [errors, setErrors] = useState([])
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)

    console.log(errors)
    useEffect(() => {
        axios.get('http://localhost:8001/listCourses').then(value => {
            setCourses(value.data.response)
        })
    }, [])

    const handleChangeMultiple = event => {
        const { options } = event.target
        const value = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }
        setCourse(value)
    }
    function selectFiles(event) {
        setSelectedFiles(event.target.files[0])
    }

    function upload(file, onUploadProgress) {
        setErrors([])
        let formData = new FormData()
        formData.append('filename', file)
        formData.append('course_id', course)
        formData.append('title', name)
        formData.append('description', description)
        axios
            .post('http://localhost:8001/uploadMedium/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress,
            })
            .then(response => {
                if (response.data.response.success === true) {
                    setCourse('')
                    setName('')
                    setDescription('')
                    addToast('Medium added successful!', {
                        autoDismiss: true,
                        autoDismissTimeout: 5000,
                        appearance: 'success',
                    })
                }
            })
            .catch(error => {
                if (error.response.status === 422) {
                    console.log(error.response)
                    if (error.response.data.response.message.title) {
                        setErrors([
                            error.response.data.response.message.title[0],
                        ])
                    } else if (
                        error.response.data.response.message.description
                    ) {
                        setErrors([
                            error.response.data.response.message.description[0],
                        ])
                    } else if (error.response.data.response.message.course_id) {
                        setErrors(['Course is required'])
                    }
                }
            })
    }

    function uploadService(e) {
        e.preventDefault()
        let currentFile = selectedFiles
        setProgress(0)
        setCurrentFile(currentFile)
        upload(currentFile, event => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        })
    }

    useEffect(() => {}, [errors])

    return (
        <AdminLayout>
            <Box
                color="#fff"
                onSubmit={uploadService}
                p={10}
                sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    width: '100%',
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    borderRadius: '20px',
                    '& > :not(style)': { m: 1 },
                }}
                component="form"
                autoComplete="off">
                <Box>
                    <Typography
                        sx={{ marginBottom: '20px' }}
                        color="#9c27b0"
                        variant="h4">
                        Upload Medium
                    </Typography>
                </Box>

                {errors.length > 0 && (
                    <AuthValidationErrors
                        style={{ marginBottom: '20px' }}
                        errors={errors}
                    />
                )}

                <TextField
                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 13 } }}
                    style={{
                        width: '100%',
                        margin: '5px',
                        marginBottom: '2rem',
                    }}
                    label="Title"
                    variant="outlined"
                    id="title"
                    type="text"
                    value={name}
                    className="block mt-1 w-full"
                    onChange={event => setName(event.target.value)}
                    required
                />

                <TextField
                    inputProps={{ style: { fontSize: 17 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 13 } }}
                    style={{
                        width: '100%',
                        margin: '5px',
                        marginBottom: '2rem',
                    }}
                    multiline
                    rows={4}
                    label="Description"
                    variant="outlined"
                    id="description"
                    type="text"
                    value={description}
                    className="block mt-1 w-full"
                    onChange={event => setDescription(event.target.value)}
                    required
                />
                {courses.length > 0 ? (
                    <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
                        <InputLabel shrink htmlFor="select-multiple-native">
                            Choose Course
                        </InputLabel>
                        <Select
                            native
                            value={course}
                            // @ts-ignore Typings are not considering `native`
                            onChange={handleChangeMultiple}
                            label="Choose Course"
                            inputProps={{
                                id: 'select-multiple-native',
                            }}>
                            <option value={''}>-</option>
                            {courses.map(name => {
                                return (
                                    <option
                                        key={name.course_id}
                                        value={name.course_id}>
                                        {name.name}
                                    </option>
                                )
                            })}
                        </Select>
                    </FormControl>
                ) : (
                    <CircularProgress />
                )}
                {currentFile && (
                    <>
                        <LinearProgress
                            value={progress}
                            variant="determinate"
                            sx={{
                                marginTop: '10px',
                                height: '20px',
                            }}
                        />

                        <Typography
                            variant="body2"
                            color="text.secondary">{`${Math.round(
                            progress,
                        )}%`}</Typography>
                    </>
                )}

                <Button
                    sx={{ marginTop: '10px', width: '100px' }}
                    variant="contained"
                    component="label">
                    Choose File
                    <input type="file" hidden onChange={selectFiles} />
                </Button>
                <br />
                <Typography color="#9c27b0" variant="h5" fontWeight="bold">
                    {selectedFiles && selectedFiles.name}
                </Typography>
                <br />
                <Button
                    sx={{ width: '100px' }}
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={!selectedFiles}>
                    Upload
                </Button>
            </Box>
        </AdminLayout>
    )
}

export default CreateCourse
