import React, { Fragment, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import BasicMenu from '@/components/admin-components/PopupMenu'
import axios from '@/lib/axios'
const drawerWidth = 240
import AdminLayout from '@/components/Layouts/AdminLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Button, TextareaAutosize } from '@mui/material'
import { useRouter } from 'next/router'

const Media = () => {
    const [rows, setRows] = useState(null)
    const [selectedRowId, setSelectedRowId] = useState(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const router = useRouter()

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/deleteUser/${selectedRowId}/`)
    }
    const editCourse = () => {
        // TODO: edit course functionality
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
        },
        {
            disableColumnMenu: true,
            field: 'action',
            headerName: 'Action',
            sortable: false,
            renderCell: () => {
                const stopPropagation = e => {
                    e.stopPropagation()
                }

                return (
                    <BasicMenu
                        stopPropagation={stopPropagation}
                        deleteUser={handleDelete}
                        editCourse={editCourse}
                    />
                )
            },
            flex: 1,
        },
        {
            disableColumnMenu: true,
            headerName: (
                <DeleteIcon
                    color="info"
                    fontSize="large"
                    sx={{ cursor: 'pointer', marginTop: '20px' }}
                    onClick={() => {
                        axios
                            .delete(
                                `http://localhost:8000/deleteUsers/${selectedRowId.join(
                                    ',',
                                )}`,
                                {},
                            )
                            .catch(error => {
                            })
                    }}
                />
            ),
            flex: 1,
            sortable: false,
            headerAlign: 'center',
        },
    ]

    return (
        <Fragment>
            <AdminLayout>
                <Box
                    component="main"
                    mt={10}
                    sx={{
                        flexGrow: 1,
                        p: 7,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}>
                    <Box pb={4} pl={2}>
                        <Typography variant="h4">Media</Typography>
                    </Box>
                    <Box pt={2} sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            onSelectionModelChange={id => {
                                setSelectedRowId(id)
                            }}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </Box>
                    <Box mb={5} mt={15} pl={2}>
                        <Typography variant="h4">Upload media</Typography>
                    </Box>
                    <Box
                        encType="multipart/form-data"
                        onSubmit={upload}
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
                        <div className="mg20">
                            {currentFile && (
                                <Box
                                    className="mb25"
                                    display="flex"
                                    alignItems="center">
                                    <Box width="100%" mr={1}>
                                        <BorderLinearProgress
                                            variant="determinate"
                                            value={progress}
                                        />
                                    </Box>
                                    <Box minWidth={35}>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary">{`${progress}%`}</Typography>
                                    </Box>
                                </Box>
                            )}

                            <label htmlFor="btn-upload">
                                <input
                                    id="btn-upload"
                                    name="btn-upload"
                                    style={{ display: 'none' }}
                                    type="file"
                                    onChange={selectFile}
                                />
                                <Button
                                    className="btn-choose"
                                    variant="outlined"
                                    component="span">
                                    Choose Files
                                </Button>
                            </label>
                            <div className="file-name">
                                {selectedFiles && selectedFiles.length > 0
                                    ? selectedFiles[0].name
                                    : null}
                            </div>
                            <Button
                                className="btn-upload"
                                color="primary"
                                variant="contained"
                                component="span"
                                disabled={!selectedFiles}
                                onClick={upload}>
                                Upload
                            </Button>

                            <Typography
                                variant="subtitle2"
                                className={`upload-message ${
                                    isError ? 'error' : ''
                                }`}>
                                {message}
                            </Typography>

                            {/*<Typography variant="h6" className="list-header">*/}
                            {/*    List of Files*/}
                            {/*</Typography>*/}
                            {/*<ul className="list-group">*/}
                            {/*    {fileInfos &&*/}

                            {/*            <ListItem*/}
                            {/*                divider*/}
                            {/*                key={1}>*/}
                            {/*                <a href={fileInfos.url}>{fileInfos.name}</a>*/}
                            {/*            </ListItem>*/}
                            {/*        }*/}
                            {/*</ul>*/}
                        </div>

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
                    <Box pt={5} />
                </Box>
                );
            </AdminLayout>
        </Fragment>
    )
}

export default Media
