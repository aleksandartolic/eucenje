import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Typography,
} from '@mui/material'

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
        <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <Box>
                    {' '}
                    <Card
                        sx={{
                            maxWidth: 345,
                            backgroundColor: '#0d3b69',
                            color: '#fff',
                        }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography
                                    color="#fff"
                                    gutterBottom
                                    variant="h3"
                                    component="div">
                                    {users}+ users
                                </Typography>
                                <Typography
                                    sx={{ color: '#fff' }}
                                    variant="h6"
                                    color="text.secondary">
                                    This is a user section, check how many users
                                    are on the platfrom
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ backgroundColor: '#5e9fe0' }}>
                            <Button
                                sx={{ color: '#fff', fontSize: '10px' }}
                                size="small"
                                color="primary">
                                Check
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box>
                    {' '}
                    <Card
                        sx={{
                            maxWidth: 345,
                            backgroundColor: '#0d3b69',
                            color: '#fff',
                        }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography
                                    color="#fff"
                                    gutterBottom
                                    variant="h3"
                                    component="div">
                                    {courses}+ courses
                                </Typography>
                                <Typography
                                    sx={{ color: '#fff' }}
                                    variant="h6"
                                    color="text.secondary">
                                    This is a courses section, check how many
                                    courses are available on platfrom
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ backgroundColor: '#5e9fe0' }}>
                            <Button
                                sx={{ color: '#fff', fontSize: '10px' }}
                                size="small"
                                color="primary">
                                Check
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box>
                    {' '}
                    <Card
                        sx={{
                            maxWidth: 345,
                            backgroundColor: '#0d3b69',
                            color: '#fff',
                        }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography
                                    color="#fff"
                                    gutterBottom
                                    variant="h3"
                                    component="div">
                                    {media}+ media
                                </Typography>
                                <Typography
                                    sx={{ color: '#fff' }}
                                    variant="h6"
                                    color="text.secondary">
                                    This is a media section, check how many
                                    media are on the platfrom
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ backgroundColor: '#5e9fe0' }}>
                            <Button
                                sx={{ color: '#fff', fontSize: '10px' }}
                                size="small"
                                color="primary">
                                Check
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Box>
                    {' '}
                    <Card
                        sx={{
                            maxWidth: 345,
                            backgroundColor: '#0d3b69',
                            color: '#fff',
                        }}>
                        <CardActionArea>
                            <CardContent>
                                <Typography
                                    color="#fff"
                                    gutterBottom
                                    variant="h3"
                                    component="div">
                                    Over the{' '}
                                    <span style={{ color: '#3084d7' }}>
                                        300
                                    </span>{' '}
                                    Students
                                </Typography>
                                <Typography
                                    sx={{ color: '#fff' }}
                                    variant="h6"
                                    color="text.secondary">
                                    This is a user section, check how many users
                                    are on the platfrom
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ backgroundColor: '#5e9fe0' }}>
                            <Button
                                sx={{ color: '#fff', fontSize: '10px' }}
                                size="small"
                                color="primary">
                                Check
                            </Button>
                        </CardActions>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    )
}
export default Dashboard
