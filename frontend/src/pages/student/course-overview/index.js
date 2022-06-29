import React, { useEffect } from 'react'
import StudentLayout from '../../../components/Layouts/StudentLayout'
import {
    Avatar,
    Box,
    Button,
    Card,
    CircularProgress,
    TextField,
    Typography,
} from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Videojs from '../../../video'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FormControl from '@mui/material/FormControl'
import Badge from '@mui/material/Badge'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import theme from '../../../theme'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import InstagramIcon from '@mui/icons-material/Instagram'
const CourseOverview = () => {
    const [courseMedia, setCourseMedia] = useState([])
    const [videoSrc, setVideoSrc] = useState('')
    const [currentComment, setCurrentComment] = useState('')
    const [currentCategories, setCurrentCategories] = useState([])
    const [currentTitle, setCurrentTitle] = useState('')
    const [currentMediaId, setCurrentMediaId] = useState('')
    const [currentUser, setCurrentUser] = useState('')
    const [currentDescription, setCurrentDescription] = useState('')
    const [comments, setListComments] = useState([])
    const [listUsers, setListUsers] = useState([])
    const [courseOwner, setCourseOwner] = useState('')
    const [courseCreatedAt, setCourseCreatedAt] = useState('')
    const [currentUserRole, setCurrentUserRole] = useState('')
    const [loading, setLoadading] = useState(false)
    const courseId = useParams()

    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const addCommentHandler = e => {
        e.preventDefault()
        const user = parseInt(userId)
        const media = parseInt(currentMediaId)

        if (!currentComment) {
            return alert('Please enter the comment')
        }

        axios
            .post('http://localhost:8001/createComment', {
                uid: user,
                cm_id: media,
                comment: currentComment,
            })
            .then(() => {
                setCurrentComment('')
                if (currentMediaId) {
                    let id = parseInt(currentMediaId)
                    axios
                        .get(`http://localhost:8001/listComments/${id}`)
                        .then(res => {
                            setListComments(res.data.response)
                        })
                }
            })
    }

    const changeCurrentComment = e => {
        e.preventDefault()
        setCurrentComment(e.target.value)
    }

    const changeVideoPlayer = e => {
        let video = document.getElementsByClassName('vjs-tech')
        video[0].src = e.target.src
        let currentTitleDescription = courseMedia.filter(medium => {
            return (
                `http://localhost:8001/storage/media/${medium.medium.filename}` ===
                e.target.src
            )
        })
        const description = currentTitleDescription[0].medium.description
        const title = currentTitleDescription[0].medium.title
        setCurrentMediaId(currentTitleDescription[0].medium.cm_id)
        setCurrentDescription(description)
        setCurrentTitle(title)
    }

    const getData = () => {
        setLoadading(true)
        axios
            .get(`http://localhost:8001/getCourseMedia/${courseId.cid}`)
            .then(value => {
                setCourseMedia(value.data.media)
                setCurrentTitle(value.data.media[0].medium.title)
                setCurrentDescription(value.data.media[0].medium.description)
                setCurrentMediaId(value.data.media[0].medium.cm_id)
            })
        axios
            .get(`http://localhost:8001/getCourseCategories/${courseId.cid}`)
            .then(res => {
                setCurrentCategories(res.data.courses)
            })

        axios.get(`http://localhost:8001/listUsers`).then(response => {
            setListUsers(response.data.response)
        })

        axios.get(`http://localhost:8001/getUser/${userId}`).then(response => {
            setCurrentUser(response.data.user.name)

            setCurrentUserRole(response.data.user.role)
        })
        setLoadading(false)
    }

    useEffect(() => {
        if (currentMediaId) {
            let id = parseInt(currentMediaId)
            axios.get(`http://localhost:8001/listComments/${id}`).then(res => {
                setListComments(res.data.response)
            })
        }
    }, [currentMediaId])

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        axios
            .get(`http://localhost:8001/getCourse/${courseId.cid}`)
            .then(response => {
                if (listUsers) {
                    listUsers.map(user => {
                        if (user.id === response.data.media.uid) {
                            setCourseOwner(user.name)
                        }
                    })
                }
                setCourseCreatedAt(
                    new Date(response.data.media.created_at).toDateString(),
                )
            })
    }, [listUsers])

    const handleDeleteCurrentMedium = () => {
        axios
            .delete(`http://localhost:8001/deleteMedium/${currentMediaId}`)
            .then(() => {
                axios
                    .get(`http://localhost:8001/getCourseMedia/${courseId.cid}`)
                    .then(value => {
                        setCourseMedia(value.data.media)
                        setCurrentTitle(value.data.media[0].medium.title)
                        setCurrentDescription(
                            value.data.media[0].medium.description,
                        )
                        setCurrentMediaId(value.data.media[0].medium.cm_id)
                    })
                    .then(() => {
                        if (courseMedia) {
                            console.log(courseMedia)
                            let video = document.getElementsByClassName(
                                'vjs-tech',
                            )
                            video[0].src = `http://localhost:8001/storage/media/${courseMedia[0].medium.filename}`
                        }
                    })
            })
            .catch(error => {})
    }

    let videoJsOptions = {}
    if (courseMedia[0] && videoSrc === '') {
        videoJsOptions = {
            id: 'test',
            autoplay: false,
            playbackRates: [0.5, 1, 1.25, 1.5, 2],
            controls: true,
            sources: [
                {
                    src:
                        videoSrc !== ''
                            ? videoSrc
                            : `http://localhost:8001/storage/media/${courseMedia[0].medium.filename}`,
                    type: 'video/mp4',
                },
            ],
        }
    }

    return (
        <StudentLayout>
            <Box
                alignItems="flex-start"
                justifyContent="flex-start"
                display="flex"
                flexDirection="column"
                px={8}
                py={8}
                flex={1}
                width="100%"
                minHeight={1700}
                sx={{
                    backgroundColor: '#fff',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}>
                <Box
                    display="flex"
                    mb={3}
                    width="100%"
                    alignItems="center"
                    justifyContent="space-between">
                    <Box>
                        <Button
                            component={Link}
                            color="secondary"
                            to="/student"
                            width={400}
                            variant="contained"
                            startIcon={<ArrowBackIcon />}>
                            Back to the courses
                        </Button>
                    </Box>
                    <Box>
                        {courseCreatedAt ? (
                            <Typography color="gray" variant="h6">
                                Published:{courseCreatedAt}
                            </Typography>
                        ) : (
                            <CircularProgress />
                        )}
                        {courseOwner ? (
                            <Typography color="gray" variant="h6">
                                Teacher:{courseOwner}
                            </Typography>
                        ) : (
                            <CircularProgress />
                        )}
                    </Box>
                </Box>
                {/* VIDEOS WRAPPER */}
                <Box
                    alignItems="flex-start"
                    display="flex"
                    width="100%"
                    height="60%"
                    justifyContent="space-between"
                    sx={{
                        '@media screen and (max-width: 1669px)': {
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 'auto',
                            flexDirection: 'column-reverse',
                        },
                    }}>
                    {/* MAIN VIDEO*/}
                    <Box
                        width="100%"
                        sx={{
                            backgroundColor: 'blue',
                            '.video-js': {
                                height: '100% !important',
                                width: '100% !important',
                                '@media screen and (max-width: 1669px)': {
                                    justifyContent: 'center',
                                    minHeight: '80% !important',
                                    height: '80%',
                                    alignItems: 'center',
                                },
                            },
                        }}
                        height="100%">
                        {courseMedia[0] ? (
                            <Videojs id="change-id" {...videoJsOptions} />
                        ) : (
                            <CircularProgress />
                        )}
                    </Box>
                </Box>
                {/* SIDE VIDEOS */}
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="space-between"
                    mt={'2%'}>
                    {/* MEDIUM INFO START */}
                    <Box width="70%">
                        <Box>
                            {courseMedia[0] ? (
                                <Box
                                    mb={2}
                                    display="flex"
                                    flexDirection="column">
                                    {currentUserRole &&
                                        (currentUserRole === 1 ||
                                            currentUserRole === 2) && (
                                            <Box display="flex">
                                                <Button
                                                    onClick={
                                                        handleDeleteCurrentMedium
                                                    }
                                                    sx={{
                                                        color: '#9c27b0',
                                                    }}
                                                    startIcon={<DeleteIcon />}>
                                                    Delete
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        navigate(
                                                            `/admin/courses/edit-medium/${currentMediaId}`,
                                                        )
                                                    }}
                                                    sx={{
                                                        color: '#9c27b0',
                                                    }}
                                                    size="large"
                                                    startIcon={<EditIcon />}>
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        navigate(
                                                            '/admin/media/add-media',
                                                        )
                                                    }}
                                                    sx={{
                                                        color: '#9c27b0',
                                                    }}
                                                    size="large"
                                                    startIcon={<AddIcon />}>
                                                    Upload
                                                </Button>
                                            </Box>
                                        )}
                                    <Box
                                        mt={2}
                                        mb={2}
                                        display="flex"
                                        justifyContent="felx-start">
                                        {currentCategories ? (
                                            currentCategories.map(category => {
                                                return (
                                                    <Typography
                                                        sx={{
                                                            color: '#1976d2',
                                                            marginRight: '5%',
                                                        }}
                                                        variant="h5"
                                                        key={category.name}>
                                                        {'#' + category.name}
                                                    </Typography>
                                                )
                                            })
                                        ) : (
                                            <CircularProgress />
                                        )}
                                    </Box>
                                    <Box alignSelf="flex-start" mb={3}>
                                        <Typography variant="h3">
                                            {currentTitle}
                                        </Typography>
                                    </Box>
                                    <Box alignSelf="flex-start" mt={2}>
                                        <Typography
                                            color="#9c27b0"
                                            variant="h4">
                                            Description
                                        </Typography>
                                    </Box>
                                    <Box alignSelf="flex-start" mt={2}>
                                        <Typography variant="h5">
                                            {currentDescription}
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <CircularProgress />
                            )}
                        </Box>

                        {/*COMMENTS START*/}
                        <Typography
                            sx={{ color: '#9c27b0', marginTop: '2%' }}
                            variant="h4">
                            Comments
                        </Typography>
                        <Box
                            mt={5}
                            p={10}
                            justifyContent="flex-start"
                            display="flex"
                            flexDirection="column"
                            width="100%"
                            height="auto"
                            overflow="auto"
                            sx={{
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                                '@media screen and (max-width: 1669px)': {
                                    p: 1,
                                },
                            }}>
                            <Box component="form" onSubmit={addCommentHandler}>
                                {currentUser ? (
                                    <Box
                                        mb={2}
                                        display="flex"
                                        alignItems="center">
                                        <Avatar
                                            sx={{
                                                marginRight: '1%',
                                                height: '20px',
                                                width: '20px',
                                            }}
                                        />{' '}
                                        {currentUser}
                                    </Box>
                                ) : (
                                    <CircularProgress />
                                )}
                                <FormControl
                                    sx={{ marginBottom: '40px' }}
                                    fullWidth>
                                    <TextField
                                        value={currentComment}
                                        onChange={changeCurrentComment}
                                        variant="outlined"
                                        placeholder="Enter the comment..."
                                    />
                                </FormControl>
                                <Box display="flex" flexDirection="column">
                                    {comments ? (
                                        comments.map(comment => {
                                            return (
                                                <Box
                                                    sx={{
                                                        boxShadow:
                                                            'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;',
                                                        px: 2,
                                                        py: 1,
                                                        borderRadius: 5,
                                                    }}
                                                    key={comment.comment_id}
                                                    display="flex"
                                                    justifyContent="flex-start"
                                                    alignItems="center"
                                                    flexDirection="column"
                                                    width="100%"
                                                    mb={2}
                                                    bgcolor="#fff">
                                                    <Box
                                                        display="flex"
                                                        justifyContent="space-between"
                                                        width="100%">
                                                        <Typography
                                                            variant="caption"
                                                            fontSize="12px">
                                                            {new Date(
                                                                comment.created_at,
                                                            ).toDateString()}
                                                        </Typography>
                                                        <Badge
                                                            sx={{
                                                                display: 'flex',
                                                                justifyContent:
                                                                    'center',
                                                                alignItems:
                                                                    'center',
                                                                p: '3px',
                                                                width: '50px',
                                                                fontSize:
                                                                    '12px',
                                                                borderRadius:
                                                                    '5px',
                                                                color: '#fff',
                                                                backgroundColor:
                                                                    'rgb(33, 150, 243)',
                                                            }}>
                                                            {listUsers.map(
                                                                user => {
                                                                    if (
                                                                        user.id ===
                                                                        comment.uid
                                                                    ) {
                                                                        if (
                                                                            user.role ===
                                                                            3
                                                                        ) {
                                                                            return 'student'
                                                                        }
                                                                        if (
                                                                            user.role ===
                                                                            2
                                                                        ) {
                                                                            return 'teacher'
                                                                        }
                                                                        if (
                                                                            user.role ===
                                                                            1
                                                                        ) {
                                                                            return 'admin'
                                                                        }
                                                                    }
                                                                },
                                                            )}
                                                        </Badge>
                                                    </Box>
                                                    <Box
                                                        display="flex"
                                                        width="100%"
                                                        justifyContent="flex-start">
                                                        <Box alignSelf="flex-end">
                                                            <Avatar
                                                                sx={{
                                                                    marginRight:
                                                                        '10px',
                                                                    height:
                                                                        '20px',
                                                                    width:
                                                                        '20px',
                                                                }}
                                                            />
                                                        </Box>
                                                        <Box
                                                            display="flex"
                                                            flexDirection="column">
                                                            <Typography
                                                                fontWeight="bold"
                                                                sx={{
                                                                    marginRight:
                                                                        '20px',
                                                                }}
                                                                variant="h6">
                                                                {listUsers.map(
                                                                    user => {
                                                                        if (
                                                                            user.id ===
                                                                            comment.uid
                                                                        ) {
                                                                            return user.name
                                                                        }
                                                                    },
                                                                )}
                                                            </Typography>
                                                        </Box>
                                                        <Box
                                                            flex={1}
                                                            height="auto"
                                                            display="flex"
                                                            alignSelf="flex-end">
                                                            <Typography
                                                                align="justify"
                                                                style={{
                                                                    wordWrap:
                                                                        'break-word',
                                                                }}
                                                                sx={{
                                                                    maxWidth:
                                                                        '100%',
                                                                }}
                                                                variant="h6">
                                                                {
                                                                    comment.comment
                                                                }
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            )
                                        })
                                    ) : (
                                        <CircularProgress />
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {courseMedia[0] && (
                        <Box
                            display="flex"
                            minWidth="30%"
                            height="100%"
                            alignItems="flex-end"
                            overflow="auto"
                            flexDirection="column"
                            sx={{
                                '@media screen and (max-width: 1669px)': {
                                    minHeight: 'auto',
                                    height: '100%',
                                    flexDirection: 'row',
                                    width: '80%',
                                    flexWrap: 'nowrap',
                                    justifyContent: 'flex-start',
                                    pl: '10%',
                                    overflow: 'scroll',
                                    alignItems: 'center',
                                },
                            }}>
                            {courseMedia.map(medium => {
                                return (
                                    <Box key={medium.medium.filename}>
                                        <video
                                            style={{
                                                padding: 0,
                                                cursor: 'pointer',
                                            }}
                                            key={medium.medium.filename}
                                            onClick={changeVideoPlayer}
                                            src={`http://localhost:8001/storage/media/${medium.medium.filename}`}
                                            width="100%"
                                            height={100}
                                        />
                                        <Typography variant="h6">
                                            {medium.medium.title.length > 15
                                                ? medium.medium.title.slice(
                                                      0,
                                                      30,
                                                  ) + '...'
                                                : medium.medium.title}
                                        </Typography>
                                    </Box>
                                )
                            })}
                        </Box>
                    )}
                </Box>
            </Box>
        </StudentLayout>
    )
}
export default CourseOverview
