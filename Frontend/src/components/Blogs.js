import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Blog from './Blog'


const Blogs = () => {
  const [blogs, setBlogs] = useState()
  const sendRequest = async () => {
    const res = await axios.get('http://localhost:3000/api/news').catch((err) => console.log(err))
    const data = await res.data
    return data
  }
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.data))
  }, [])
  //console.log(blogs)
  return (
    <div>
   
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
          blog_id={blog.blog_id}
          user_id={blog.user_id}
            // eslint-disable-next-line eqeqeq
            isUser={localStorage.getItem('user_id') == blog.user_id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            name={blog.name}
          />
        ))}
    </div>
  )
}

export default Blogs
