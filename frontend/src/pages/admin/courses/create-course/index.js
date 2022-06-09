import AdminLayout from '../../../../components/Layouts/AdminLayout'
import {
    Box,
    Button,
    InputLabel,
    OutlinedInput,
    TextareaAutosize,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import { useState } from 'react'
const drawerWidth = 240
const CreateCourse = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    return (
        <AdminLayout>
            <Box
                component="main"
                mt={10}
                sx={{
                    flexGrow: 1,
                    p: 7,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                <Box mb={5} mt={15} pl={2}>
                    <Typography variant="h4">Create Course</Typography>
                </Box>
                <Box
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
                    <Button
                        className="ml-4"
                        style={{
                            marginTop: '3rem',
                            fontSize: 10,
                            width: '90px',
                            height: '30px',
                        }}
                        type="submit"
                        variant="contained"
                        color="primary">
                        Upload
                    </Button>
                </Box>
            </Box>
        </AdminLayout>
    )
}
export default CreateCourse
