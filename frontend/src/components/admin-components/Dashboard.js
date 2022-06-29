import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import image from '../../assets/images/users.jpg'
import image5 from '../../assets/images/categories.png'
import image2 from '../../assets/images/eCourses.jpg'
import image3 from '../../assets/images/mediaoverview.jpg'
import image4 from '../../assets/images/students.jpg'
import AddIcon from '@mui/icons-material/Add'
import ViewComfyIcon from '@mui/icons-material/ViewComfy'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'

import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'
import axios from 'axios'

const Dashboard = () => {
    const [users, setUsers] = useState(null)
    const [media, setMedia] = useState(null)
    const [courses, setCourses] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:8001/listCourses').then(value => {
            const data = value.data.response.map(course => {
                return course.name
            })

            setCourses(data.length)
        })

        axios.get('http://localhost:8001/listUsers').then(value => {
            const data = value.data.response.map(user => {
                return user.name
            })

            setUsers(data.length)
        })
        axios.get('http://localhost:8001/listMedia').then(value => {
            const data = value.data.response.map(media => {
                return media.title
            })

            setMedia(data.length)
        })
    }, [])

    return (
        <Box ml={10}>
            <Grid
                container
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <Box>
                        <Card sx={{ maxWidth: 500, maxHeight: 700 }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="250"
                                image={image}
                            />
                            <CardContent>
                                <Typography
                                    fontWeight="bold"
                                    gutterBottom
                                    variant="h4"
                                    component="div">
                                    {users}+ users
                                </Typography>
                                <Typography variant="h6" color="#000">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed aliquam velit a metus
                                    dapibus, in malesuada lacus venenatis. Nulla
                                    imperdiet magna libero, a molestie mauris
                                    blandit eleifend. Cras eget facilisis mi.
                                    Duis vehicula augue justo, sed interdum
                                    felis sollicitudin ut. Phasellus feugiat dui
                                    turpis, at ullamcorper dolor convallis ac.
                                    Curabitur ac imperdiet felis, ut dictum
                                    diam. Proin molestie augue nec tortor
                                    fringilla, eget porta felis venenatis. Duis
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    size="large"
                                    color="secondary">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: '#fff',
                                        }}
                                        to="/admin/users/add-user">
                                        Add user
                                    </Link>
                                </Button>
                                <Button
                                    startIcon={<ViewComfyIcon />}
                                    variant="contained"
                                    size="large">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: '#fff',
                                        }}
                                        to="/admin/users/users-overview">
                                        users
                                    </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <Card sx={{ maxWidth: 500, maxHeight: 700 }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="250"
                                image={image2}
                            />
                            <CardContent>
                                <Typography
                                    fontWeight="bold"
                                    gutterBottom
                                    variant="h4"
                                    component="div">
                                    {courses}+ courses
                                </Typography>
                                <Typography variant="h6" color="#000">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed aliquam velit a metus
                                    dapibus, in malesuada lacus venenatis. Nulla
                                    imperdiet magna libero, a molestie mauris
                                    blandit eleifend. Cras eget facilisis mi.
                                    Duis vehicula augue justo, sed interdum
                                    felis sollicitudin ut. Phasellus feugiat dui
                                    turpis, at ullamcorper dolor convallis ac.
                                    Curabitur ac imperdiet felis, ut dictum
                                    diam. Proin molestie augue nec tortor
                                    fringilla, eget porta felis venenatis. Duis
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    size="large"
                                    color="secondary">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: '#fff',
                                        }}
                                        to="/admin/courses/add-course">
                                        Create Course
                                    </Link>
                                </Button>
                                <Button
                                    startIcon={<ViewComfyIcon />}
                                    variant="contained"
                                    size="large">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: '#fff',
                                        }}
                                        to="/admin/courses/courses-overview">
                                        Courses
                                    </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <Card sx={{ maxWidth: 500, maxHeight: 700 }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="250"
                                image={image3}
                            />
                            <CardContent>
                                <Typography
                                    fontWeight="bold"
                                    gutterBottom
                                    variant="h4"
                                    component="div">
                                    {media}+ media
                                </Typography>
                                <Typography variant="h6" color="#000">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed aliquam velit a metus
                                    dapibus, in malesuada lacus venenatis. Nulla
                                    imperdiet magna libero, a molestie mauris
                                    blandit eleifend. Cras eget facilisis mi.
                                    Duis vehicula augue justo, sed interdum
                                    felis sollicitudin ut. Phasellus feugiat dui
                                    turpis, at ullamcorper dolor convallis ac.
                                    Curabitur ac imperdiet felis, ut dictum
                                    diam. Proin molestie augue nec tortor
                                    fringilla, eget porta felis venenatis. Duis
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    color="secondary"
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    size="large">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: '#fff',
                                        }}
                                        to="/admin/media/add-media">
                                        Upload Medium
                                    </Link>
                                </Button>
                                <Button
                                    startIcon={<ViewComfyIcon />}
                                    variant="contained"
                                    size="large">
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: '#fff',
                                        }}
                                        to="/admin/media/media-overview">
                                        Media
                                    </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box>
                        <Card sx={{ maxWidth: 500, maxHeight: 700 }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="250"
                                image={image5}
                            />
                            <CardContent>
                                <Typography
                                    fontWeight="bold"
                                    gutterBottom
                                    variant="h4"
                                    component="div">
                                    5+ categories
                                </Typography>
                                <Typography variant="h6" color="#000">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed aliquam velit a metus
                                    dapibus, in malesuada lacus venenatis. Nulla
                                    imperdiet magna libero, a molestie mauris
                                    blandit eleifend. Cras eget facilisis mi.
                                    Duis vehicula augue justo, sed interdum
                                    felis sollicitudin ut. Phasellus feugiat dui
                                    turpis, at ullamcorper dolor convallis ac.
                                    Curabitur ac imperdiet felis, ut dictum
                                    diam. Proin molestie augue nec tortor
                                    fringilla, eget porta felis venenatis. Duis
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    color="secondary"
                                    startIcon={<AddIcon />}
                                    variant="contained"
                                    size="large">
                                    Categories
                                </Button>
                                <Button
                                    startIcon={<ViewComfyIcon />}
                                    variant="contained"
                                    size="large">
                                    Categories
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
export default Dashboard
