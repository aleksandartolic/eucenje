import AdminLayout from '../../../../components/Layouts/AdminLayout'
import { Box, Button, CircularProgress, Typography } from '@mui/material'
import Rating from '@mui/material/Rating'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const drawerWidth = 240

const EditCourse = () => {
    const [courseName, setCourseName] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [courseImage, setCourseImage] = useState('')
    const [userId, setUserId] = useState(0)
    const [createdAt, setCreatedAt] = useState('')
    const [userName, setUserName] = useState('')
    const courseId = useParams()
    const [value, setValue] = useState(2)
    const editCourseHandler = e => {
        e.preventDefault()
        const courseID = parseInt(courseId.cid)
        const userID = parseInt(userId)
        console.log(courseID, userID)
        axios.put(`http://localhost:8001/updateCourse`, {
            name: courseName,
            course_id: courseID,
            uid: userID,
            description: courseDescription,
        })
    }
    console.log(userId)

    const getData = () => {
        axios
            .get(`http://localhost:8001/getCourse/${courseId.cid}`)
            .then(res => {
                const {
                    created_at,
                    description,
                    name,
                    picture,
                    uid,
                } = res.data.media
                axios
                    .get(`http://localhost:8001/getUser/${uid}`)
                    .then(value => {
                        setUserName(value.data.user.name)
                    })
                setCourseDescription(description)
                setCourseName(name)
                setCourseImage(
                    `http://localhost:8001/storage/picture/${picture}`,
                )
                const date = new Date(created_at).toDateString()
                setUserId(uid)
                setCreatedAt(date)
            })
    }

    useEffect(() => {
        getData()
    }, [])

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
                        {courseImage ? (
                            <img
                                src={courseImage}
                                alt="Course Image"
                                width={700}
                                height={400}
                            />
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
                            {courseName}
                        </Typography>
                    </Box>
                    <Box
                        sx={{ display: 'flex', alignSelf: 'flex-start' }}
                        mt={3}>
                        <Box>
                            <Typography variant="h6">
                                {courseDescription}
                            </Typography>
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
                            Author :
                        </Typography>
                        <Typography
                            textAlign="center"
                            fontWeight="bold"
                            variant="h6">
                            {userName}
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
                        <Typography variant="h4">Edit Course</Typography>
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
                                    Course name
                                </InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={courseName}
                                    onChange={event =>
                                        setCourseName(event.target.value)
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
                                    value={courseDescription}
                                    onChange={event =>
                                        setCourseDescription(event.target.value)
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
                                edit course
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AdminLayout>
    )
}

export default EditCourse
