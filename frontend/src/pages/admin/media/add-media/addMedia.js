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
    LinearProgress,
    TextareaAutosize,
} from '@mui/material'
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
    const [selectedFiles, setSelectedFiles] = useState(undefined)
    const [currentFile, setCurrentFile] = useState(undefined)
    const [progress, setProgress] = useState(0)
    const [message, setMessage] = useState('')
    const [fileInfos, setFileInfos] = useState([])

    function selectFiles(event) {
        setSelectedFiles(event.target.files[0])
    }

    function upload(file, onUploadProgress) {
        let formData = new FormData()
        formData.append('filename', file)
        formData.append('course_id', 49)
        formData.append('title', name)
        formData.append('description', description)
        // formData.append('filename', video)
        return axios.post('http://localhost:8001/uploadMedium/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress,
        })
    }

    function uploadService() {
        let currentFile = selectedFiles

        setProgress(0)
        setCurrentFile(currentFile)

        upload(currentFile, event => {
            setProgress(Math.round((100 * event.loaded) / event.total))
        })
            .then(files => {
                setFileInfos(files.data)
            })
            .catch(() => {
                setProgress(0)
                setMessage('Could not upload the file!')
                setCurrentFile(undefined)
            })
        setSelectedFiles(undefined)
    }

    useEffect(() => {
        if (video !== '') {
            setDisabled(false)
        }
    }, [video])

    const createCourseHandler = e => {
        e.preventDefault()
        setLoading(true)
        console.log(video)
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
    const handleInputChange = async e => {
        e.preventDefault()

        let file = e.target.files[0]
        setVideo(file)
        // if (file) {
        //     let reader = new FileReader()
        //     reader.onload = () => {
        //         setVideo(reader.result)
        //     }
        //     reader.readAsDataURL(file)
        // }
    }

    return (
        <AdminLayout>
            {loading ? (
                <CircularProgress />
            ) : (
                <Box
                    onSubmit={createCourseHandler}
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
                        <Typography variant="h4">Add media</Typography>
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
                        <h2>Upload Video</h2>
                        <br />
                        <input
                            type="file"
                            name="the-name"
                            onChange={handleInputChange}
                            multiple
                        />
                    </FormControl>

                    <div>
                        {currentFile && (
                            <LinearProgress
                                value={progress}
                                variant="determinate"
                            />
                        )}
                        <label className="btn btn-default">
                            <input type="file" onChange={selectFiles} />
                        </label>
                        <button
                            className="btn btn-success"
                            disabled={!selectedFiles}
                            onClick={uploadService}>
                            Upload
                        </button>
                        <div className="alert alert-light" role="alert">
                            {message}
                        </div>
                        <div className="card">
                            <div className="card-header">List of Files</div>
                            <ul className="list-group list-group-flush">
                                {fileInfos && (
                                    <li className="list-group-item">
                                        <a href={fileInfos.url}>
                                            {fileInfos.name}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
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
                        submit
                    </Button>
                </Box>
            )}
        </AdminLayout>
    )
}

export default CreateCourse
