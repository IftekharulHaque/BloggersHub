import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store'


function Header() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn)

  const dispath = useDispatch()

  const [value, setValue] = useState()
  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          background:
            'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 53%, rgba(9,9,121,1) 100%)',
        }}
      >
        <Toolbar>
          <Typography variant="h4" sx={{fontFamily:"cursive", fontWeight:"bold"}}>Blogger'sHub</Typography>

          {isLoggedIn && (
            <Box display="flex" marginLeft={'auto'} marginRight="auto" sx={{justifyContent:"center"}}>
              <Tabs  textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                <Tab  LinkComponent={Link} to="/blogs" label="All Blogs" />
                <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
                <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
                <Tab LinkComponent={Link} to="/profile" label="profile" />
              </Tabs>
            </Box>
          )}

          <Box display="flex" marginLeft="auto">
            {!isLoggedIn && (
              <>
                {' '}
                <Button
                  LinkComponent={Link}
                  to="/auth"
                  variant="contained"
                  sx={{ margin: 1, borderRadius: 10 }}
                  color="warning"
                >
                  Login or Signup
                </Button>
                
              </>
            )}
            {isLoggedIn && (
              <Button
                onClick={() => dispath(authActions.logout())}
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
