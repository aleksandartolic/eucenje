import * as React from 'react'

import Box from '@mui/material/Box'

import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    Select,
    InputLabel,
    CardHeader,
    Divider,
    Button,
    CircularProgress,
} from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'

const SearchBar = ({ setSearchQuery }) => (
    <form
        style={{
            '@media screen and (max-width: 1000px)': {
                marginBottom: '5%',
                width:"100%"
            },
        }}>
        <TextField
            sx={{
                '@media screen and (max-width: 1000px)': {
                    marginBottom: '10%',
                },
            }}
            id="search-bar"
            className="text"
            onInput={e => {
                setSearchQuery(e.target.value)
            }}
            label="Enter a city name"
            variant="outlined"
            placeholder="Search..."
            size="small"
        />
        <IconButton type="submit" aria-label="search">
            <SearchIcon style={{ fill: 'blue' }} />
        </IconButton>
    </form>
)

export default function StudentHome() {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('-')
    const [loadiong, setLoading] = useState(false)
    const [coursesLoadiong, setCoursesLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const onChangeCategory = e => {
        setCategory(e.target.value)
    }

    useEffect(async () => {
        setLoading(true)
        await axios.get('http://localhost:8001/listCourses').then(course => {
            setCourses(course.data.response)
        })

        await axios
            .get('http://localhost:8001/getCategories')
            .then(response => {
                setCategories(response.data.categories)
            })
        setLoading(false)
    }, [])

    useEffect(async () => {
        if (category !== '-') {
            setCoursesLoading(true)
            await axios
                .get(`http://localhost:8001/getCoursesByCategory/${category}`)
                .then(course => {
                    console.log(course)
                    setCourses(course.data.courses)
                })
            setCoursesLoading(false)
        } else {
            setCoursesLoading(true)
            await axios
                .get('http://localhost:8001/listCourses')
                .then(course => {
                    setCourses(course.data.response)
                })
            setCoursesLoading(false)
        }
    }, [category])

    const proceedToCourseHandler = e => {
        console.log(e.target.id)
        navigate(`/student/courses/${e.target.id}`)
    }

    if (loadiong) {
        return <CircularProgress />
    }

    return (
        <Box
            sx={{
                '@media screen and (max-width: 1000px)': {
                    justifyContent: 'center',
                },
            }}
            display="flex"
            flexDirection="column">
            <Box
                sx={{
                    '@media screen and (max-width: 1000px)': {
                      alignItems:"center",
                        flexDirection: 'column',
                    },
                }}
                minWidth="90vw"
                display="flex"
                justifyContent="space-between">
                {courses ? (
                    <Box
                        sx={{
                            '@media screen and (max-width: 1000px)': {
                                paddingBottom: '0',
                                marginBottom: '3%',
                            },
                        }}
                        pb={7}>
                        <Typography variant="h3">
                            Choose over {courses.length} courses
                        </Typography>{' '}
                    </Box>
                ) : (
                    <CircularProgress />
                )}
                <SearchBar
                    sx={{
                        '@media screen and (max-width: 1000px)': {
                            marginBottom: '5%',
                        },
                    }}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <FormControl
                    sx={{ marginBottom: '5%' }}>
                    <InputLabel>Categories</InputLabel>
                    <Select
                        sx={{ minWidth: '200px' }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Categories"
                        onChange={onChangeCategory}>
                        <MenuItem value={'-'}>{'-'}</MenuItem>
                        {categories.map(categoryObj => {
                            return (
                                <MenuItem
                                    key={categoryObj.name}
                                    value={categoryObj.category_id}>
                                    {categoryObj.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
            {!coursesLoadiong ? (
                <Box
                    display="flex"
                    justifyContent="space-between"
                    flexWrap={'wrap'}
                    sx={{
                        '@media screen and (max-width: 1669px)': {
                            justifyContent: 'center',
                        },
                    }}
                    height="auto">
                    {courses.map((course, index) => {
                        return (
                            <Box mb={3} mr={3} key={index}>
                                <Card
                                    sx={{
                                        maxWidth: 400,
                                        minHeight: 500,
                                        transition: '0.3s',
                                        boxShadow:
                                            'box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            boxShadow:
                                                '0 16px 70px -12.125px rgba(0,0,0,0.3)',
                                        },
                                    }}>
                                    <CardHeader
                                        title={course.name}
                                        subheader={new Date(
                                            course.created_at,
                                        ).toDateString()}
                                    />
                                    <CardMedia
                                        sx={{
                                            paddingTop: '10px',
                                        }}>
                                        <img
                                            width="400px"
                                            height="300px"
                                            alt="za malo da se ucita"
                                            src={`http://127.0.0.1:8001/storage/picture/${
                                                course.picture ? (
                                                    course.picture
                                                ) : (
                                                    <CircularProgress />
                                                )
                                            }`}
                                        />
                                    </CardMedia>
                                    <CardContent
                                        sx={{
                                            textAlign: 'left',
                                            padding: '20px',
                                        }}>
                                        <Typography
                                            className={'MuiTypography--heading'}
                                            variant={'h4'}
                                            gutterBottom>
                                            {course.name}
                                        </Typography>
                                        <Typography
                                            className={
                                                'MuiTypography--subheading'
                                            }
                                            variant="h6">
                                            {course.description}
                                        </Typography>
                                        <Divider light />
                                        <Button
                                            onClick={proceedToCourseHandler}
                                            id={course.course_id}
                                            sx={{ marginTop: '10px' }}
                                            variant="contained"
                                            color="secondary">
                                            Join Course
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        )
                    })}
                </Box>
            ) : (
                <CircularProgress />
            )}
        </Box>
    )
}
