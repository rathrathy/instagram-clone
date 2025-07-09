import { useState, useEffect } from 'react';

//component
import Post from './Post';

import { Box, styled } from '@mui/material';
import { getAllPosts } from '../../services/api';

const PostsContainer = styled(Box)`
    height: calc(100vh - 200px);
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #dbdbdb;
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: #b3b3b3;
    }
`;

const Posts = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getAllPosts();
                if (response && response.status === 200) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <PostsContainer>
            {
                posts.length > 0 ? (
                    posts.map((post, index) => (
                        <Post key={post._id || index} post={post} />
                    ))
                ) : (
                    // Show dummy posts if no real posts exist
                    [1,2,3,4,5,6,7].map(data => (
                        <Post key={data} />
                    ))
                )
            }
        </PostsContainer>
    )
}

export default Posts;