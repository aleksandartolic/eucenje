import React, { useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import ReactPlayer from 'react-player'
import { Box } from '@mui/system'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@material-ui/core/TextField'

import axios from '@/lib/axios'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import VideoJS from '@/components/admin-components/video'

function MainContent() {

    const router = useRouter()

    const [mediaFile, setMediaFile] = useState(null)
    if (router.query.courseId) {
        useEffect(() => {
            axios.get(`http://localhost:8001/getMedium/25`).then(response => {
                console.log(response.data)
                // setMediaFile(response.data.media.filename)
            })
        }, [])
    }

    let videoJsOptions = ''
    if (mediaFile) {
        videoJsOptions = {
            autoplay: true,
            controls: true,
            responsive: true,
            fluid: true,
            sources: [
                {
                    src: `http://localhost:8001/storage/media/${mediaFile}`,
                    type: 'video/mp4',
                },
            ],
        }
    }
    const playerRef = React.useRef(null)

    const handlePlayerReady = player => {
        playerRef.current = player

        // You can handle player events here, for example:
        player.on('waiting', () => {
            player.log('player is waiting')
        })

        player.on('dispose', () => {
            player.log('player will dispose')
        })
    }

    return (
        mediaFile && (
            <Box
                pl={8}
                sx={{
                    display: 'flex',
                    height: 'auto',
                    justifyContent: 'space-between',
                }}>
                <Box sx={{ width: '800px', height: 'auto' }}>
                    <Card sx={{ width: '800px', height: '800px' }}>
                        <VideoJS
                            options={videoJsOptions}
                            onReady={handlePlayerReady}
                        />
                        <CardContent>
                            {/*    <Typography*/}
                            {/*        style={{ fontWeight: 'bold' }}*/}
                            {/*        gutterBottom*/}
                            {/*        variant="h3"*/}
                            {/*        component="h2">*/}
                            {/*        /!*{currentName}*!/*/}
                            {/*    </Typography>*/}
                            {/*    <Typography variant="h5">*/}
                            {/*        /!*{currentDescription}*!/*/}
                            {/*    </Typography>*/}

                            {/*    <Box mt={3}>*/}
                            {/*        <Box>*/}
                            {/*            <Typography variant="h4" gutterBottom>*/}
                            {/*                Comments*/}
                            {/*            </Typography>*/}
                            {/*        </Box>*/}
                            {/*        <Box*/}
                            {/*            sx={{*/}
                            {/*                display: 'flex',*/}
                            {/*                justifyContent: 'space-between',*/}
                            {/*            }}>*/}
                            {/*            <TextField*/}
                            {/*                value={currentComment}*/}
                            {/*                onChange={e => {*/}
                            {/*                    setCurrentComment(e.target.value)*/}
                            {/*                }}*/}
                            {/*                placeholder="Comment"*/}
                            {/*                fullWidth*/}
                            {/*            />*/}
                            {/*            <Button*/}
                            {/*                onClick={() => {*/}
                            {/*                    setComments([*/}
                            {/*                        ...comments,*/}
                            {/*                        currentComment,*/}
                            {/*                    ])*/}
                            {/*                }}>*/}
                            {/*                Comment*/}
                            {/*            </Button>*/}
                            {/*        </Box>*/}
                            {/*    </Box>*/}

                            {/*    {comments.map(comment => (*/}
                            {/*        <Box sx={{ display: 'flex' }} pt={4}>*/}
                            {/*            <AccountCircleIcon />*/}
                            {/*            <Typography*/}
                            {/*                style={{*/}
                            {/*                    marginLeft: '10px',*/}
                            {/*                    fontWeight: 'bold',*/}
                            {/*                }}>*/}
                            {/*                Nikola Markovic*/}
                            {/*            </Typography>*/}
                            {/*            <Typography style={{ marginLeft: '20px' }}>*/}
                            {/*                {comment}*/}
                            {/*            </Typography>*/}
                            {/*        </Box>*/}
                            {/*    ))}*/}
                        </CardContent>
                    </Card>
                </Box>
                <Box ml={10} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <List
                        sx={{
                            width: '200px',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 700,
                            '& ul': { padding: 0 },
                        }}
                        subheader={<li />}>
                        {/*{video.map((videoToPlay, index) => (*/}
                        {/*    <li*/}
                        {/*        style={{ cursor: 'pointer' }}*/}
                        {/*        id="6"*/}
                        {/*        key={`section-${videoToPlay.id}`}>*/}
                        {/*        <ul>*/}
                        {/*            <ListItem*/}
                        {/*                id="6"*/}
                        {/*                key={`item-${videoToPlay.id}-${videoToPlay}`}>*/}
                        {/*                <ListItemText id="6">*/}
                        {/*                    <Typography*/}
                        {/*                        onClick={e => {*/}
                        {/*                            const currentFilePathHelper = video.find(*/}
                        {/*                                video =>*/}
                        {/*                                    video.id == e.target.id,*/}
                        {/*                            )*/}
                        {/*                            console.log(*/}
                        {/*                                currentFilePathHelper,*/}
                        {/*                            )*/}
                        {/*                            setCurrentFilePath(*/}
                        {/*                                currentFilePathHelper.url,*/}
                        {/*                            )*/}
                        {/*                            setCurrentFileName(*/}
                        {/*                                currentFilePathHelper.name,*/}
                        {/*                            )*/}
                        {/*                            setCurrentFileDescription(*/}
                        {/*                                currentFilePathHelper.description,*/}
                        {/*                            )*/}
                        {/*                        }}*/}
                        {/*                        id={videoToPlay.id}*/}
                        {/*                        variant="h6">*/}
                        {/*                        {video[index].name}*/}
                        {/*                    </Typography>*/}
                        {/*                </ListItemText>*/}
                        {/*            </ListItem>*/}
                        {/*        </ul>*/}
                        {/*    </li>*/}
                        {/*))}*/}
                    </List>
                </Box>
            </Box>
        )
    )
}

export default MainContent
