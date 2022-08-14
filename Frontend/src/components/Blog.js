import React from 'react'

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  
  IconButton,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Blog = ({ title, description, image, name, isUser, user_id, blog_id }) => {
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate(`/myBlogs/${blog_id}`)
  }
  const deleteRequest = async () => {
    const res = await axios
      .put(`http://localhost:3000/api/news/delete/${blog_id}`, {
        blog_id: blog_id,
      })
      .catch((err) => console.log(err))
    const data = await res.data

    return data
  }
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate('/'))
      .then(() => navigate('/blogs'))
  }
  return (
    <div>
        
      <Card
        sx={{
          width: '40%',
          margin: 'auto',
          mt: 2,
          padding: 2,
          boxShadow: '2px 2px 5px #ccc',
          ':hover': {
            boxShadow: '5px 5px 10px #ccc',
          },
        }}
        
      >
        <Box  sx={{display:"flex"}}>
        <CardHeader  
          avatar={
            <Avatar sx={{ bgcolor: 'black' }} >
              {name[0]}
            </Avatar>
          }
          title={name}
          
        />
        
        {isUser && (
          <Box sx={{display:"flex", flexGrow:1}}>
            
            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
              <EditIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        </Box>
        
        
        <CardMedia component="img"  sx={{width:"100%", }} image={image} alt="" />
        <CardContent>
            <hr/>
            <br/>
          <Typography  variant="body1" color="text.secondary">
            <b className="bold" >{title}</b> {': '} {description}
          </Typography>
        </CardContent>
      </Card>
    
    </div>
  )
}

export default Blog
