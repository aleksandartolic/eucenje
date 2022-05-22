import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card, CardActionArea, CardActions,CardContent,Typography, CardMedia, Button } from '@mui/material';
import image from "../../assets/images/bgbg.jpg"
import Image from 'next/image';
import {useState, useEffect} from "react"
import axios from 'axios';
import { useRouter } from 'next/router';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useAppContext } from '@/../state';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


import course1 from "../../assets/images/course1Image.jpg"
import course2 from "../../assets/images/course2.jpg"
import course3 from "../../assets/images/course3.jpg"
import course4 from "../../assets/images/course4.jpg"



export default function ListCourses() {



  const mycontext = useAppContext();
  console.log(mycontext.value);

  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("")


useEffect(()=>{
  axios.get("http://localhost:8000/listCourses").then((course)=>{


    setCourses(course.data.response)
  
  })


},[])
const proceedToCourseHandler = (e)=>{
  console.log(e.target.id);
  router.push(`/student/${e.target.id}?id=${router.query.id}`)
}

const images = [course1,course2,course3,course4]
const [searchQuery, setSearchQuery] = useState("");
const filteredQueries = courses.filter((course)=>(course))
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box pb={10} sx={{display:"flex", justifyContent:"space-between"}}><Typography variant="h3">Choose over 1000 courses</Typography> <form>
    <TextField
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      label="Enter a city name"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </form></Box>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {courses.map((course, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>   <Card  sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia      
        >
          <Image   id={course.course_id} onClick={proceedToCourseHandler} src={images[index]}></Image>
          </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
           {course.name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {course.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button sx={{fontSize:"16px"}} size="large" color="primary">
         Start
        </Button>
      </CardActions>
    </Card>
</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}