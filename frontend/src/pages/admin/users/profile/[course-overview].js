import React, { useState} from "react";
const { default: AdminLayout } = require("@/components/Layouts/AdminLayout")
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import axios from "axios";
import Image from "next/image";
const drawerWidth=240;
const CourseOverview = ()=> {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
const [filePath, setFilePath] = useState('');
const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

const createCourseHandler = (e)=>{
e.preventDefault();
console.log(createObjectURL);

axios.post("http://localhost:8000/uploadMedium",{
    course_id:1,
    title:title,
    description:description,
    filename:createObjectURL


})
}
const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };


return <AdminLayout>
 <Box
                display="flex"
                component="main"
                justifyContent="center"
                mt={5}
                sx={{
                    flexGrow: 1,
                    p: 7,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                     <Box
                                onSubmit={createCourseHandler}
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
                                        Title
                                    </InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={title}
                                        onChange={event =>
                                            setTitle(event.target.value)
                                        }
                                        label="title"
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel htmlFor="component-outlined">
                                        Description
                                    </InputLabel>
                                    <OutlinedInput
                                        id="component-outlined"
                                        value={description}
                                        type="text"
                                        onChange={event =>
                                            setDescription(event.target.value)
                                        }
                                        label="Description"
                                    />
                                </FormControl>
                                <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    onChange={uploadToClient}
    hidden
  />
</Button>
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
                                    Create Course
                                </Button>
                                <video src={createObjectURL}>
                                <source src={createObjectURL}/>
                                </video>
                            </Box>



                </Box>


</AdminLayout>


}
export default CourseOverview;
