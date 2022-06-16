import AdminLayout from '../../../../components/Layouts/AdminLayout'
// eslint-disable-next-line import/extensions
import Videojs from '../../../../video.js'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const drawerWidth = 240

const EditMedia = () => {
    const [Id, setCourseId] = useState(0)
    const [createdAt, setCreatedAt] = useState('')
    const [description, setDescription] = useState('')
    const [courseName, setCourseName] = useState('')
    const [duration, setDuration] = useState(0)
    const [title, setTitle] = useState('')
    const [video, setVideo] = useState('')
    const [mediumID, setMediumID] = useState(0)

    // const [courseName, setCourseName] = useState('')
    // const [courseDescription, setCourseDescription] = useState('')
    // const [courseImage, setCourseImage] = useState('')
    // const [userId, setUserId] = useState(0)
    // const [createdAt, setCreatedAt] = useState('')
    // const [userName, setUserName] = useState('')
    const mediumId = useParams()
    const [value, setValue] = useState(2)
    const editCourseHandler = e => {
        e.preventDefault()
        axios.put(`http://localhost:8001/updateMedium`, {
            title: title,
            cm_id: mediumID,
            description: description,
        })
    }
    // console.log(userId)

    const getData = () => {
        axios
            .get(`http://localhost:8001/getMedium/${mediumId.mid}`)
            .then(res => {
                console.log(res)
                const {
                    cm_id,
                    course_id,
                    created_at,
                    description,
                    duration,
                    filename,
                    title,
                } = res.data.media
                axios
                    .get(`http://localhost:8001/getCourse/${course_id}`)
                    .then(value => {
                        console.log(value)
                        setCourseName(value.data.media.name)
                    })
                const date = new Date(created_at).toDateString()
                setMediumID(cm_id)
                setCreatedAt(date)
                setDescription(description)
                setDuration(duration)
                setVideo(filename)
                setTitle(title)
            })
    }

    useEffect(() => {
        getData()
    }, [])
    let videoJsOptions = {}
    if (video) {
        videoJsOptions = {
            autoplay: false,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            width: 720,
            height: 300,
            controls: true,
            sources: [
                {
                    src: `http://localhost:8001/storage/media/${video}`,
                    type: 'video/mp4',
                },
            ],
        }
    }
    return (
        <AdminLayout>
            <Box
                mt={10}
                sx={{
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                <Box
                    mt={5}
                    display="flex"
                    flexDirection="column"
                    alignItems="center">
                    <Box display="flex" justifyContent="center">
                        {video ? (
                            <Videojs {...videoJsOptions} />
                        ) : (
                            <CircularProgress />
                        )}
                    </Box>
                    <Box
                        sx={{ display: 'flex', alignSelf: 'flex-start' }}
                        mt={3}>
                        <Typography
                            display="block"
                            variant="h6"
                            fontWeight="bold"
                            fontSize="16px">
                            {title}
                        </Typography>
                    </Box>
                    <Box
                        sx={{ display: 'flex', alignSelf: 'flex-start' }}
                        mt={3}>
                        <Box>
                            <Typography variant="h6">{description}</Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{ display: 'flex', alignSelf: 'flex-start' }}
                        mt={3}>
                        <Typography
                            sx={{ marginRight: '10px' }}
                            textAlign="center"
                            fontWeight="bold"
                            variant="subtitle1">
                            Course Name :
                        </Typography>
                        <Typography
                            textAlign="center"
                            fontWeight="bold"
                            variant="h6">
                            {courseName}
                        </Typography>
                    </Box>
                    <Box
                        sx={{ display: 'flex', alignSelf: 'flex-start' }}
                        mt={3}>
                        <Typography
                            sx={{ marginRight: '10px' }}
                            textAlign="center"
                            fontWeight="bold"
                            variant="subtitle1">
                            Rating :
                        </Typography>
                        <Rating
                            sx={{ fontSize: '16px' }}
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue)
                            }}
                        />
                    </Box>
                    <Box
                        mt={2}
                        sx={{ display: 'flex', alignSelf: 'flex-start' }}>
                        <Typography
                            sx={{ marginRight: '10px' }}
                            textAlign="center"
                            fontWeight="bold"
                            variant="subtitle1">
                            Created At: {createdAt}
                        </Typography>
                    </Box>
                    <Box sx={{ alignSelf: 'flex-start' }} pt={5}>
                        {/*<AuthValidationErrors*/}
                        {/*    style={{ marginBottom: '20px' }}*/}
                        {/*    errors={errors}*/}
                        {/*/>*/}
                        <Typography variant="h4">Edit Medium</Typography>
                        <Box
                            onSubmit={editCourseHandler}
                            mt={3}
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
                                    Medium Name
                                </InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={title}
                                    onChange={event =>
                                        setTitle(event.target.value)
                                    }
                                    label="Course name"
                                />
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="component-outlined">
                                    Description
                                </InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={description}
                                    onChange={event =>
                                        setDescription(event.target.value)
                                    }
                                    label="Description"
                                />
                            </FormControl>
                            <Button
                                className="ml-4"
                                style={{
                                    marginTop: '3rem',
                                    fontSize: 10,
                                    width: '120px',
                                    height: '30px',
                                }}
                                type="submit"
                                variant="contained"
                                color="primary">
                                edit medium
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AdminLayout>
    )
}

export default EditMedia
