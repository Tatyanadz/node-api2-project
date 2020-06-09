import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Styled from "styled-components"

const PostList = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios
          .get("http://localhost:4000/api/posts")
          .then(res => {
              console.log(res.data)
              setPosts(res.data)
          })
          .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>List of Posts</h1>
            <Posts>
                {posts.map(singlePost => (
                    <Post>
                        <h2>Title: {singlePost.title}</h2>
                        <h2>Contents: {singlePost.contents}</h2>
                    </Post>
                ))}
            </Posts>
        </div>
    )
}

const Posts = Styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

`;

const Post = Styled.div`
    margin: 2rem 6rem;
    padding: 1rem;
    background-color: #ffc357;
    box-shadow: 2px 2px #d88144;
    border-radius: 1.5rem;
`;

export default PostList