import React,{useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReactPlayer from 'react-player';
import { Box } from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import TextField from '@material-ui/core/TextField';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import {
  makeStyles,
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import { Brightness3, WbSunny } from "@material-ui/icons";
import { CssBaseline, Grid} from "@material-ui/core";
import { Button } from '@mui/material';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));




const video = [


  {
  
    id:1,
    url:"https://www.youtube.com/watch?v=bhxQePtEJEc",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  },
  {
  
    id:2,
    url:"https://www.youtube.com/watch?v=At6XyItIHsE",
    name:"Learning Python for Data Analysis and Visualization",
    description:"Learn python and how to use it to analyze,visualize and present data. Includes tons of sample code and hours of video!"
    
  },
  {
  
    id:3,
    url:"https://www.youtube.com/watch?v=1-4OhtKgkAs&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=3",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  },
  {
  
    id:4,
    url:"https://www.youtube.com/watch?v=xUUfh73Es2Y&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=4",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  },
  {
  
    id:5,
    url:"https://www.youtube.com/watch?v=65vdCr-ChV4&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=5",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  },
  {
  
    id:6,
    url:"https://www.youtube.com/watch?v=Jd5uZPAOGP4&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=6",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  },
  {
  
    id:7,
    url:"https://www.youtube.com/watch?v=k5aiYaTpzwI&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=7",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  },
  {
  
    id:8,
    url:"https://www.youtube.com/watch?v=k5aiYaTpzwI&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=7",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  },
  {
  
    id:9,
    url:"https://www.youtube.com/watch?v=k5aiYaTpzwI&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=7",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  },
  {
  
    id:10,
    url:"https://www.youtube.com/watch?v=k5aiYaTpzwI&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=7",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  },
  {
  
    id:11,
    url:"https://www.youtube.com/watch?v=k5aiYaTpzwI&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=7",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  }, {
  
    id:12,
    url:"https://www.youtube.com/watch?v=k5aiYaTpzwI&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=7",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  }, {
  
    id:13,
    url:"https://www.youtube.com/watch?v=k5aiYaTpzwI&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr&index=7",
    name:"100 Days of Code: The Complete Python Pro Bootcamp for 2022",
    description:" Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
    
  }
]




const tutorials = [1,2,3,4]

function MainContent() {
  const classes2 = useStyles();
  const [isDark, toggleDark] = useState(true);

  const changeTheme = () => {
    toggleDark(prev => !prev);
  };
    const classes = useStyles();
    const [currentFilePath, setCurrentFilePath] = useState("https://www.youtube.com/watch?v=kAM1zQcmfjc&list=PLGGPU5_f-5iLTSZYDe1UYCNUBoL4Yx_Gr");
    const [currentComment, setCurrentComment] = useState("");
    const [currentName, setCurrentFileName]=useState(video[0].name);
    const [currentDescription, setCurrentFileDescription]=useState(video[0].description);


  const [comments, setComments] = useState([]);
    return <Box pl={8}  sx={{display:"flex", height:"auto",justifyContent:"space-between"}}>
   
        <Box sx={{width:"800px", height:"auto", }}>
        <Card  sx={{width:"800px", height:"800px"}} className={classes.card}>
          <ReactPlayer width={800} url={currentFilePath}/>
          <CardContent className={classes.cardContent}>
            <Typography style={{fontWeight:"bold"}} gutterBottom variant="h3" component="h2">
            {currentName}
            </Typography>
            <Typography variant="h5">
            {currentDescription}
            </Typography>
           
      
        <Box mt={3} >
            <Box>
              <Typography variant="h4" gutterBottom>
                Comments
              </Typography>
            </Box>
             <Box sx={{display:"flex", justifyContent:"space-between"}}>
             <TextField value={currentComment} onChange={(e)=>{setCurrentComment(e.target.value)}} placeholder='Comment' fullWidth />
             <Button onClick={()=>{

                setComments([...comments,currentComment])

             }}>Comment</Button>
               </Box> 
           
          </Box>

          {comments.map((comment)=>(

<Box sx={{display:"flex"}} pt={4}>
<AccountCircleIcon />
<Typography  style={{marginLeft:"10px",fontWeight:"bold"}}>Nikola Markovic</Typography>
 <Typography style={{marginLeft:"20px"}}>{comment}</Typography> 
</Box>
          ))}
          
       
      
          </CardContent>
          
        </Card>

   

      </Box>
      <Box ml={10} sx={{display:"flex", justifyContent:"center"}}>
      <List
      sx={{
        width: "200px",
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 700,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {video.map((videoToPlay,index) => (
        <li style={{cursor:"pointer"}} id="6" key={`section-${videoToPlay.id}`}>
          <ul>
              <ListItem id="6"  key={`item-${videoToPlay.id}-${videoToPlay}`}>
                <ListItemText id="6" ><Typography  onClick={(e)=>{

const currentFilePathHelper = video.find((video)=>video.id == e.target.id);
console.log(currentFilePathHelper);
setCurrentFilePath(currentFilePathHelper.url);
setCurrentFileName(currentFilePathHelper.name);
setCurrentFileDescription(currentFilePathHelper.description);

}}id={videoToPlay.id} variant="h6">{video[index].name}</Typography></ListItemText>
              </ListItem>
          </ul>
        </li>
      ))}
    </List>
      </Box>
    </Box>
}

export default MainContent