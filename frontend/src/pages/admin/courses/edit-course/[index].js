import AdminLayout from '@/components/Layouts/AdminLayout'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'

import LocationOnIcon from '@mui/icons-material/LocationOn'
import Rating from '@mui/material/Rating'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import React, { useState } from 'react'
const drawerWidth = 240

const EditCourse = () => {
    const [courseName, setCourseName] = useState('')
    const [courseDescription, setCourseDescription] = useState('')
    const [courseImage, setCourseImage] = useState(
        'http://localhost:8001/storage/picture/ILHBkzHQCpN9tKaL8iAABH9XbQLkjkVclYlHBTPn.jpg',
    )
    const [value, setValue] = useState(2)
    const editCourseHandler = () => {
        // TODO: edit course functionallity
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
                        <Image
                            src={courseImage}
                            alt="Picture of the author"
                            width={700}
                            height={400}
                        />
                    </Box>
                    <Box
                        sx={{ display: 'flex', alignSelf: 'flex-start' }}
                        mt={3}>
                        <Typography
                            display="block"
                            variant="h6"
                            fontWeight="bold"
                            fontSize="16px">
                            React - The Complete Guide (incl Hooks, React
                            Router, Redux)
                        </Typography>
                    </Box>
                    <Box
                        sx={{ display: 'flex', alignSelf: 'flex-start' }}
                        mt={3}>
                        <Box>
                            <Typography variant="h6">
                                Dive in and learn React.js from scratch! Learn
                                Reactjs, Hooks, Redux, React Routing,
                                Animations, Next.js and way more!
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
                            Nikola Markovic
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
