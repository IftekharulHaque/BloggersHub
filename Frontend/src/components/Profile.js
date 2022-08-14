import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const labelStyles = { mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold' }

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState()

  const id = localStorage.getItem('user_id')
  console.log(id)

  const [inputs, setInputs] = useState({})

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:3000/api/users/${id}`)
      .catch((err) => console.log(err))
    const data = await res.data

    return data
  }
  useEffect(() => {
    fetchDetails().then((data) => {
      setUser(data.data)
      console.log(data)

      setInputs({
        name: data.data[0].name,
        email: data.data[0].email,
        password: '',
      })
    })
  }, [id])

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:3000/api/users/update/${id}`, {
        user_id: id,
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err))

    const data = await res.data

    return data
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate('/myBlogs/'))
  }
  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            
            
            borderRadius={10}
            boxShadow="5px 5px 10px #ccc"
            padding={3}
            margin={'auto'}
            marginTop={10}
            display="flex"
            flexDirection={'column'}
            width={'80%'}
          >
            <Typography
              fontWeight={'bold'}
              padding={3}
              color="grey"
              variant="h3"
              textAlign={'center'}
            >
              Edit Your Profile
            </Typography>
            <InputLabel sx={labelStyles}>Name</InputLabel>
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Email</InputLabel>
            <TextField
              name="email"
              onChange={handleChange}
              value={inputs.email}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Set a new Password</InputLabel>
            <TextField
              name="password"
              onChange={handleChange}
              value={inputs.password}
              type={'password'}
              margin="auto"
              variant="outlined"
            />
            <Button sx={{ mt: 2, borderRadius: 4, width:"130px", alignSelf:"center" }} variant="contained" color="warning" type="submit">
            Save
          </Button>
          </Box>
        </form>
      )}
    </div>
  )
}

export default Profile
