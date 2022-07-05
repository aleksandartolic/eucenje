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
    const [userRole,setUserRole] = useState("")

    const  userId = localStorage.getItem("userId");
    useEffect( ()=>{
         axios.get(`http://localhost:8001/getUser/${userId}`).then((response)=>{
            setUserRole(response.data.user.role)

        })

    },[])

    useEffect(async() => {
        console.log(userRole);
        if(userRole === 1){
            await axios.get('http://localhost:8001/listCourses').then(value => {
                const data = value.data.response.map(course => {
                    return course.name
                })

                setCourses(data.length)
            })

            await axios.get('http://localhost:8001/listUsers').then(value => {
                const data = value.data.response.map(user => {
                    return user.name
                })

                setUsers(data.length)
            })
            await axios.get('http://localhost:8001/listMedia').then(value => {
                const data = value.data.response.map(media => {
                    return media.title
                })

                setMedia(data.length)
            })
        }
        if(userRole === 2){
            console.log("exectued")
            axios.get(`localhost:8001/getUserCourses/${userId}`).then(value => {
                console.log(value);
                const data = value.data.response.map(course => {
                    return course.name
                })
                setCourses(data.length)
            })
        }

    }, [userRole])


    if(userRole === 2) {


        return <Box
            display="flex"
            container
            flexDirection="column"
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Box mb={5} display="flex"  justifyContent="space-around" sx={{ '@media screen and (max-width: 1197px)': {
                    flexDirection: 'column-reverse', gap:"40px", width:"100%", justifyContent:"center", alignItems:"center"
                },}} xs={6}>
                <Box>
                    <Card sx={{ maxWidth: 500, maxHeight: 700 }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="250"
                            image={image2}
                        />
                        <CardContent>
                            {courses && <Typography
                                fontWeight="bold"
                                gutterBottom
                                variant="h4"
                                component="div">
                                {courses}+ courses
                            </Typography>}
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
                <Box mr={10} sx={{ '@media screen and (max-width: 1197px)': {
                        marginRight:"0"
                    },}}>
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
            </Box>
        </Box>
    }

    return (

        <Box
                display="flex"
                container
                flexDirection="column"
                rowSpacing={4}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Box mb={5} display="flex"  justifyContent="space-around" sx={{ '@media screen and (max-width: 1197px)': {
                        flexDirection: 'column-reverse', gap:"40px", width:"100%", justifyContent:"center", alignItems:"center"
                    },}} xs={6}>
                    <Box mr={10} sx={{ '@media screen and (max-width: 1197px)': {
                           marginRight: "0"
                        },}}>

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
                </Box>
                <Box display="flex"  justifyContent="space-around" sx={{ '@media screen and (max-width: 1197px)': {
                        flexDirection: 'column-reverse', gap:"40px", width:"100%", justifyContent:"center", alignItems:"center"
                    },}} xs={6}>
                    <Box mr={10} sx={{ '@media screen and (max-width: 1197px)': {
                            marginRight:"0"
                        },}}>
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
                </Box>
            </Box>
    )
}
export default Dashboard
